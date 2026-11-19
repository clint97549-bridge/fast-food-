import React from 'react';
import { BannerMotif, MenuCategory, MenuItem } from '../data/menuData';
import { MenuCard } from './MenuCard';

interface MenuSectionProps {
  category: MenuCategory;
  items: MenuItem[];
  onQuickAdd: (item: MenuItem) => void;
  onOpenAddOnModal: (item: MenuItem) => void;
}

const BannerLeftIllustration: React.FC<{ motif: BannerMotif }> = ({ motif }) => {
  if (motif === 'flask') {
    return (
      <svg
        viewBox="0 0 80 80"
        className="w-12 h-12 sm:w-16 sm:h-16 text-black shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M32 14h16M35 14v18L19 58a6 6 0 005 9h32a6 6 0 005-9L45 32V14"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M25 52h30l5 8a4 4 0 01-3.5 6h-33A4 4 0 0120 60l5-8z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 80 80"
      className="w-11 h-11 sm:w-14 sm:h-14 text-black shrink-0"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18 14L32 34L10 38L28 48L14 68L38 54L46 74L50 52L70 60L54 42L72 28L48 30L44 8L34 28Z" />
    </svg>
  );
};

const BannerRightIllustration: React.FC<{ motif: BannerMotif }> = ({ motif }) => {
  if (motif === 'burger') {
    return (
      <svg
        viewBox="0 0 80 80"
        className="w-12 h-12 sm:w-16 sm:h-16 text-black shrink-0"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M14 34C14 21 25 14 40 14C55 14 66 21 66 34H14Z" />
        <rect x="11" y="38" width="58" height="8" rx="4" />
        <path d="M13 50H67L62 56H18L13 50Z" />
        <path d="M16 58H64C64 64 58 67 40 67C22 67 16 64 16 58Z" />
      </svg>
    );
  }
  if (motif === 'wrap') {
    return (
      <svg
        viewBox="0 0 80 80"
        className="w-12 h-12 sm:w-16 sm:h-16 text-black shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M22 58L48 16C52 12 62 18 58 24L32 66C28 70 18 64 22 58Z"
          fill="currentColor"
        />
        <path
          d="M28 42L42 50M34 32L48 40"
          stroke="#FFE0B5"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 80 80"
      className="w-12 h-12 sm:w-16 sm:h-16 text-black shrink-0"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M40 6L46 28L68 18L54 36L76 44L52 48L62 70L42 54L30 74L32 50L10 54L26 38L8 24L32 30Z" />
    </svg>
  );
};

export const MenuSection: React.FC<MenuSectionProps> = ({
  category,
  items,
  onQuickAdd,
  onOpenAddOnModal,
}) => {
  return (
    <section
      id={category.id}
      className="scroll-mt-[132px] max-w-[1320px] mx-auto px-4 sm:px-6 py-6"
    >
      {/* Signature Warm Apricot-Peach Category Banner matching Burger Lab video */}
      <div className="relative rounded-2xl bg-[#FFE0B2] px-6 sm:px-10 py-7 sm:py-10 mb-5 overflow-hidden flex items-center justify-between gap-4">
        <div className="opacity-90 -rotate-12 hidden sm:block">
          <BannerLeftIllustration motif={category.motif} />
        </div>

        <div className="flex-1 text-center">
          {category.arabicAccent && (
            <div
              dir="rtl"
              lang="ar"
              className="font-arabic text-2xl sm:text-3xl font-bold text-black leading-none mb-1"
            >
              {category.arabicAccent}
            </div>
          )}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-black leading-[0.95] text-balance">
            {category.bannerTitle}
          </h2>
        </div>

        <div className="opacity-90 rotate-6 hidden sm:block">
          <BannerRightIllustration motif={category.motif} />
        </div>
      </div>

      {/* 4-Column White Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {items.map((item) => (
          <MenuCard
            key={item.id}
            item={item}
            onQuickAdd={onQuickAdd}
            onOpenAddOnModal={onOpenAddOnModal}
          />
        ))}
      </div>
    </section>
  );
};
