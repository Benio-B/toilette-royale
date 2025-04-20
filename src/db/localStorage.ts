import type { Db, ToiletPaper } from '../types.ts';

function getLocalStorageDb(): Db {
  return {
    getToiletPapers: () => {
      const papers = localStorage.getItem('toiletPapers');

      if (!papers) {
        return undefined;
      }

      return JSON.parse(papers);
    },
    savePapers: ({ papers }: { papers: ToiletPaper[] }) => localStorage.setItem('toiletPapers', JSON.stringify(papers)),
  };
}

export { getLocalStorageDb };
