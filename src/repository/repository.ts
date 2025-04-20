import type { ToiletPaper } from '../types.ts';
import { getLocalStorageDb } from '../db/localStorage.ts';

function getRepository() {
  const db = getLocalStorageDb();

  return {
    getToiletPapers: () => {
      return db.getToiletPapers();
    },
    savePapers: ({ papers }: { papers: ToiletPaper[] }) => db.savePapers({ papers }),
  };
}

export { getRepository };
