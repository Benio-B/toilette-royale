import type { ToiletPaper } from '../types';
import { Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Props {
  onSubmit: (paper: ToiletPaper) => void;
  initialPaper?: ToiletPaper | null;
  onCancel?: () => void;
}

const FUNNY_PLACEHOLDERS = [
  'Le PQ de la victoire',
  'Le rouleau magique',
  'Le papier du bonheur',
  'Le doux sauveur',
  'Le confort ultime',
  'Le rouleau légendaire',
  'Le papier des champions',
];

function formatDateTimeLocal(isoString: string) {
  const storedDate = new Date(isoString);
  const offset = storedDate.getTimezoneOffset() * 60000;
  return new Date(storedDate.getTime() - offset).toISOString().slice(0, 16);
}

export const ToiletPaperForm: React.FC<Props> = ({
  onSubmit,
  initialPaper,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    brand: '',
    price: '',
    rollCount: '',
    startDate: '',
    endDate: '',
    rating: 0,
  });

  const [placeholder] = useState(
    FUNNY_PLACEHOLDERS[Math.floor(Math.random() * FUNNY_PLACEHOLDERS.length)],
  );

  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (initialPaper) {
      setFormData({
        brand: initialPaper.brand,
        price: initialPaper.price.toString(),
        rollCount: initialPaper.rollCount.toString(),
        startDate: formatDateTimeLocal(initialPaper.startDate),
        endDate: initialPaper.endDate ?
            formatDateTimeLocal(initialPaper.endDate) :
          '',
        rating: initialPaper.rating,
      });
    }
  }, [initialPaper]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const startDateTime = new Date(formData.startDate);
    const endDateTime = formData.endDate ? new Date(formData.endDate) : null;

    onSubmit({
      id: initialPaper?.id || crypto.randomUUID(),
      brand: formData.brand,
      price: Number(formData.price),
      rollCount: Number(formData.rollCount),
      startDate: startDateTime.toISOString(),
      endDate: endDateTime ? endDateTime.toISOString() : null,
      rating: formData.rating,
    });

    if (!initialPaper) {
      setConfetti(true);
      setTimeout(() => setConfetti(false), 2000);
    }

    setFormData({
      brand: '',
      price: '',
      rollCount: '',
      startDate: '',
      endDate: '',
      rating: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden">
      {confetti && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 animate-confetti opacity-70 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent"></div>
        </div>
      )}
      <h2 className="text-xl font-bold mb-4">
        {initialPaper ? 'Modifier le papier' : 'Ajouter un nouveau papier'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Marque
          </label>
          <input
            type="text"
            value={formData.brand}
            onChange={e =>
              setFormData({ ...formData, brand: e.target.value })}
            placeholder={placeholder}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prix (€)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={e =>
              setFormData({ ...formData, price: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre de rouleaux
          </label>
          <input
            type="number"
            value={formData.rollCount}
            onChange={e =>
              setFormData({ ...formData, rollCount: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date de début
          </label>
          <input
            type="datetime-local"
            value={formData.startDate}
            onChange={e =>
              setFormData({ ...formData, startDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date de fin (optionnel)
          </label>
          <input
            type="datetime-local"
            value={formData.endDate}
            onChange={e =>
              setFormData({ ...formData, endDate: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            min={formData.startDate}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Note
          </label>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map(rating => (
              <Star
                key={rating}
                className={`h-6 w-6 cursor-pointer transition-all hover:scale-125 ${
                  rating <= formData.rating ?
                    'fill-yellow-400 text-yellow-400' :
                    'text-gray-300'
                }`}
                onClick={() => {
                  setFormData({ ...formData, rating });
                  if (rating === 5) {
                    const audio = new Audio('https://www.myinstants.com/media/sounds/wow-meme-sound-effect.mp3');
                    audio.play();
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-all hover:scale-105 active:scale-95"
        >
          {initialPaper ? 'Modifier' : 'Ajouter'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-all hover:scale-105 active:scale-95"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
};
