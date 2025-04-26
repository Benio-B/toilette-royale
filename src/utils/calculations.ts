import type { ToiletPaper } from '../types';

export interface BrandStats {
  brand: string;
  totalRolls: number;
  averagePrice: number;
  averageRating: number;
  averageDuration: number;
  totalSpent: number;
  costPerDay: number;
  costPerRoll: number;
  rollsPerDay: number;
  totalDays: number;
  rollsPerEuro: number;
  daysPerEuro: number;
  globalScore: number;
}

export function calculatePaperStats(paper: ToiletPaper) {
  const costPerRoll = paper.price / paper.rollCount;
  const rollsPerEuro = paper.rollCount / paper.price;
  let duration = 0;
  let costPerDay = 0;
  let rollsPerDay = 0;
  let daysPerEuro = 0;

  if (paper.endDate) {
    const start = new Date(paper.startDate);
    const end = new Date(paper.endDate);
    duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    costPerDay = paper.price / duration;
    rollsPerDay = paper.rollCount / duration;
    daysPerEuro = duration / paper.price;
  }

  return { costPerRoll, duration, costPerDay, rollsPerDay, rollsPerEuro, daysPerEuro };
}

function normalizeScore(value: number, min: number, max: number, isHigherBetter: boolean): number {
  if (min === max)
    return 1;
  return isHigherBetter ?
      (value - min) / (max - min) :
      (max - value) / (max - min);
}

export function calculateGlobalScore(stats: BrandStats[], stat: BrandStats) {
  // Trouver les valeurs min et max pour chaque critère
  const costPerRolls = stats.map(s => s.costPerRoll);
  const minCostPerRoll = Math.min(...costPerRolls);
  const maxCostPerRoll = Math.max(...costPerRolls);

  const rollsPerEuros = stats.map(s => s.rollsPerEuro);
  const minRollsPerEuro = Math.min(...rollsPerEuros);
  const maxRollsPerEuro = Math.max(...rollsPerEuros);

  const daysPerEuros = stats.map(s => s.daysPerEuro);
  const minDaysPerEuro = Math.min(...daysPerEuros);
  const maxDaysPerEuro = Math.max(...daysPerEuros);

  const ratings = stats.map(s => s.averageRating);
  const minRating = Math.min(...ratings);
  const maxRating = Math.max(...ratings);

  const costPerDays = stats.map(s => s.costPerDay);
  const minCostPerDay = Math.min(...costPerDays);
  const maxCostPerDay = Math.max(...costPerDays);

  const rollsPerDays = stats.map(s => s.rollsPerDay);
  const minRollsPerDay = Math.min(...rollsPerDays);
  const maxRollsPerDay = Math.max(...rollsPerDays);

  // Calculer les scores normalisés
  const costPerRollScore = normalizeScore(stat.costPerRoll, minCostPerRoll, maxCostPerRoll, false);
  const rollsPerEuroScore = normalizeScore(stat.rollsPerEuro, minRollsPerEuro, maxRollsPerEuro, true);
  const daysPerEuroScore = normalizeScore(stat.daysPerEuro, minDaysPerEuro, maxDaysPerEuro, true);
  const ratingScore = normalizeScore(stat.averageRating, minRating, maxRating, true);
  const costPerDayScore = normalizeScore(stat.costPerDay, minCostPerDay, maxCostPerDay, false);
  const rollsPerDayScore = normalizeScore(stat.rollsPerDay, minRollsPerDay, maxRollsPerDay, false);

  // Appliquer les pondérations
  return (
    (costPerRollScore * 0.10) + // Prix/rouleau (10%)
    (rollsPerEuroScore * 0.10) + // Rouleaux/€ (10%)
    (daysPerEuroScore * 0.20) + // Jours/€ (20%)
    (ratingScore * 0.25) + // Note (25%)
    (costPerDayScore * 0.25) + // Coût/jour (25%)
    (rollsPerDayScore * 0.10) // Rouleaux/jour (10%)
  ) * 100;
}

export function calculateBrandStats(completedPapers: ToiletPaper[]) {
  const brandStats = completedPapers.reduce((acc: { [key: string]: BrandStats }, paper) => {
    const stats = calculatePaperStats(paper);

    if (!acc[paper.brand]) {
      acc[paper.brand] = {
        brand: paper.brand,
        totalRolls: 0,
        averagePrice: 0,
        averageRating: 0,
        averageDuration: 0,
        totalSpent: 0,
        costPerDay: 0,
        costPerRoll: 0,
        rollsPerDay: 0,
        totalDays: 0,
        rollsPerEuro: 0,
        daysPerEuro: 0,
        globalScore: 0,
      };
    }

    const brandData = acc[paper.brand];
    const previousCount = brandData.totalRolls / paper.rollCount;

    brandData.totalRolls += paper.rollCount;
    brandData.averagePrice = (brandData.averagePrice * previousCount + paper.price) / (previousCount + 1);
    brandData.averageRating = (brandData.averageRating * previousCount + paper.rating) / (previousCount + 1);
    brandData.averageDuration = (brandData.averageDuration * previousCount + stats.duration) / (previousCount + 1);
    brandData.totalSpent += paper.price;
    brandData.costPerDay = (brandData.costPerDay * previousCount + stats.costPerDay) / (previousCount + 1);
    brandData.costPerRoll = (brandData.costPerRoll * previousCount + stats.costPerRoll) / (previousCount + 1);
    brandData.rollsPerDay = (brandData.rollsPerDay * previousCount + stats.rollsPerDay) / (previousCount + 1);
    brandData.totalDays += stats.duration;
    brandData.rollsPerEuro = (brandData.rollsPerEuro * previousCount + stats.rollsPerEuro) / (previousCount + 1);
    brandData.daysPerEuro = (brandData.daysPerEuro * previousCount + stats.daysPerEuro) / (previousCount + 1);

    return acc;
  }, {});

  const brandStatsArray = Object.values(brandStats);
  brandStatsArray.forEach((stat) => {
    stat.globalScore = calculateGlobalScore(brandStatsArray, stat);
  });

  return brandStatsArray.sort((a, b) => b.globalScore - a.globalScore);
}

export function findBestStats(stats: BrandStats[]) {
  return {
    bestValue: stats.reduce((best, current) =>
      current.costPerDay < best.costPerDay ? current : best, stats[0]),

    bestRating: stats.reduce((best, current) =>
      current.averageRating > best.averageRating ? current : best, stats[0]),

    mostDurable: stats.reduce((best, current) =>
      current.rollsPerDay < best.rollsPerDay ? current : best, stats[0]),

    bestCostPerRoll: stats.reduce((best, current) =>
      current.costPerRoll < best.costPerRoll ? current : best, stats[0]),

    bestRollsPerEuro: stats.reduce((best, current) =>
      current.rollsPerEuro > best.rollsPerEuro ? current : best, stats[0]),

    bestDaysPerEuro: stats.reduce((best, current) =>
      current.daysPerEuro > best.daysPerEuro ? current : best, stats[0]),
  };
}
