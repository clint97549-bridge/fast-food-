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

  const handleActionClick = (e: React.MouseEvent) => {
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
      className="group relative bg-white rounded-2xl border border-zinc-100 p-3.5 sm:p-4 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      {/* Clean top-right promo tag matching video cards (15% OFF / New Arrival) */}
      {item.badge && (
        <div
          className={`absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide shadow-xs ${
            item.badge === '15% OFF'
              ? 'bg-[#FFE5B4] text-[#9A3412]'
              : item.badge === 'New Arrival'
                ? 'bg-[#FEF3C7] text-[#92400E]'
                : 'bg-zinc-900 text-white'
          }`}
        >
          {item.badge}
        </div>
      )}

      {/* Top Food Visual */}
      <div>
        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#FAFAFA] mb-3">
          {!imgError ? (
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 text-zinc-400 p-4 text-center">
              <UtensilsCrossed className="w-7 h-7 mb-1.5 text-zinc-400" />
              <span className="text-xs font-medium text-zinc-500">
                {item.name}
              </span>
            </div>
          )}
        </div>

        <h3 className="text-[15px] font-bold text-zinc-900 leading-snug group-hover:text-[#FF4D00] transition-colors pr-1">
          {item.name}
        </h3>
        <p className="mt-1 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Bottom Price & Solid Black Circular '+' Button matching video */}
      <div className="mt-4 pt-2 flex items-end justify-between gap-2">
        <div className="flex flex-wrap items-baseline gap-1.5 tabular-nums">
          {item.originalPrice && (
            <span className="text-[11px] font-semibold text-zinc-400 line-through">
              Rs. {item.originalPrice}
            </span>
          )}
          <span className="text-sm sm:text-[15px] font-extrabold text-zinc-900">
            {item.isFromPrice ? `From Rs. ${item.price}` : `Rs. ${item.price}`}
          </span>
        </div>

        <button
          type="button"
          onClick={handleActionClick}
          aria-label={`Add ${item.name} to cart`}
          className="w-9 h-9 rounded-full bg-black hover:bg-[#FF4D00] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-sm"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </article>
  );
};
