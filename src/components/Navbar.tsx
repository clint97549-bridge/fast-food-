import React, { useState } from 'react';
import { Clock, Menu as MenuIcon, Phone, ShoppingCart, X } from 'lucide-react';
import { LOGO_URL, RESTAURANT_INFO } from '../data/menuData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeNav: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'menu-start', label: 'Menu' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'about', label: 'About' },
  { id: 'location', label: 'Location' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeNav,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-black border-b border-white/10">
      {/* Top Arabic Blessing Strip */}
      <div className="bg-black border-b border-amber-500/20 px-4 py-1 text-[11px] sm:text-xs text-amber-400/95">
        <div className="max-w-[1380px] mx-auto flex items-center justify-between gap-4 overflow-hidden">
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic tracking-wide truncate"
          >
            مُحَمَّدٌ رَسُولُ اللّٰهِ صَلَّى اللّٰهُ عَلَيْهِ وَآلِهِ وَسَلَّمَ
          </p>
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic tracking-wide truncate hidden sm:block"
          >
            لَا إِلٰهَ إِلَّا اللّٰهُ مُحَمَّدٌ رَسُولُ اللّٰهِ — بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ
          </p>
        </div>
      </div>

      {/* Main 3-Zone Navigation Bar */}
      <div className="bg-[#0d0d0d]/95 backdrop-blur-md">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left: Navigation Links */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>

            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
              {NAV_LINKS.map((link) => {
                const isActive = activeNav === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
                      isActive
                        ? 'text-amber-400 border-amber-400 font-semibold'
                        : 'text-zinc-200 border-transparent hover:text-amber-400'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
          >
            <img
              src={LOGO_URL}
              alt="Roll N Roll Logo"
              referrerPolicy="no-referrer"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-amber-400/80 shadow-md group-hover:scale-105 transition-transform"
            />
            <div className="text-left">
              <div className="font-display text-lg sm:text-xl font-bold tracking-wider text-amber-400 leading-none whitespace-nowrap">
                {RESTAURANT_INFO.name}
              </div>
              <div className="text-[9px] sm:text-[10px] font-semibold tracking-[0.22em] text-zinc-400 uppercase mt-0.5 whitespace-nowrap">
                {RESTAURANT_INFO.subtitle}
              </div>
            </div>
          </button>

          {/* Right: Open Status, Phone & Cart */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <div className="hidden md:flex items-center gap-1.5 text-xs font-medium text-emerald-400 whitespace-nowrap">
              <Clock className="w-3.5 h-3.5" />
              <span>Open now</span>
            </div>

            <a
              href={`tel:${RESTAURANT_INFO.phoneInternational.replace(/\s+/g, '')}`}
              className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-100 hover:text-amber-400 transition-colors whitespace-nowrap tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{RESTAURANT_INFO.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-amber-500 hover:text-black text-white border border-white/15 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              aria-label={`Open cart with ${cartCount} items`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-xs font-bold tabular-nums">
                {cartCount > 0 ? `${cartCount}` : '0'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Drawer Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#111111] px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeNav === link.id
                    ? 'bg-amber-500/15 text-amber-400 font-semibold'
                    : 'text-zinc-200 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between px-3 text-xs text-zinc-400">
              <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Open now
              </span>
              <a
                href={`tel:${RESTAURANT_INFO.phoneInternational.replace(/\s+/g, '')}`}
                className="text-amber-400 font-semibold tabular-nums"
              >
                {RESTAURANT_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
