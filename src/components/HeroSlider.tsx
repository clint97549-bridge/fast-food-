import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { HERO_SLIDES, HeroSlide } from '../data/menuData';

interface HeroSliderProps {
  onSelectCategory: (categoryId: string) => void;
}

const getThemeStyles = (theme: HeroSlide['theme']) => {
  switch (theme) {
    case 'orange':
      return {
        bg: 'bg-gradient-to-br from-[#FF5500] via-[#FF4500] to-[#D92D00]',
        eyebrow: 'text-[#FFE2B5]',
        headline: 'text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.22)]',
        subtext: 'text-white/95',
        pricePill: 'bg-[#FFF0D6] text-[#18181B]',
        calloutChip: 'bg-black/20 text-white border border-white/25',
        ctaBtn: 'bg-black text-white hover:bg-zinc-900',
      };
    case 'cream':
      return {
        bg: 'bg-gradient-to-br from-[#FFF3DF] via-[#FFE6C2] to-[#FFD29B]',
        eyebrow: 'text-[#D93800]',
        headline: 'text-[#18181B]',
        subtext: 'text-zinc-800',
        pricePill: 'bg-[#FF4D00] text-white',
        calloutChip: 'bg-black/10 text-zinc-900 border border-black/10',
        ctaBtn: 'bg-black text-white hover:bg-zinc-800',
      };
    case 'crimson':
      return {
        bg: 'bg-gradient-to-br from-[#D91B23] via-[#B81118] to-[#82090F]',
        eyebrow: 'text-amber-300',
        headline: 'text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.28)]',
        subtext: 'text-white/90',
        pricePill: 'bg-amber-400 text-black',
        calloutChip: 'bg-black/25 text-white border border-white/20',
        ctaBtn: 'bg-white text-black hover:bg-zinc-100',
      };
    default:
      return {
        bg: 'bg-gradient-to-br from-[#18181B] via-[#111113] to-black',
        eyebrow: 'text-amber-400',
        headline: 'text-white',
        subtext: 'text-zinc-300',
        pricePill: 'bg-[#FF5500] text-white',
        calloutChip: 'bg-white/10 text-zinc-100 border border-white/15',
        ctaBtn: 'bg-[#FF5500] text-white hover:bg-[#E04800]',
      };
  }
};

export const HeroSlider: React.FC<HeroSliderProps> = ({ onSelectCategory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentIndex];
  const styles = getThemeStyles(slide.theme);

  return (
    <section
      className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-4 pb-2 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured promotions"
    >
      <div
        className={`relative rounded-2xl overflow-hidden min-h-[270px] sm:min-h-[360px] lg:min-h-[410px] ${styles.bg} shadow-sm transition-colors duration-500`}
      >
        {/* Subtle decorative burst circles matching promo posters */}
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-white/10 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -left-20 -bottom-24 w-72 h-72 rounded-full bg-black/10 pointer-events-none"
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-4 px-11 sm:px-16 py-7 sm:py-9 min-h-[270px] sm:min-h-[360px] lg:min-h-[410px]">
          {/* Left Bold Display Typography + Price Tag */}
          <div className="md:col-span-7 space-y-3 sm:space-y-4">
            {slide.eyebrow && (
              <div
                className={`text-[11px] sm:text-xs font-extrabold tracking-[0.18em] uppercase ${styles.eyebrow}`}
              >
                {slide.eyebrow}
              </div>
            )}

            <h1
              className={`font-display text-4xl sm:text-6xl lg:text-7xl uppercase leading-[0.95] tracking-tight text-balance ${styles.headline}`}
            >
              {slide.headline}
            </h1>

            <p className={`text-xs sm:text-sm md:text-base font-medium max-w-xl ${styles.subtext}`}>
              {slide.subheadline}
            </p>

            {slide.callouts && (
              <div className="hidden sm:flex flex-wrap items-center gap-2 pt-0.5">
                {slide.callouts.map((c) => (
                  <span
                    key={c}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${styles.calloutChip}`}
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Tilted Big Price Tag matching Burger Lab '2950 ONLY' */}
              <div
                className={`inline-flex items-baseline gap-2 px-4 py-2 rounded-xl -rotate-2 shadow-md ${styles.pricePill}`}
              >
                {slide.originalPrice && (
                  <span className="text-xs sm:text-sm font-bold line-through opacity-60 tabular-nums">
                    {slide.originalPrice}
                  </span>
                )}
                <span className="font-display text-2xl sm:text-3xl leading-none tabular-nums">
                  RS. {slide.price}
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider">
                  ONLY
                </span>
              </div>

              <button
                type="button"
                onClick={() => onSelectCategory(slide.targetCategoryId)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap shadow-md ${styles.ctaBtn}`}
              >
                Order Now
              </button>
            </div>
          </div>

          {/* Right Featured Dish / Roll N Roll Poster Showcase */}
          <div className="hidden md:flex md:col-span-5 justify-end">
            <button
              type="button"
              onClick={() => onSelectCategory(slide.targetCategoryId)}
              className="relative w-full max-w-[330px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 rotate-2 hover:rotate-0 transition-transform duration-300 cursor-pointer bg-black"
            >
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.headline}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        {/* Left / Right Circular White Arrows matching video */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-black hover:text-white text-zinc-900 flex items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-black hover:text-white text-zinc-900 flex items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Bottom Pagination Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'w-5 bg-white shadow-xs'
                  : 'w-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Bottom-Right Secure Payments Badge matching video */}
        <div className="hidden lg:flex items-center gap-2 absolute bottom-3 right-4 z-20 bg-white/95 text-zinc-900 px-3 py-1 rounded-lg shadow-sm text-[10px] font-bold tracking-wide">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>SECURE PAYMENTS · COD / VISA / MC</span>
        </div>
      </div>
    </section>
  );
};
