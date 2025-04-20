import React, { useEffect, useState } from 'react';
import { ToiletPaperForm } from '../components/ToiletPaperForm';
import { ToiletPaperList } from '../components/ToiletPaperList';
import { ImportExportButtons } from '../components/ImportExportButtons';
import { ToiletPaper } from '../types';
import {getRepository} from "../repository/repository.ts";

export const ManagementPage = () => {
  const [papers, setPapers] = useState<ToiletPaper[]>(() => {
    const saved = getRepository().getToiletPapers();
    return saved ? saved : [];
  });

  const [editingPaper, setEditingPaper] = useState<ToiletPaper | null>(null);

  useEffect(() => {
    getRepository().savePapers({ papers })
  }, [papers]);

  const handleAdd = (paper: ToiletPaper) => {
    setPapers([...papers, paper]);
  };

  const handleEdit = (paper: ToiletPaper) => {
    setPapers(papers.map((p) => (p.id === paper.id ? paper : p)));
    setEditingPaper(null);
  };

  const handleDelete = (id: string) => {
    setPapers(papers.filter((p) => p.id !== id));
    if (editingPaper?.id === id) {
      setEditingPaper(null);
    }
  };

  const startEditing = (paper: ToiletPaper) => {
    setEditingPaper(paper);
  };

  const cancelEditing = () => {
    setEditingPaper(null);
  };

  const handleImport = (importedPapers: ToiletPaper[]) => {
    setPapers(importedPapers);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Gestion des papiers toilette</h1>
        <ImportExportButtons papers={papers} onImport={handleImport} />
      </div>

      <ToiletPaperForm
        onSubmit={editingPaper ? handleEdit : handleAdd}
        initialPaper={editingPaper}
        onCancel={cancelEditing}
      />

      <div>
        <h2 className="text-xl font-bold mb-4">Mes papiers toilette</h2>
        <ToiletPaperList
          papers={papers}
          onDelete={handleDelete}
          onEdit={startEditing}
          editingId={editingPaper?.id}
        />
      </div>
    </div>
  );
};