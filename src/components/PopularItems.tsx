import React from 'react';
import { Flame } from 'lucide-react';
import { MENU_ITEMS, MenuItem, POPULAR_ITEM_IDS } from '../data/menuData';
import { MenuCard } from './MenuCard';

interface PopularItemsProps {
  onQuickAdd: (item: MenuItem) => void;
  onOpenAddOnModal: (item: MenuItem) => void;
}

export const PopularItems: React.FC<PopularItemsProps> = ({
  onQuickAdd,
  onOpenAddOnModal,
}) => {
  const popularItems = POPULAR_ITEM_IDS.map((id) =>
    MENU_ITEMS.find((item) => item.id === id)
  ).filter((item): item is MenuItem => Boolean(item));

  return (
    <section
      id="popular-items"
      className="scroll-mt-[140px] max-w-[1320px] mx-auto px-4 sm:px-6 pt-5 pb-8"
    >
      <div className="mb-4">
        <div className="flex items-center gap-1.5">
          <Flame className="w-5 h-5 text-[#FF4D00] fill-[#FF4D00]" />
          <h2 className="text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight">
            Popular Items
          </h2>
        </div>
        <p className="text-xs text-zinc-500 mt-0.5">
          Most ordered right now at Roll N Roll Karachi
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {popularItems.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onQuickAdd={onQuickAdd}
            onOpenAddOnModal={onOpenAddOnModal}
          />
        ))}
      </div>
    </section>
  );
};
