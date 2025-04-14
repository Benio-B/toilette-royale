import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export const Logo = () => {
  const handleClick = () => {
    const audio = new Audio('https://www.myinstants.com/media/sounds/toilet-flush_1.mp3');
    audio.play();
  };

  return (
    <Link to="/stats" className="flex items-center gap-2 text-2xl font-bold text-purple-600 group">
      <Icon
        icon="lucide-lab:toilet-roll"
        className="h-8 w-8 transition-all duration-300 group-hover:animate-[spin_0.5s_ease-in-out]"
        onClick={handleClick}
      />
      <span className="group-hover:animate-bounce">Toilette Royale</span>
    </Link>
  );
};