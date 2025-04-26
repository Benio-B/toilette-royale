import type { Db, ToiletPaper } from '../types.ts';
import _ from 'lodash';

function getLocalStorageDb(): Db {
  return {
    getToiletPapers: async () => {
      const papers = localStorage.getItem('toiletPapers');

      if (_.isNil(papers)) {
        return undefined;
      }

      return JSON.parse(papers);
    },
    saveToiletPapers: async ({ papers }: { papers: ToiletPaper[] }) =>
      localStorage.setItem('toiletPapers', JSON.stringify(papers)),
  };
}

export { getLocalStorageDb };
