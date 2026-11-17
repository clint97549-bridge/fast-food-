import React, { useState } from 'react';
import { Check, Minus, Plus, X } from 'lucide-react';
import { AddOnOption, GLOBAL_ADDONS, MenuItem } from '../data/menuData';

interface AddOnModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onConfirmAdd: (
    item: MenuItem,
    quantity: number,
    selectedAddOns: AddOnOption[],
    spiceLevel: string,
    notes: string
  ) => void;
}

const SPICE_LEVELS = ['Regular', 'Medium Spicy', 'Karachi Hot'];

export const AddOnModal: React.FC<AddOnModalProps> = ({
  item,
  onClose,
  onConfirmAdd,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [spiceLevel, setSpiceLevel] = useState('Regular');
  const [notes, setNotes] = useState('');

  if (!item) return null;

  const toggleAddOn = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedAddOns = GLOBAL_ADDONS.filter((a) => selectedIds.includes(a.id));
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const totalPrice = (item.price + addOnsTotal) * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmAdd(item, quantity, selectedAddOns, spiceLevel, notes.trim());
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="addon-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#141416] border border-white/15 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dish Header Banner */}
        <div className="relative h-44 w-full shrink-0">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-black/40 to-black/30" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close customization modal"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 hover:bg-amber-500 hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-5 right-5">
            <h3
              id="addon-modal-title"
              className="font-display text-2xl font-bold uppercase tracking-wide text-white"
            >
              {item.name}
            </h3>
            <p className="text-xs text-zinc-300 mt-0.5 line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>

        {/* Scrollable Customization Options */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Spice Level */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Spice Level
            </div>
            <div className="grid grid-cols-3 gap-2">
              {SPICE_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSpiceLevel(level)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    spiceLevel === level
                      ? 'bg-amber-500 text-black border-amber-500'
                      : 'bg-zinc-900 text-zinc-300 border-white/10 hover:border-white/25'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Extra Add-Ons */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Add Extras & Dips
              </span>
              <span className="text-[11px] text-zinc-500">Optional</span>
            </div>
            <div className="space-y-2">
              {GLOBAL_ADDONS.map((addon) => {
                const isSelected = selectedIds.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddOn(addon.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/60 text-white'
                        : 'bg-zinc-900/80 border-white/10 text-zinc-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isSelected
                            ? 'bg-amber-500 border-amber-500 text-black'
                            : 'border-zinc-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                      <span className="text-xs sm:text-sm font-medium">
                        {addon.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-amber-400 tabular-nums">
                      + Rs. {addon.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Special Kitchen Instructions */}
          <div>
            <label
              htmlFor="kitchen-notes"
              className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5"
            >
              Special Instructions
            </label>
            <input
              id="kitchen-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., No onions, extra garlic mayo, well toasted..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Sticky Modal Footer: Quantity & Add Button */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-300 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-7 text-center text-sm font-bold tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-300 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="submit"
              className="flex-1 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors cursor-pointer flex items-center justify-between"
            >
              <span>Add to Order</span>
              <span className="tabular-nums font-extrabold">Rs. {totalPrice}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
