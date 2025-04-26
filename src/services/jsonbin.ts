import type { ToiletPaper } from '../types.ts';
import { config } from '../config.ts';
import { formatRawToiletPapers } from './jsonbin.model.ts';

async function getToiletPapers(): Promise<ToiletPaper[]> {
  const res = await fetch(`${config.VITE_JSONBIN_ROOT_URL}/b/${config.VITE_JSONBIN_ID}/latest`, {
    method: 'GET',
    headers: {
      'X-Master-Key': config.VITE_JSONBIN_MASTER_KEY!,
      'X-Access-Key': config.VITE_JSONBIN_ACCESS_KEY!,
      'X-Bin-Meta': 'false',
    },
  });

  const rawData = await res.json();

  if (!res.ok) {
    throw rawData;
  }

  return formatRawToiletPapers({ rawData });
}

async function saveToiletPapers({ papers }: { papers: ToiletPaper[] }) {
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

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}

export { getToiletPapers, saveToiletPapers };
