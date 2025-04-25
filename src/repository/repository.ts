import type { Db, ToiletPaper } from '../types.ts';
import _ from 'lodash';
import { getDb } from '../db/dbService.ts';

function getRepository({ db = getDb() }: { db?: Db } = {}) {
  return {
    getToiletPapers: async () => {
      const toiletPapers = await db.getToiletPapers();

      // TODO ajouter les stats ici au lieu de les calculer plus bas
      return _.sortBy(toiletPapers, 'startDate') || [];
    },
    savePapers: async ({ papers }: { papers: ToiletPaper[] }) => {
      await db.savePapers({ papers });
      return papers;
    },
  };
}

export { getRepository };
