export interface ToiletPaper {
  id: string;
  brand: string;
  price: number;
  rollCount: number;
  startDate: string;
  endDate: string | null;
  rating: number;
}

export interface Stats {
  costPerRoll: number;
  averageDuration: number;
  sheetsPerDay: number;
}

export interface Db {
  getToiletPapers: () => Promise<ToiletPaper[] | undefined>;
  saveToiletPapers: ({ papers }: { papers: ToiletPaper[] }) => Promise<void>;
}
