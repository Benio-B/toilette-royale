import React from 'react';
import { BrandStats } from '../utils/calculations';
import { TrendingUp, TrendingDown, Trophy, Info } from 'lucide-react';

interface Props {
  stats: BrandStats[];
  bestStats: {
    bestValue: BrandStats;
    bestRating: BrandStats;
    mostDurable: BrandStats;
    bestCostPerRoll: BrandStats;
    bestRollsPerEuro: BrandStats;
    bestDaysPerEuro: BrandStats;
  };
}

interface ColumnHeaderProps {
  label: string;
  tooltip: string;
  weight?: string;
}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({
  label,
  tooltip,
  weight,
}) => (
  <div className="flex items-center gap-1 group">
    <span>{label}</span>
    {weight && (
      <div className="relative">
        <Info className="h-4 w-4 text-purple-400 cursor-help" />
        <div className="absolute left-1/2 -translate-x-1/2 min-w-96 max-w-3xs mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-pre-wrap">
          {tooltip}
          {weight && <div className="font-semibold mt-1">Poids: {weight}</div>}
        </div>
      </div>
    )}
  </div>
);

export const StatsTable: React.FC<Props> = ({ stats, bestStats }) => {
  return (
    <div className="-mx-6 px-6">
      <div className="inline-block min-w-full align-middle">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="pb-2 whitespace-nowrap">Marque</th>
              <th className="pb-2 whitespace-nowrap">
                <ColumnHeader
                  label="Score"
                  tooltip="Score global calculé à partir de tous les critères"
                />
              </th>
              <th className="pb-2 whitespace-nowrap">
                <ColumnHeader
                  label="Rlx utilisés"
                  tooltip="Nombre total de rouleaux utilisés"
                />
              </th>
              <th className="pb-2 whitespace-nowrap">
                <ColumnHeader
                  label="Prix moyen"
                  tooltip="Prix moyen par paquet"
                />
              </th>
              <th className="pb-2 whitespace-nowrap">
                <ColumnHeader
                  label="Prix/rlx"
                  tooltip="Plus le prix par rouleau est bas, meilleur c'est"
                  weight="10%"
                />
              </th>
              <th className="pb-2 whitespace-nowrap">
                <ColumnHeader
                  label="Rlx/€"
                  tooltip="Plus on a de rouleaux par euro, meilleur c'est"
                  weight="10%"
                />
              </th>
              <th className="pb-2 whitespace-nowrap">
                <ColumnHeader
                  label="Jours/€"
                  tooltip="Plus on a de jours d'utilisation par euro dépensé, meilleur c'est"
                  weight="20%"
                />
              </th>
              <th className="pb-2 whitespace-nowrap">
                <ColumnHeader
                  label="Note"
                  tooltip="Plus la note est élevée, meilleur c'est"
                  weight="25%"
                />
              </th>
              <th className="pb-2 whitespace-nowrap">
                <ColumnHeader
                  label="Durée moy."
                  tooltip="Durée moyenne d'utilisation en jours"
                />
              </th>
              <th className="pb-2 whitespace-nowrap">
                <ColumnHeader
                  label="Coût/jour"
                  tooltip="Plus le coût par jour est bas, meilleur c'est"
                  weight="25%"
                />
              </th>
              <th className="pb-2 whitespace-nowrap">
                <ColumnHeader
                  label="Rlx/jour"
                  tooltip="Plus la consommation de rouleaux par jour est basse, meilleur c'est"
                  weight="10%"
                />
              </th>
              <th className="pb-2 whitespace-nowrap">
                <ColumnHeader label="Total €" tooltip="Montant total dépensé" />
              </th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr
                key={stat.brand}
                className="border-b border-gray-100 hover:bg-purple-50 transition-colors"
              >
                <td className="py-2 font-medium whitespace-nowrap">
                  {stat.brand}
                </td>
                <td className="py-2 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {stat.globalScore.toFixed(1)}
                    {stat === stats[0] && (
                      <Trophy className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                </td>
                <td className="py-2 whitespace-nowrap">{stat.totalRolls}</td>
                <td className="py-2 whitespace-nowrap">
                  {stat.averagePrice.toFixed(2)}€
                </td>
                <td className="py-2 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {stat.costPerRoll.toFixed(2)}€
                    {stat.costPerRoll ===
                      bestStats.bestCostPerRoll.costPerRoll && (
                      <TrendingDown className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </td>
                <td className="py-2 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {stat.rollsPerEuro.toFixed(2)}
                    {stat.rollsPerEuro ===
                      bestStats.bestRollsPerEuro.rollsPerEuro && (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </td>
                <td className="py-2 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {stat.daysPerEuro.toFixed(1)}
                    {stat.daysPerEuro ===
                      bestStats.bestDaysPerEuro.daysPerEuro && (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </td>
                <td className="py-2 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {stat.averageRating.toFixed(1)}
                    {stat.averageRating ===
                      bestStats.bestRating.averageRating && (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </td>
                <td className="py-2 whitespace-nowrap">
                  {stat.averageDuration.toFixed(1)} j
                </td>
                <td className="py-2 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {stat.costPerDay.toFixed(2)}€
                    {stat.costPerDay === bestStats.bestValue.costPerDay && (
                      <TrendingDown className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </td>
                <td className="py-2 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {stat.rollsPerDay.toFixed(2)}
                    {stat.rollsPerDay === bestStats.mostDurable.rollsPerDay && (
                      <TrendingDown className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </td>
                <td className="py-2 whitespace-nowrap">
                  {stat.totalSpent.toFixed(2)}€
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
