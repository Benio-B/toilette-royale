import type { Db, ToiletPaper } from '../types.ts';
import _ from 'lodash';
import { getDb } from '../db/dbService.ts';

function getRepository({ db = getDb() }: { db?: Db } = {}) {
  return {
    getToiletPapers: async () => {
      const toiletPapers = await db.getToiletPapers();

      // TODO ajouter les stats ici au lieu de les calculer plus bas
      return toiletPapers ? _.sortBy(toiletPapers, 'startDate') : [];
    },
    saveToiletPapers: async ({ papers }: { papers: ToiletPaper[] }) => {
      await db.saveToiletPapers({ papers });
      return papers;
    },
  };
}

export { getRepository };
