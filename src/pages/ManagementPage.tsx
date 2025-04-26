import type { ToiletPaper } from '../types';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { ImportExportButtons } from '../components/ImportExportButtons';
import { ToiletPaperForm } from '../components/ToiletPaperForm';
import { ToiletPaperList } from '../components/ToiletPaperList';
import { getRepository } from '../repository/repository.ts';

export function ManagementPage() {
  const [papers, setPapers] = useState<ToiletPaper[]>([]);
  const [editingPaper, setEditingPaper] = useState<ToiletPaper | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      setLoading(true);
      const data = await getRepository().getToiletPapers();
      setPapers(data ? _.sortBy(data, 'startDate') : []);
      setLoading(false);
    }());
  }, []);

  const handleAdd = async (newPaper: ToiletPaper) => {
    try {
      setUpdating(true);
      const updatingPapers = [newPaper, ...papers!];
      await getRepository().savePapers({ papers: updatingPapers });

      setPapers(updatingPapers);
    }
    catch (error) {
      console.error('Erreur pendant l\'update', error);
    }
    finally {
      setUpdating(false);
    }
  };

  const handleEdit = async (paper: ToiletPaper) => {
    try {
      setUpdating(true);
      const updatingPapers = papers.map(p => (p.id === paper.id ? paper : p));
      await getRepository().savePapers({ papers: updatingPapers });

      setPapers(updatingPapers);
    }
    catch (error) {
      console.error('Erreur pendant l\'update', error);
    }
    finally {
      setEditingPaper(null);
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setUpdating(true);
      const updatingPapers = papers.filter(p => p.id !== id);
      await getRepository().savePapers({ papers: updatingPapers });

      setPapers(updatingPapers);
    }
    catch (error) {
      console.error('Erreur pendant l\'update', error);
    }
    finally {
      if (editingPaper?.id === id) {
        setEditingPaper(null);
      }
      setUpdating(false);
    }
  };

  const startEditing = (paper: ToiletPaper) => {
    setEditingPaper(paper);
  };

  const cancelEditing = () => {
    setEditingPaper(null);
  };

  const handleImport = async (importedPapers: ToiletPaper[]) => {
    try {
      setUpdating(true);
      await getRepository().savePapers({ papers: importedPapers });

      setPapers(importedPapers);
    }
    catch (error) {
      console.error('Erreur pendant l\'update', error);
    }
    finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Management</h1>
        Chargement en cours
      </div>
    );
  }
  if (updating) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Management</h1>
        Mise à jours en cours
      </div>
    );
  }

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
}
