import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../data/menuData';

interface HeroSliderProps {
  onSelectCategory: (categoryId: string) => void;
}

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
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentIndex];

  return (
    <section
      className="relative w-full h-[360px] sm:h-[430px] lg:h-[480px] bg-black overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured promotions"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.headline}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-opacity duration-500"
        />
        {/* Left-to-right gradient scrim for bold studio contrast matching the video */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1380px] mx-auto h-full px-12 sm:px-16 flex flex-col justify-center">
        <div className="max-w-2xl">
          {slide.badge && (
            <div className="inline-block bg-amber-500 text-black text-[11px] sm:text-xs font-extrabold tracking-wider px-3 py-1 rounded mb-3 uppercase">
              {slide.badge}
            </div>
          )}

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-amber-400 leading-[0.95] drop-shadow-lg text-balance">
            {slide.headline}
          </h1>

          <div className="mt-3 flex flex-wrap items-baseline gap-4">
            {slide.originalPrice && (
              <span className="font-display text-2xl sm:text-3xl font-bold text-zinc-400 line-through tabular-nums">
                RS {slide.originalPrice}
              </span>
            )}
            <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wide text-amber-300 uppercase">
              {slide.subheadline}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectCategory(slide.targetCategoryId)}
              className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm tracking-wide transition-colors cursor-pointer whitespace-nowrap shadow-lg shadow-amber-500/20"
            >
              Order Now
            </button>
            <button
              type="button"
              onClick={() => onSelectCategory('combo-deals')}
              className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/15 backdrop-blur-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              View Deals
            </button>
          </div>
        </div>
      </div>

      {/* Left / Right Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-amber-500 hover:text-black text-white flex items-center justify-center border border-white/15 transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-amber-500 hover:text-black text-white flex items-center justify-center border border-white/15 transition-colors cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              idx === currentIndex
                ? 'w-6 bg-amber-400'
                : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
