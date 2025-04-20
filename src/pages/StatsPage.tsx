import React, { useEffect, useState } from 'react';
import { Stats } from '../components/Stats';
import { ToiletPaper } from '../types';
import {getRepository} from "../repository/repository.ts";

export const StatsPage = () => {
  const [papers, setPapers] = useState<ToiletPaper[]>(() => {
    const saved = getRepository().getToiletPapers();
    return saved ? saved : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = getRepository().getToiletPapers();
      if (saved) {
        setPapers(saved);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Statistiques et comparaisons</h1>
      <Stats papers={papers} />
    </div>
  );
};