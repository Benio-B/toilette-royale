import type { ToiletPaper } from '../types';
import { Award, Clock, Crown, DollarSign, Star, Target } from 'lucide-react';
import React from 'react';
import { calculateBrandStats, findBestStats } from '../utils/calculations';
import { AchievementCard } from './AchievementCard';
import { ScoreExplanation } from './ScoreExplanation';
import { StatsTable } from './StatsTable';

interface Props {
  papers: ToiletPaper[];
}

const ACHIEVEMENTS = {
  MONEY_SAVER: 'Économe',
  QUALITY_LOVER: 'Amateur de qualité',
  MARATHON_RUNNER: 'Marathon runner',
  BEST_VALUE: 'Meilleur rapport Q/P',
  ROLL_MASTER: 'Maître des rouleaux',
  TIME_LORD: 'Seigneur du temps',
};

export const Stats: React.FC<Props> = ({ papers }) => {
  const completedPapers = papers.filter(p => p.endDate);
  const count = completedPapers.length;

  const playAchievementSound = () => {
    const audio = new Audio('https://www.myinstants.com/media/sounds/achievement.mp3');
    audio.play();
  };

  if (count === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Statistiques</h2>
        <p className="text-gray-500">Pas encore de données disponibles</p>
      </div>
    );
  }

  const sortedBrandStats = calculateBrandStats(completedPapers);
  const bestStats = findBestStats(sortedBrandStats);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Crown className="h-6 w-6 text-yellow-400" />
          Tableau des champions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <AchievementCard
            icon={Award}
            title={ACHIEVEMENTS.BEST_VALUE}
            brand={bestStats.bestValue.brand}
            value={bestStats.bestValue.costPerDay.toFixed(2)}
            unit="€/jour"
            onAchievementClick={playAchievementSound}
          />
          <AchievementCard
            icon={Star}
            title={ACHIEVEMENTS.QUALITY_LOVER}
            brand={bestStats.bestRating.brand}
            value={bestStats.bestRating.averageRating.toFixed(1)}
            unit="/5"
            onAchievementClick={playAchievementSound}
          />
          <AchievementCard
            icon={Target}
            title={ACHIEVEMENTS.MARATHON_RUNNER}
            brand={bestStats.mostDurable.brand}
            value={bestStats.mostDurable.rollsPerDay.toFixed(2)}
            unit="rlx/jour"
            onAchievementClick={playAchievementSound}
          />
          <AchievementCard
            icon={DollarSign}
            title={ACHIEVEMENTS.MONEY_SAVER}
            brand={bestStats.bestCostPerRoll.brand}
            value={bestStats.bestCostPerRoll.costPerRoll.toFixed(2)}
            unit="€/rlx"
            onAchievementClick={playAchievementSound}
          />
          <AchievementCard
            icon={Award}
            title={ACHIEVEMENTS.ROLL_MASTER}
            brand={bestStats.bestRollsPerEuro.brand}
            value={bestStats.bestRollsPerEuro.rollsPerEuro.toFixed(2)}
            unit="rlx/€"
            onAchievementClick={playAchievementSound}
          />
          <AchievementCard
            icon={Clock}
            title={ACHIEVEMENTS.TIME_LORD}
            brand={bestStats.bestDaysPerEuro.brand}
            value={bestStats.bestDaysPerEuro.daysPerEuro.toFixed(1)}
            unit="jours/€"
            onAchievementClick={playAchievementSound}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="h-6 w-6 text-purple-600" />
          Comparaison détaillée
        </h2>
        <StatsTable stats={sortedBrandStats} bestStats={bestStats} />
        <ScoreExplanation />
      </div>
    </div>
  );
};
