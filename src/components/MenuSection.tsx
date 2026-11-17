import React from 'react';
import { MenuCategory, MenuItem } from '../data/menuData';
import { MenuCard } from './MenuCard';

interface MenuSectionProps {
  category: MenuCategory;
  items: MenuItem[];
  onQuickAdd: (item: MenuItem) => void;
  onOpenAddOnModal: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  category,
  items,
  onQuickAdd,
  onOpenAddOnModal,
}) => {
  return (
    <section
      id={category.id}
      className="scroll-mt-[148px] border-t border-white/5"
    >
      {/* Category Showcase Banner Band matching the video */}
      <div className="bg-gradient-to-b from-[#232326] via-[#1c1c1f] to-[#0a0a0a] py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-[1380px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            {/* Left Preview Poster */}
            {category.spotlightImages[0] && (
              <div className="hidden md:block w-36 h-40 rounded-xl overflow-hidden border border-white/15 shadow-xl -rotate-2 shrink-0 bg-black">
                <img
                  src={category.spotlightImages[0].image}
                  alt={category.spotlightImages[0].label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Center Bold Display Title */}
            <div className="text-center">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white text-balance">
                {category.bannerTitle}
              </h2>
              <div className="mt-2 mx-auto w-16 h-1 rounded-full bg-amber-500" />
            </div>

            {/* Right Preview Poster */}
            {category.spotlightImages[1] && (
              <div className="hidden md:block w-36 h-40 rounded-xl overflow-hidden border border-white/15 shadow-xl rotate-2 shrink-0 bg-black">
                <img
                  src={category.spotlightImages[1].image}
                  alt={category.spotlightImages[1].label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu Cards 4-Column Grid */}
      <div className="bg-[#080808] pb-12 pt-4 px-4 sm:px-6">
        <div className="max-w-[1380px] mx-auto">
          {category.subTag && (
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-block px-3 py-1 rounded bg-white text-black font-display text-xs font-bold tracking-wider uppercase">
                {category.subTag}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {items.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onQuickAdd={onQuickAdd}
                onOpenAddOnModal={onOpenAddOnModal}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
