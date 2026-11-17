import React from 'react';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { LOGO_URL, RESTAURANT_INFO } from '../data/menuData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      id="contact"
      className="scroll-mt-[140px] bg-black border-t border-white/10 text-zinc-300"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Column: Brand & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src={LOGO_URL}
                alt="Roll N Roll"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border-2 border-amber-400/80"
              />
              <div>
                <div className="font-display text-lg font-bold tracking-wider text-amber-400 leading-none">
                  {RESTAURANT_INFO.name}
                </div>
                <div className="text-[10px] font-semibold tracking-[0.22em] text-zinc-400 uppercase mt-0.5">
                  {RESTAURANT_INFO.subtitle}
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xs">
              Crispy zinger rolls, juicy smash burgers, pizza, pasta, broast &amp; BBQ. #KarachiSpecial
            </p>
          </div>

          {/* Center Column: GET IN TOUCH */}
          <div className="space-y-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              GET IN TOUCH
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
              <li>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneInternational.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 hover:text-amber-400 transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    {RESTAURANT_INFO.phoneDisplay} · {RESTAURANT_INFO.phoneInternational}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Order on WhatsApp ({RESTAURANT_INFO.phoneDisplay})</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-zinc-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </li>
            </ul>
          </div>

          {/* Right Column: QUICK LINKS */}
          <div className="space-y-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              QUICK LINKS
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                { id: 'menu-start', label: 'Menu' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'about', label: 'Our Story' },
                { id: 'location', label: 'Location' },
                { id: 'contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.id)}
                    className="text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500">
          <div>© 2026 ROLL N ROLL. All rights reserved.</div>
          <div className="text-emerald-400 font-medium">
            Open now • {RESTAURANT_INFO.shortAddress}
          </div>
        </div>
      </div>
    </footer>
  );
};
