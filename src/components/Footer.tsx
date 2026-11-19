import React from 'react';
import { MapPin, MessageCircle, Phone } from 'lucide-react';
import { LOGO_URL, RESTAURANT_INFO } from '../data/menuData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    RESTAURANT_INFO.address
  )}`;

  return (
    <footer
      id="contact"
      className="scroll-mt-[136px] bg-white border-t border-zinc-200 text-zinc-800"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
          {/* Left: Square Dark Emblem + Roll N Roll Contact Details + Black Action Pills (matching 0:49) */}
          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-black text-white flex flex-col items-center justify-center p-3 shadow-sm shrink-0">
              <img
                src={LOGO_URL}
                alt="Roll N Roll"
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover border-2 border-amber-400"
              />
              <div className="font-display text-lg tracking-wide uppercase mt-2 leading-none">
                ROLL N ROLL
              </div>
              <div className="text-[9px] font-bold tracking-[0.18em] text-amber-400 uppercase mt-1">
                KARACHI
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xl font-extrabold text-zinc-900">
                Roll N Roll
              </h3>

              <div className="space-y-1 text-xs sm:text-sm text-zinc-600">
                <div>
                  <span className="font-semibold text-zinc-900">Phone:</span>{' '}
                  <a
                    href={`tel:${RESTAURANT_INFO.phoneInternational.replace(/\s+/g, '')}`}
                    className="hover:text-[#FF4D00] font-semibold tabular-nums"
                  >
                    {RESTAURANT_INFO.phoneDisplay} / {RESTAURANT_INFO.phoneInternational}
                  </a>
                </div>
                <div>
                  <span className="font-semibold text-zinc-900">Status:</span>{' '}
                  <span className="text-emerald-600 font-semibold">
                    {RESTAURANT_INFO.hours}
                  </span>
                </div>
                <div className="max-w-md">
                  <span className="font-semibold text-zinc-900">Address:</span>{' '}
                  {RESTAURANT_INFO.address}
                </div>
              </div>

              {/* Black Action Pills matching Google Play / App Store buttons in video */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black hover:bg-[#FF4D00] text-white text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Order on WhatsApp</span>
                </a>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black hover:bg-[#FF4D00] text-white text-xs font-bold transition-colors"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Get Directions</span>
                </a>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneInternational.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-300 hover:border-black text-zinc-900 text-xs font-bold transition-colors tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{RESTAURANT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Follow Us + Clean Quick Links (matching 0:49) */}
          <div className="space-y-4 lg:text-right">
            <div>
              <div className="text-sm font-extrabold text-zinc-900 mb-2.5">
                Follow Us:
              </div>
              <div className="flex items-center lg:justify-end gap-2.5">
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Roll N Roll WhatsApp"
                  className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-black hover:text-white text-zinc-800 flex items-center justify-center transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneInternational.replace(/\s+/g, '')}`}
                  aria-label="Call Roll N Roll"
                  className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-black hover:text-white text-zinc-800 flex items-center justify-center transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Roll N Roll Location"
                  className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-black hover:text-white text-zinc-800 flex items-center justify-center transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center lg:justify-end gap-4 text-xs font-medium text-zinc-600">
              {[
                { id: 'menu-start', label: 'Menu' },
                { id: 'popular-items', label: 'Popular Items' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'about', label: 'Our Story' },
                { id: 'location', label: 'Branch Map' },
              ].map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className="hover:text-black hover:underline cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Attribution Strip */}
        <div className="mt-10 pt-5 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400">
          <div>© 2026 ROLL N ROLL — Pakistani Restaurant, Karachi.</div>
          <div>Open now · {RESTAURANT_INFO.address}</div>
        </div>
      </div>
    </footer>
  );
};
