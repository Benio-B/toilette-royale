import React, { useEffect, useState } from 'react';
import { Stats } from '../components/Stats';
import { ToiletPaper } from '../types';

export const StatsPage = () => {
  const [papers, setPapers] = useState<ToiletPaper[]>(() => {
    const saved = localStorage.getItem('toiletPapers');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('toiletPapers');
      if (saved) {
        setPapers(JSON.parse(saved));
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