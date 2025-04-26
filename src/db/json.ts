import type { Db, ToiletPaper } from '../types.ts';
import _ from 'lodash';
import { config } from '../config.ts';

function getJsonDb(): Db {
  let papersCache: ToiletPaper[] | undefined;

  return {
    getToiletPapers: async () => {
      if (!_.isNil(papersCache)) {
        return papersCache;
      }
      // TODO: mettre les appels HTTP dans un service
      // TODO try catch
      const res = await fetch(`${config.VITE_JSONBIN_ROOT_URL}/b/${config.VITE_JSONBIN_ID}/latest`, {
        method: 'GET',
        headers: {
          'X-Master-Key': config.VITE_JSONBIN_MASTER_KEY!,
          'X-Access-Key': config.VITE_JSONBIN_ACCESS_KEY!,
          'X-Bin-Meta': 'false',
        },
      });

      // TODO: try/catch
      const papers = await res.json();
      papersCache = papers;

      // TODO refactor
      if (!papers) {
        papersCache = undefined;
        return undefined;
      }

      return papersCache;
    },
    savePapers: async ({ papers }: { papers: ToiletPaper[] }) => {
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

      papersCache = await res.json();
    },
  };
}

export { getJsonDb };
