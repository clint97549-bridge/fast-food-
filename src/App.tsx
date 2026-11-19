import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { ArrowRight, Check, Search, ShoppingCart, X } from 'lucide-react';
import { AddOnModal } from './components/AddOnModal';
import { CartDrawer, CartEntry } from './components/CartDrawer';
import { CategoryBar } from './components/CategoryBar';
import { Footer } from './components/Footer';
import { HeroSlider } from './components/HeroSlider';
import { LocationMap } from './components/LocationMap';
import { MenuCard } from './components/MenuCard';
import { MenuSection } from './components/MenuSection';
import { Navbar } from './components/Navbar';
import { PopularItems } from './components/PopularItems';
import { ReviewsAndAbout } from './components/ReviewsAndAbout';
import {
  AddOnOption,
  DELIVERY_AREAS,
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuItem,
} from './data/menuData';

export default function App() {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const [selectedArea, setSelectedArea] = useState(DELIVERY_AREAS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  useEffect(() => {
    const handleQuota = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // Scroll-spy for sticky horizontal category pill bar
  useEffect(() => {
    const handleScroll = () => {
      const offset = 190;
      for (let i = MENU_CATEGORIES.length - 1; i >= 0; i--) {
        const el = document.getElementById(MENU_CATEGORIES[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            setActiveCategory(MENU_CATEGORIES[i].id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage((curr) => (curr === message ? null : curr));
    }, 2400);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (MENU_CATEGORIES.some((c) => c.id === sectionId)) {
      setActiveCategory(sectionId);
    }
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const focusSearch = useCallback(() => {
    searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => searchInputRef.current?.focus(), 250);
  }, []);

  const addToCart = useCallback(
    (
      item: MenuItem,
      quantity: number,
      addOns: AddOnOption[],
      spiceLevel: string,
      notes: string
    ) => {
      const addOnKey = addOns
        .map((a) => a.id)
        .sort()
        .join(',');
      const cartKey = `${item.id}::${spiceLevel}::${addOnKey}::${notes}`;

      setCartItems((prev) => {
        const existing = prev.find((e) => e.cartKey === cartKey);
        if (existing) {
          return prev.map((e) =>
            e.cartKey === cartKey
              ? { ...e, quantity: e.quantity + quantity }
              : e
          );
        }
        return [
          ...prev,
          { cartKey, item, quantity, addOns, spiceLevel, notes },
        ];
      });

      showToast(`${item.name} added to cart`);
    },
    [showToast]
  );

  const handleQuickAdd = useCallback(
    (item: MenuItem) => {
      addToCart(item, 1, [], 'Regular', '');
    },
    [addToCart]
  );

  const handleUpdateQuantity = useCallback((cartKey: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((entry) =>
          entry.cartKey === cartKey
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  }, []);

  const handleRemoveItem = useCallback((cartKey: string) => {
    setCartItems((prev) => prev.filter((entry) => entry.cartKey !== cartKey));
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredItems = useMemo(() => {
    if (!normalizedQuery) return [];
    return MENU_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  const totalCount = useMemo(
    () => cartItems.reduce((sum, entry) => sum + entry.quantity, 0),
    [cartItems]
  );

  const totalAmount = useMemo(
    () =>
      cartItems.reduce((sum, entry) => {
        const addOnsTotal = entry.addOns.reduce((a, b) => a + b.price, 0);
        return sum + (entry.item.price + addOnsTotal) * entry.quantity;
      }, 0),
    [cartItems]
  );

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2 text-xs text-center sticky top-0 z-50">
          <span>
            Google Maps Platform quota reached.{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold"
            >
              View map details
            </a>
            .
          </span>
        </div>
      )}

      <Navbar
        cartCount={totalCount}
        selectedArea={selectedArea}
        onSelectArea={setSelectedArea}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
      />

      <main className="flex-1 bg-white">
        <HeroSlider onSelectCategory={scrollToSection} />

        <CategoryBar
          activeCategory={activeCategory}
          onSelectCategory={scrollToSection}
        />

        {/* Pill Search Bar + Flat 15% Off Promo Strip matching Burger Lab video (0:10-0:21) */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-5 pb-2 space-y-4">
          <div className="relative flex items-center bg-white border border-zinc-200 rounded-full px-4 py-1.5 shadow-[0_1px_6px_rgba(0,0,0,0.04)] focus-within:border-black transition-colors">
            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Zinger Roll, Smoky Beast, Alfredo Pasta, Broast..."
              aria-label="Search Roll N Roll menu"
              className="flex-1 bg-transparent px-3 py-1.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={focusSearch}
                aria-label="Search menu"
                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Slim Flat 15% Off Discount Banner matching video */}
          <button
            type="button"
            onClick={() => scrollToSection('combo-deals')}
            className="w-full sm:w-auto inline-flex items-center gap-2.5 bg-[#F4F4F5] hover:bg-[#FFE0B2]/70 transition-colors rounded-xl px-4 py-2.5 text-left cursor-pointer"
          >
            <span className="text-xs font-semibold text-zinc-600">Flat</span>
            <span className="w-6 h-6 rounded-full bg-[#FFB300] text-black text-xs font-extrabold flex items-center justify-center tabular-nums">
              15
            </span>
            <span className="text-xs font-extrabold text-zinc-900">
              % Off on Combo Deals &amp; Selected Rolls
            </span>
          </button>
        </div>

        {/* Live Search Results View OR Standard Storefront Sections */}
        {normalizedQuery ? (
          <section className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold text-zinc-900">
                Search results for "{searchQuery}" ({filteredItems.length})
              </h2>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-[#FF4D00] hover:underline cursor-pointer"
              >
                Clear filter
              </button>
            </div>
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {filteredItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    onQuickAdd={handleQuickAdd}
                    onOpenAddOnModal={(m) => setModalItem(m)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-10 rounded-2xl bg-[#F4F4F5] text-center space-y-2">
                <p className="text-sm font-bold text-zinc-800">
                  No menu items matched "{searchQuery}"
                </p>
                <p className="text-xs text-zinc-500">
                  Try searching for Zinger, Roll, Smash, Pizza, Pasta, or Broast.
                </p>
              </div>
            )}
          </section>
        ) : (
          <>
            <PopularItems
              onQuickAdd={handleQuickAdd}
              onOpenAddOnModal={(item) => setModalItem(item)}
            />

            {MENU_CATEGORIES.map((category) => (
              <MenuSection
                key={category.id}
                category={category}
                items={MENU_ITEMS.filter((item) => item.categoryId === category.id)}
                onQuickAdd={handleQuickAdd}
                onOpenAddOnModal={(item) => setModalItem(item)}
              />
            ))}
          </>
        )}

        <ReviewsAndAbout />

        {mapsApiKey ? (
          <APIProvider
            apiKey={mapsApiKey}
            libraries={['marker']}
            language="en"
            region="PK"
          >
            <LocationMap />
          </APIProvider>
        ) : (
          <LocationMap hasProvider={false} />
        )}
      </main>

      <Footer onNavigate={scrollToSection} />

      {/* Floating Bottom-Left Search Button matching Burger Lab video (0:40-0:53) */}
      <button
        type="button"
        onClick={focusSearch}
        aria-label="Quick search menu"
        className="hidden sm:flex fixed bottom-5 left-5 z-40 w-11 h-11 rounded-full bg-black hover:bg-[#FF4D00] text-white shadow-xl items-center justify-center transition-colors cursor-pointer"
      >
        <Search className="w-4 h-4" />
      </button>

      {/* Mobile Floating Cart Bar */}
      {totalCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:hidden z-40">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3 px-4 rounded-full bg-black text-white font-bold text-sm shadow-2xl flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#FF4D00]" />
              <span>View Cart ({totalCount})</span>
            </span>
            <span className="tabular-nums font-extrabold">Rs. {totalAmount}</span>
          </button>
        </div>
      )}

      {/* Added-to-Cart Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-black text-white text-xs font-bold shadow-2xl">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <AddOnModal
        key={modalItem?.id ?? 'closed'}
        item={modalItem}
        onClose={() => setModalItem(null)}
        onConfirmAdd={addToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        selectedArea={selectedArea}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
