import type { ToiletPaper } from '../types';
import { useEffect, useState } from 'react';
import { Stats } from '../components/Stats';
import { getRepository } from '../repository/repository.ts';

export function StatsPage() {
  const [papers, setPapers] = useState<ToiletPaper[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      // TODO : fais 2 fois, pourquoi ?

      setLoading(true);
      const data = await getRepository().getToiletPapers();

      setPapers(data || []);
      setLoading(false);
    }());
  }, []);

  if (loading) {
    // TODO améliorer les loadings
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Statistiques et comparaisons</h1>
        Chargement en cours
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Statistiques et comparaisons</h1>
      <Stats papers={papers} />
    </div>
  );
}
