import React, { useState } from 'react';
import {
  Check,
  ChevronRight,
  Clock,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Phone,
  ShoppingCart,
  X,
} from 'lucide-react';
import {
  DELIVERY_AREAS,
  LOGO_URL,
  MENU_CATEGORIES,
  RESTAURANT_INFO,
} from '../data/menuData';

interface NavbarProps {
  cartCount: number;
  selectedArea: string;
  onSelectArea: (area: string) => void;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  selectedArea,
  onSelectArea,
  onOpenCart,
  onNavigate,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [areaModalOpen, setAreaModalOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setDrawerOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-zinc-200/80">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between gap-3">
          {/* Left Zone: Delivery Area Selector + Phone Pill (matching reference layout) */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setAreaModalOpen(true)}
              className="flex items-center gap-2 sm:gap-2.5 bg-[#F4F4F5] hover:bg-zinc-200/80 transition-colors rounded-xl px-2.5 sm:px-3.5 py-1.5 text-left cursor-pointer max-w-[165px] sm:max-w-[215px]"
              aria-label="Select Karachi delivery area"
            >
              <MapPin className="w-4 h-4 text-zinc-800 shrink-0" />
              <div className="min-w-0 leading-tight">
                <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                  DELIVERY
                </div>
                <div className="text-xs font-extrabold text-zinc-900 truncate">
                  {selectedArea}
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            </button>

            <a
              href={`tel:${RESTAURANT_INFO.phoneInternational.replace(/\s+/g, '')}`}
              className="hidden md:inline-flex items-center gap-2 bg-[#F4F4F5] hover:bg-zinc-200/80 transition-colors rounded-xl px-3.5 py-2.5 text-xs font-extrabold text-zinc-900 tabular-nums whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-800 shrink-0" />
              <span>{RESTAURANT_INFO.phoneDisplay}</span>
            </a>
          </div>

          {/* Center Zone: Prominent Centered Circular ROLL N ROLL Emblem */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 bg-black text-white px-3 sm:px-4 py-1.5 rounded-2xl shadow-md hover:bg-zinc-900 transition-colors cursor-pointer shrink-0"
            aria-label="Roll N Roll Home"
          >
            <img
              src={LOGO_URL}
              alt="Roll N Roll Logo"
              referrerPolicy="no-referrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-amber-400/80 shrink-0"
            />
            <div className="text-left leading-none pr-0.5">
              <div className="font-display text-base sm:text-lg tracking-wide text-white uppercase whitespace-nowrap">
                ROLL N ROLL
              </div>
              <div className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] text-amber-400 uppercase whitespace-nowrap">
                KARACHI
              </div>
            </div>
          </button>

          {/* Right Zone: Cart Circle + Menu Circle */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Open cart with ${cartCount} items`}
              className="relative w-10 h-10 rounded-full border border-zinc-200 hover:border-black bg-white text-zinc-900 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF4D00] text-white text-[10px] font-extrabold flex items-center justify-center tabular-nums shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation drawer"
              className="w-10 h-10 rounded-full border border-zinc-200 hover:border-black bg-white text-zinc-900 flex items-center justify-center transition-colors cursor-pointer"
            >
              <MenuIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end"
          onClick={() => setDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <aside
            className="w-full max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-2.5">
                  <img
                    src={LOGO_URL}
                    alt="Roll N Roll"
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover border border-zinc-200"
                  />
                  <div>
                    <div className="font-display text-lg uppercase text-zinc-900 leading-none">
                      ROLL N ROLL
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> Open now
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation menu"
                  className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-2 pb-1">
                  Quick Sections
                </div>
                {[
                  { id: 'popular-items', label: 'Popular Items' },
                  { id: 'reviews', label: 'Customer Reviews' },
                  { id: 'about', label: 'About Roll N Roll' },
                  { id: 'location', label: 'Karachi Branch Map' },
                  { id: 'contact', label: 'Contact & Hours' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-zinc-800 hover:bg-zinc-100 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 px-2 pb-1">
                  Menu Categories
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {MENU_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleNavClick(cat.id)}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 hover:bg-[#FFE0B5]/60 hover:text-black transition-colors cursor-pointer"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 space-y-2.5">
              <div className="text-xs text-zinc-500 leading-relaxed">
                {RESTAURANT_INFO.address}
              </div>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Order ({RESTAURANT_INFO.phoneDisplay})</span>
              </a>
            </div>
          </aside>
        </div>
      )}

      {/* Delivery Area & Branch Modal */}
      {areaModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setAreaModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Choose Karachi delivery area"
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-zinc-900">
                  Select Delivery Area
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Fresh dispatch from Jamshed Road No. 3, Karachi
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAreaModalOpen(false)}
                aria-label="Close delivery modal"
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {DELIVERY_AREAS.map((area) => {
                  const active = selectedArea === area;
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => {
                        onSelectArea(area);
                        setAreaModalOpen(false);
                      }}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold border text-left flex items-center justify-between transition-colors cursor-pointer ${
                        active
                          ? 'bg-black text-white border-black'
                          : 'bg-zinc-50 text-zinc-800 border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      <span className="truncate">{area}</span>
                      {active && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-xl bg-[#F4F4F5] text-xs text-zinc-700 space-y-1">
                <div className="font-bold text-zinc-900">
                  Roll N Roll Main Branch ({RESTAURANT_INFO.hours})
                </div>
                <div>{RESTAURANT_INFO.address}</div>
                <div className="font-semibold text-zinc-900 tabular-nums pt-0.5">
                  Call: {RESTAURANT_INFO.phoneDisplay} · {RESTAURANT_INFO.phoneInternational}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
