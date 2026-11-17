import React, { useRef } from 'react';
import {
  Beef,
  CupSoda,
  Drumstick,
  Flame,
  Pizza,
  PlusCircle,
  Sandwich,
  Sparkles,
  Utensils,
  UtensilsCrossed,
} from 'lucide-react';
import { MENU_CATEGORIES } from '../data/menuData';

interface CategoryBarProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'combo-deals':
      return <Flame className="w-3.5 h-3.5 shrink-0" />;
    case 'rolls-wraps':
      return <Utensils className="w-3.5 h-3.5 shrink-0" />;
    case 'classic-beef':
    case 'premium-beef':
      return <Beef className="w-3.5 h-3.5 shrink-0" />;
    case 'zingsters':
      return <Drumstick className="w-3.5 h-3.5 shrink-0" />;
    case 'pizza-pasta':
      return <Pizza className="w-3.5 h-3.5 shrink-0" />;
    case 'sandwiches-broast':
      return <Sandwich className="w-3.5 h-3.5 shrink-0" />;
    case 'desi-specials':
      return <Sparkles className="w-3.5 h-3.5 shrink-0" />;
    case 'fries-sides':
      return <UtensilsCrossed className="w-3.5 h-3.5 shrink-0" />;
    case 'drinks':
      return <CupSoda className="w-3.5 h-3.5 shrink-0" />;
    default:
      return <PlusCircle className="w-3.5 h-3.5 shrink-0" />;
  }
};

export const CategoryBar: React.FC<CategoryBarProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id="menu-start"
      className="sticky top-[89px] sm:top-[93px] z-30 w-full bg-[#0d0d0d]/95 backdrop-blur-md border-y border-white/10 shadow-lg"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-2.5">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar"
          role="tablist"
          aria-label="Menu categories"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectCategory(category.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-[#1a1a1d] text-zinc-200 hover:bg-zinc-800 hover:text-white border border-white/10'
                }`}
              >
                {getCategoryIcon(category.id)}
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
