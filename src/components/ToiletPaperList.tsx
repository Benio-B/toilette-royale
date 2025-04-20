import type { ToiletPaper } from '../types';
import { Edit2, Star, Trash2 } from 'lucide-react';
import React from 'react';

interface Props {
  papers: ToiletPaper[];
  onDelete: (id: string) => void;
  onEdit: (paper: ToiletPaper) => void;
  editingId?: string | null;
}

function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const ToiletPaperList: React.FC<Props> = ({
  papers,
  onDelete,
  onEdit,
  editingId,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {papers.map(paper => (
        <div
          key={paper.id}
          className={`bg-white p-4 rounded-lg shadow-md ${
            editingId === paper.id ? 'ring-2 ring-purple-500' : ''
          }`}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{paper.brand}</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onEdit(paper)}
                className="text-purple-500 hover:text-purple-700 transition-colors"
                title="Modifier"
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(paper.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Supprimer"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-2 space-y-1">
            <p>
              Prix:
              {paper.price}
              €
            </p>
            <p>
              {paper.rollCount}
              {' '}
              rouleaux
            </p>
            <p>
              Début:
              {formatDateTime(paper.startDate)}
            </p>
            {paper.endDate && (
              <p>
                Fin:
                {formatDateTime(paper.endDate)}
              </p>
            )}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(rating => (
                <Star
                  key={rating}
                  className={`h-4 w-4 ${
                    rating <= paper.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
