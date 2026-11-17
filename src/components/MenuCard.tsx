import React, { useState } from 'react';
import { Plus, UtensilsCrossed } from 'lucide-react';
import { MenuItem } from '../data/menuData';

interface MenuCardProps {
  item: MenuItem;
  onQuickAdd: (item: MenuItem) => void;
  onOpenAddOnModal: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  onQuickAdd,
  onOpenAddOnModal,
}) => {
  const [imgError, setImgError] = useState(false);

  const handleCardAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.hasAddOnModal) {
      onOpenAddOnModal(item);
    } else {
      onQuickAdd(item);
    }
  };

  return (
    <article
      onClick={() => onOpenAddOnModal(item)}
      className="group bg-[#121214] rounded-xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-200 hover:-translate-y-0.5 flex flex-col cursor-pointer shadow-md"
    >
      {/* Top Food Poster / Dish Photo (4:5 aspect matches uploaded posters cleanly without cropping) */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
        {!imgError ? (
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-black text-zinc-500 p-4 text-center">
            <UtensilsCrossed className="w-8 h-8 mb-2 text-amber-500/60" />
            <span className="text-xs font-medium text-zinc-400">{item.name}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-[#121214]">
        <div>
          <h3 className="text-sm sm:text-[15px] font-bold text-white leading-snug group-hover:text-amber-400 transition-colors">
            {item.name}
          </h3>
          <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          <span className="text-sm sm:text-base font-extrabold text-white tabular-nums">
            Rs. {item.price}
          </span>

          {item.hasAddOnModal ? (
            <button
              type="button"
              onClick={handleCardAction}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-amber-500 text-zinc-100 hover:text-black text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Add on</span>
              <Plus className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleCardAction}
              aria-label={`Add ${item.name} to cart`}
              className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-amber-500 text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
