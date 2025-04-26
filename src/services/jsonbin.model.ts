import type { ToiletPaper } from '../types.ts';
import _ from 'lodash';

function isToiletPaper(rawData: any): rawData is ToiletPaper {
  return typeof rawData.id === 'string' &&
    typeof rawData.brand === 'string' &&
    typeof rawData.price === 'number' &&
    typeof rawData.rollCount === 'number' &&
    typeof rawData.startDate === 'string' &&
    typeof rawData.rating === 'number';
}

function getToiletPapers(rawData: any[]): ToiletPaper[] {
  return rawData.filter(isToiletPaper);
}

function formatRawToiletPapers({ rawData }: { rawData: [unknown] }): ToiletPaper[] {
  const isBinJustCreated = _.chain(rawData).get(0).isEmpty().value();

  if (isBinJustCreated) {
    return [];
  }

  return getToiletPapers(rawData);
}

export { formatRawToiletPapers };
