import type { Db, ToiletPaper } from '../types.ts';
import _ from 'lodash';
import toast from 'react-hot-toast';
import { config } from '../config.ts';

function getJsonDb(): Db {
  let papersCache: ToiletPaper[] | undefined;

  return {
    getToiletPapers: async () => {
      if (!_.isNil(papersCache)) {
        return papersCache;
      }
      // TODO: mettre les appels HTTP dans un service
      try {
        const res = await fetch(`${config.VITE_JSONBIN_ROOT_URL}/b/${config.VITE_JSONBIN_ID}/latest`, {
          method: 'GET',
          headers: {
            'X-Master-Key': config.VITE_JSONBIN_MASTER_KEY!,
            'X-Access-Key': config.VITE_JSONBIN_ACCESS_KEY!,
            'X-Bin-Meta': 'false',
          },
        });

        if (!res.ok) {
          throw await res.json();
        }

        // TODO: try/catch
        const papers = await res.json();
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
    savePapers: async ({ papers }: { papers: ToiletPaper[] }) => {
      try {
        const res = await fetch(`${config.VITE_JSONBIN_ROOT_URL}/b/${config.VITE_JSONBIN_ID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': config.VITE_JSONBIN_MASTER_KEY!,
            'X-Access-Key': config.VITE_JSONBIN_ACCESS_KEY!,
            'X-Bin-Meta': 'false',
          },
          body: JSON.stringify(papers),
        });

        if (!res.ok) {
          throw await res.json();
        }

        papersCache = await res.json();
      }
      catch (err) {
        console.error(err);
        toast.error("Quelque chose s'est mal passé pendant la sauvegarde de tes PQs 🤯");
      }
    },
  };
}

export { getJsonDb };
