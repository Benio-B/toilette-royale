import React from 'react';
import { Info } from 'lucide-react';

interface CriteriaRowProps {
  label: string;
  objective: string;
  weight: string;
  tooltip: string;
}

const CriteriaRow: React.FC<CriteriaRowProps> = ({ label, objective, weight, tooltip }) => (
  <tr className="group">
    <td className="py-1 flex items-center gap-1">
      {label}
      <div className="relative">
        <Info className="h-4 w-4 text-purple-400 cursor-help" />
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-10">
          {tooltip}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </div>
    </td>
    <td className="py-1 text-gray-600">{objective}</td>
    <td className="py-1 font-medium">{weight}</td>
  </tr>
);

export const ScoreExplanation: React.FC = () => (
  <div className="mt-4 p-4 bg-purple-50 rounded-lg">
    <h3 className="font-semibold mb-2">Calcul du score global</h3>
    <div className="space-y-4">
      <table className="w-full">
        <thead>
          <tr className="border-b border-purple-200">
            <th className="text-left pb-2">Critère</th>
            <th className="text-left pb-2">Objectif</th>
            <th className="text-left pb-2">Poids</th>
          </tr>
        </thead>
        <tbody>
          <CriteriaRow
            label="Prix/rlx"
            objective="Plus bas = mieux"
            weight="10%"
            tooltip="Prix par rouleau : plus c'est économique, meilleur c'est"
          />
          <CriteriaRow
            label="Rlx/€"
            objective="Plus haut = mieux"
            weight="10%"
            tooltip="Nombre de rouleaux par euro : plus on en a, meilleur c'est"
          />
          <CriteriaRow
            label="Jours/€"
            objective="Plus haut = mieux"
            weight="20%"
            tooltip="Nombre de jours d'utilisation par euro : plus ça dure, meilleur c'est"
          />
          <CriteriaRow
            label="Note"
            objective="Plus haut = mieux"
            weight="25%"
            tooltip="Note subjective de satisfaction : plus c'est agréable, meilleur c'est"
          />
          <CriteriaRow
            label="Coût/jour"
            objective="Plus bas = mieux"
            weight="25%"
            tooltip="Coût quotidien : plus c'est économique, meilleur c'est"
          />
          <CriteriaRow
            label="Rlx/jour"
            objective="Plus bas = mieux"
            weight="10%"
            tooltip="Consommation quotidienne : moins on utilise de rouleaux, meilleur c'est"
          />
        </tbody>
      </table>

      <div className="text-sm space-y-2">
        <h4 className="font-medium">🧮 Méthode de calcul</h4>
        <p>Pour chaque critère :</p>
        <ol className="list-decimal list-inside space-y-1 ml-4">
          <li>Les valeurs sont standardisées entre 0 et 1</li>
          <li>Pour les critères où "plus petit = mieux" :
            <br /><code className="text-xs bg-purple-100 px-1">score = (max - valeur) / (max - min)</code>
          </li>
          <li>Pour les critères où "plus grand = mieux" :
            <br /><code className="text-xs bg-purple-100 px-1">score = (valeur - min) / (max - min)</code>
          </li>
          <li>Chaque score est multiplié par son poids</li>
          <li>Le score final est la somme des scores pondérés × 100</li>
        </ol>
      </div>
    </div>
  </div>
);