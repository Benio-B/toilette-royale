import type { DivideIcon as LucideIcon } from 'lucide-react';
import React from 'react';

interface Props {
  icon: typeof LucideIcon;
  title: string;
  brand: string;
  value: string | number;
  unit: string;
  onAchievementClick: () => void;
}

export const AchievementCard: React.FC<Props> = ({
  icon: Icon,
  title,
  brand,
  value,
  unit,
  onAchievementClick,
}) => (
  <div
    className="bg-purple-50 p-4 rounded-lg transform hover:scale-105 transition-transform cursor-pointer h-full flex flex-col"
    onClick={onAchievementClick}
  >
    <div className="flex items-center gap-2 text-sm text-purple-600 font-medium mb-2">
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span>{title}</span>
    </div>
    <div className="mt-auto">
      <p className="text-sm text-gray-600">
        {value}
        {unit}
      </p>
      <p className="text-xl font-bold" title={brand}>{brand}</p>
    </div>
  </div>
);
