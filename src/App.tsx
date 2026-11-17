import { useCallback, useEffect, useMemo, useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { Check, ShoppingCart } from 'lucide-react';
import { AddOnModal } from './components/AddOnModal';
import { CartDrawer, CartEntry } from './components/CartDrawer';
import { CategoryBar } from './components/CategoryBar';
import { Footer } from './components/Footer';
import { HeroSlider } from './components/HeroSlider';
import { LocationMap } from './components/LocationMap';
import { MenuSection } from './components/MenuSection';
import { Navbar } from './components/Navbar';
import { ReviewsAndAbout } from './components/ReviewsAndAbout';
import {
  AddOnOption,
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuItem,
} from './data/menuData';

export default function App() {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].id);
  const [activeNav, setActiveNav] = useState('menu-start');
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  useEffect(() => {
    const handleQuota = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // Scroll-spy for sticky category bar
  useEffect(() => {
    const handleScroll = () => {
      const offset = 210;
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
    if (
      sectionId === 'menu-start' ||
      sectionId === 'reviews' ||
      sectionId === 'about' ||
      sectionId === 'location' ||
      sectionId === 'contact'
    ) {
      setActiveNav(sectionId);
    }
    if (MENU_CATEGORIES.some((c) => c.id === sectionId)) {
      setActiveCategory(sectionId);
      setActiveNav('menu-start');
    }
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

      showToast(`${item.name} added to order`);
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
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Navbar
        cartCount={totalCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeNav={activeNav}
        onNavigate={scrollToSection}
      />

      <main className="flex-1">
        <HeroSlider onSelectCategory={scrollToSection} />

        <CategoryBar
          activeCategory={activeCategory}
          onSelectCategory={scrollToSection}
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

      {/* Mobile Floating Cart Bar */}
      {totalCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 sm:hidden z-40">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3 px-4 rounded-xl bg-amber-500 text-black font-bold text-sm shadow-2xl flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span>View Order ({totalCount})</span>
            </span>
            <span className="tabular-nums font-extrabold">Rs. {totalAmount}</span>
          </button>
        </div>
      )}

      {/* Subtle Added-to-Cart Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-amber-500/40 text-white text-xs font-semibold shadow-2xl">
          <Check className="w-4 h-4 text-amber-400" />
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
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
