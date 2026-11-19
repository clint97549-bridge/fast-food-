import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MENU_CATEGORIES } from '../data/menuData';

interface CategoryBarProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -240 : 240,
      behavior: 'smooth',
    });
  };

  return (
    <div
      id="menu-start"
      className="sticky top-[68px] z-30 w-full bg-white/95 backdrop-blur-md border-b border-zinc-200/80"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => scrollTabs('left')}
          aria-label="Scroll categories left"
          className="hidden sm:flex w-7 h-7 rounded-full hover:bg-zinc-100 text-zinc-600 items-center justify-center shrink-0 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={scrollRef}
          className="flex-1 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar"
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
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-transparent text-zinc-700 hover:bg-zinc-100 hover:text-black'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollTabs('right')}
          aria-label="Scroll categories right"
          className="hidden sm:flex w-7 h-7 rounded-full hover:bg-zinc-100 text-zinc-600 items-center justify-center shrink-0 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
