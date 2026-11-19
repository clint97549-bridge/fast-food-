import React, { useState } from 'react';
import {
  CheckCircle2,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { AddOnOption, MenuItem, RESTAURANT_INFO } from '../data/menuData';

export interface CartEntry {
  cartKey: string;
  item: MenuItem;
  quantity: number;
  addOns: AddOnOption[];
  spiceLevel: string;
  notes: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  selectedArea: string;
  onClose: () => void;
  items: CartEntry[];
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  selectedArea,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, entry) => {
    const addOnSum = entry.addOns.reduce((a, b) => a + b.price, 0);
    return sum + (entry.item.price + addOnSum) * entry.quantity;
  }, 0);

  const deliveryFee =
    orderType === 'delivery' && subtotal > 0 && subtotal < 1500 ? 120 : 0;
  const grandTotal = subtotal + deliveryFee;

  const validateAndBuildSummary = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      setFormError('Please enter your name and phone number.');
      return null;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setFormError('Please enter your Karachi delivery address.');
      return null;
    }
    setFormError(null);
    return items
      .map((entry) => {
        const addOnText =
          entry.addOns.length > 0
            ? ` (+ ${entry.addOns.map((a) => a.name).join(', ')})`
            : '';
        const unit =
          entry.item.price + entry.addOns.reduce((a, b) => a + b.price, 0);
        return `${entry.quantity}x ${entry.item.name}${addOnText} [${entry.spiceLevel}] - Rs. ${unit * entry.quantity}`;
      })
      .join('\n');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const summary = validateAndBuildSummary();
    if (!summary) return;
    const orderCode = `RNR-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedOrderId(orderCode);
    onClearCart();
  };

  const handleWhatsAppOrder = () => {
    const summary = validateAndBuildSummary();
    if (!summary) return;
    const msg = encodeURIComponent(
      `*New Order — ${RESTAURANT_INFO.name}*\n` +
        `Type: ${orderType === 'delivery' ? `Cash on Delivery (${selectedArea})` : 'Self Pickup'}\n` +
        `Name: ${customerName}\nPhone: ${customerPhone}\n` +
        (orderType === 'delivery' ? `Address: ${deliveryAddress}\n\n` : '\n') +
        `*Items:*\n${summary}\n\n` +
        `Subtotal: Rs. ${subtotal}\n` +
        `Delivery: Rs. ${deliveryFee}\n` +
        `*Total: Rs. ${grandTotal}*`
    );
    window.open(
      `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${msg}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleClose = () => {
    setConfirmedOrderId(null);
    setFormError(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Your order cart"
      onClick={handleClose}
    >
      <aside
        className="w-full max-w-md bg-white border-l border-zinc-200 h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#FF4D00]" />
            <h2 className="text-lg font-extrabold text-zinc-900">Your Cart</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-black hover:text-white text-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {confirmedOrderId ? (
            <div className="py-10 px-4 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-zinc-900">
                Order #{confirmedOrderId} Confirmed
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Thank you,{' '}
                <span className="text-zinc-900 font-bold">{customerName}</span>!
                Our kitchen at Jamshed Road No. 3 is preparing your fresh order.
              </p>
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-700 space-y-1 text-left">
                <div>
                  <span className="text-zinc-500">Order Mode:</span>{' '}
                  {orderType === 'delivery'
                    ? `Cash on Delivery — ${selectedArea} (35–45 mins)`
                    : 'Self Pickup (20 mins)'}
                </div>
                <div>
                  <span className="text-zinc-500">Contact:</span> {customerPhone}
                </div>
                {orderType === 'delivery' && (
                  <div>
                    <span className="text-zinc-500">Address:</span>{' '}
                    {deliveryAddress}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 rounded-full bg-black hover:bg-[#FF4D00] text-white font-bold text-sm transition-colors cursor-pointer"
              >
                Back to Menu
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto" />
              <div className="text-base font-bold text-zinc-900">
                Your cart is empty
              </div>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Tap the + button on any crispy zinger roll, smashed burger, pizza,
                or combo deal to start ordering.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {items.map((entry) => {
                  const unitPrice =
                    entry.item.price +
                    entry.addOns.reduce((s, a) => s + a.price, 0);
                  return (
                    <div
                      key={entry.cartKey}
                      className="p-3 rounded-2xl bg-zinc-50 border border-zinc-200/70 flex gap-3"
                    >
                      <img
                        src={entry.item.image}
                        alt={entry.item.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-white"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-zinc-900 truncate">
                            {entry.item.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(entry.cartKey)}
                            aria-label={`Remove ${entry.item.name}`}
                            className="text-zinc-400 hover:text-red-500 cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-zinc-500 mt-0.5">
                          {entry.spiceLevel}
                          {entry.addOns.length > 0 &&
                            ` · +${entry.addOns.map((a) => a.name).join(', ')}`}
                        </div>
                        {entry.notes && (
                          <div className="text-[11px] text-[#FF4D00] italic mt-0.5 truncate">
                            "{entry.notes}"
                          </div>
                        )}

                        <div className="mt-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-1 bg-white rounded-full p-0.5 border border-zinc-200">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(entry.cartKey, -1)}
                              aria-label="Decrease quantity"
                              className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-extrabold tabular-nums text-zinc-900">
                              {entry.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(entry.cartKey, 1)}
                              aria-label="Increase quantity"
                              className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-700 hover:bg-zinc-100 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-sm font-extrabold text-zinc-900 tabular-nums">
                            Rs. {unitPrice * entry.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Delivery / Pickup Switch */}
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-full bg-zinc-100">
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    orderType === 'delivery'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  Delivery ({selectedArea})
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    orderType === 'pickup'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  Self Pickup
                </button>
              </div>

              <form
                id="checkout-form"
                onSubmit={handlePlaceOrder}
                className="space-y-3"
              >
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full Name *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-black"
                />
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Phone Number (e.g. 0314 1234567) *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-black"
                />
                {orderType === 'delivery' && (
                  <textarea
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder={`Address in ${selectedArea}, Karachi (House/Flat, Street) *`}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-black resize-none"
                  />
                )}
                {formError && (
                  <p className="text-xs text-red-600 font-semibold">{formError}</p>
                )}
              </form>
            </>
          )}
        </div>

        {/* Totals & Submit */}
        {items.length > 0 && !confirmedOrderId && (
          <div className="p-5 border-t border-zinc-100 bg-zinc-50 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="tabular-nums font-semibold text-zinc-800">
                  Rs. {subtotal}
                </span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>
                  Delivery Fee{' '}
                  {subtotal >= 1500 && orderType === 'delivery'
                    ? '(Free above Rs. 1500)'
                    : ''}
                </span>
                <span className="tabular-nums font-semibold text-zinc-800">
                  {deliveryFee === 0 ? 'Free' : `Rs. ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-zinc-900 pt-1.5 border-t border-zinc-200">
                <span>Total (COD)</span>
                <span className="tabular-nums text-[#FF4D00]">
                  Rs. {grandTotal}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="submit"
                form="checkout-form"
                className="py-3 px-4 rounded-full bg-black hover:bg-[#FF4D00] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Place Order
              </button>
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
