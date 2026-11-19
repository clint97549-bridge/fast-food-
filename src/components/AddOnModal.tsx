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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="addon-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dish Header Banner */}
        <div className="relative h-48 w-full shrink-0 bg-zinc-100">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close customization modal"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white hover:bg-black hover:text-white text-zinc-900 flex items-center justify-center transition-colors cursor-pointer shadow-md"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3.5 left-5 right-5">
            <h3
              id="addon-modal-title"
              className="text-xl sm:text-2xl font-extrabold text-white leading-tight"
            >
              {item.name}
            </h3>
            <p className="text-xs text-zinc-200 mt-0.5 line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>

        {/* Scrollable Customization Options */}
        <form
          onSubmit={handleSubmit}
          className="p-5 overflow-y-auto space-y-5 flex-1 bg-white"
        >
          {/* Spice Level */}
          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 mb-2">
              Spice Level
            </div>
            <div className="grid grid-cols-3 gap-2">
              {SPICE_LEVELS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSpiceLevel(level)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    spiceLevel === level
                      ? 'bg-black text-white border-black'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-zinc-400'
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
              <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-500">
                Add Extras & Dips
              </span>
              <span className="text-[11px] font-medium text-zinc-400">
                Optional
              </span>
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
                        ? 'bg-[#FFF5E6] border-[#FF4D00] text-zinc-900'
                        : 'bg-white border-zinc-200 text-zinc-800 hover:border-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isSelected
                            ? 'bg-black border-black text-white'
                            : 'border-zinc-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold">
                        {addon.name}
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-zinc-900 tabular-nums">
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
              className="block text-xs font-extrabold uppercase tracking-wider text-zinc-500 mb-1.5"
            >
              Special Instructions
            </label>
            <input
              id="kitchen-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., No onions, extra garlic mayo, well toasted..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-black"
            />
          </div>

          {/* Footer Quantity & Add Button */}
          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-zinc-100 rounded-full p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-8 h-8 rounded-full bg-white text-zinc-800 hover:bg-black hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-extrabold tabular-nums text-zinc-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-8 h-8 rounded-full bg-white text-zinc-800 hover:bg-black hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="submit"
              className="flex-1 py-3 px-5 rounded-full bg-black hover:bg-[#FF4D00] text-white font-bold text-sm transition-colors cursor-pointer flex items-center justify-between shadow-md"
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
