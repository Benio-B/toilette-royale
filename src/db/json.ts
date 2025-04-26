import type { Db, ToiletPaper } from '../types.ts';
import _ from 'lodash';
import toast from 'react-hot-toast';
import { getToiletPapers, saveToiletPapers } from '../services/jsonbin.ts';

function getJsonDb(): Db {
  let papersCache: ToiletPaper[] | undefined;

  return {
    getToiletPapers: async () => {
      if (!_.isNil(papersCache)) {
        return papersCache;
      }
      try {
        const papers = await getToiletPapers();

        papersCache = papers;

        // TODO refactor
        if (!papers) {
          papersCache = undefined;
          return undefined;
        }
        return papersCache;
      }
      catch (err) {
        console.error(err);
        toast.error("Quelque chose s'est mal passé pendant la récupération de tes PQs 🤔");
        return undefined;
      }
    },
    saveToiletPapers: async ({ papers }: { papers: ToiletPaper[] }) => {
      try {
        papersCache = await saveToiletPapers({ papers });
      }
      catch (err) {
        console.error(err);
        toast.error("Quelque chose s'est mal passé pendant la sauvegarde de tes PQs 🤯");
      }
    },
  };
}

export { getJsonDb };
