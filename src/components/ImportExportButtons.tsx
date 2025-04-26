import type { ToiletPaper } from '../types';
import { Download, Upload } from 'lucide-react';
import React, { useRef } from 'react';
import toast from 'react-hot-toast';

interface Props {
  papers: ToiletPaper[];
  onImport: (papers: ToiletPaper[]) => void;
}

export const ImportExportButtons: React.FC<Props> = ({ papers, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(papers, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'toilet-papers.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file)
      return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedPapers = JSON.parse(content);

        if (Array.isArray(importedPapers) && importedPapers.every(paper =>
          typeof paper === 'object'
          && typeof paper.id === 'string'
          && typeof paper.brand === 'string'
          && typeof paper.price === 'number'
          && typeof paper.rollCount === 'number'
          && typeof paper.startDate === 'string'
          && (paper.endDate === null || typeof paper.endDate === 'string')
          && typeof paper.rating === 'number',
        )) {
          onImport(importedPapers);
        }
        else {
          toast.error('Format de fichier invalide');
        }
      }
      catch (error) {
        console.error(error);
        toast.error("Erreur lors de l'importation du fichier");
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={handleExport}
        className="flex items-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-all hover:scale-105 active:scale-95"
      >
        <Download className="h-5 w-5" />
        Exporter
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        accept=".json"
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-all hover:scale-105 active:scale-95"
      >
        <Upload className="h-5 w-5" />
        Importer
      </button>
    </div>
  );
};
