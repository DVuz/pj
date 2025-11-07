import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({ onScrollLeft, onScrollRight }) => {
  return (
    <div className="flex lg:hidden gap-2">
      <button
        className="bg-[var(--green-primary)] text-white border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[var(--yellow-primary)] hover:text-[var(--green-primary)] transition-colors"
        onClick={onScrollLeft}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className="bg-[var(--green-primary)] text-white border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-[var(--yellow-primary)] hover:text-[var(--green-primary)] transition-colors"
        onClick={onScrollRight}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default CarouselControls;
