const BASE_URL = import.meta.env.BASE_URL || '/';
export const assetUrl = (assetPath: string): string =>
  `${BASE_URL.replace(/\/$/, '')}/${assetPath.replace(/^\//, '')}`;

export const LOGO_URL = assetUrl(
  '/assets/aistudio/765958597_1746570996661789_6032994874917564159_n_f034303b.jpg'
);

export const RESTAURANT_INFO = {
  name: 'ROLL N ROLL',
  brandTitle: 'Roll N Roll',
  subtitle: 'PAKISTANI RESTAURANT',
  phoneDisplay: '0314 8334879',
  phoneInternational: '+92 314 8334879',
  whatsappNumber: '923148334879',
  address:
    'Jamshed Road No. 3, M.L Plaza, Shop No. 4, Opposite Ghazi Bakery, Karachi, Pakistan',
  shortAddress: 'Jamshed Rd No. 3',
  coordinates: { lat: 24.8825, lng: 67.0485 },
  hours: 'Open now',
};

export const DELIVERY_AREAS = [
  'Jamshed Rd No. 3',
  'Shikarpur Colony',
  'PECHS Block 2 & 6',
  'Bahadurabad',
  'Soldier Bazaar',
  'Tariq Road',
  'Gulshan-e-Iqbal',
  'Numaish & Saddar',
];

// User-uploaded Roll N Roll promotional food posters
const POSTERS = {
  deal19: assetUrl(
    '/assets/aistudio/904771881_1840579930594228_40021230117382904_n_1046e7a5.jpg'
  ),
  tandooriClub: assetUrl(
    '/assets/aistudio/904808368_1837514314234123_1348221062923419522_n_ebe3e6ef.jpg'
  ),
  comboDeal5: assetUrl(
    '/assets/aistudio/854406860_1829652518353636_8770540103001448646_n_9ca25ce4.jpg'
  ),
  weekendCombo: assetUrl(
    '/assets/aistudio/863144816_1819679139350974_7857880448265991820_n_7d119896.jpg'
  ),
  alfredoPasta: assetUrl(
    '/assets/aistudio/895709048_1830677451584476_6638625793113272997_n_f21619f2.jpg'
  ),
  juicyBroast: assetUrl(
    '/assets/aistudio/863197923_1816669489651939_3399387488961148191_n_3615a4c9.jpg'
  ),
  pizzaAndRoll: assetUrl(
    '/assets/aistudio/884643432_1825521785433376_542588740273818856_n_aa296fb0.jpg'
  ),
  specialKunafa: assetUrl(
    '/assets/aistudio/853582485_1808867057098849_5815714297592788968_n_d332bbca.jpg'
  ),
  beefPepperoniPizza: assetUrl(
    '/assets/aistudio/904471974_1835292311122990_5625665940591998178_n_888a7eb3.jpg'
  ),
  crispyZingerRoll: assetUrl(
    '/assets/aistudio/886726222_1826543528664535_5734229982511790629_n_2dc5a073.jpg'
  ),
  chickenClubSandwich: assetUrl(
    '/assets/aistudio/854489339_1809997356985819_2029365092953779774_n_e18167fd.jpg'
  ),
  masalaKhausa: assetUrl(
    '/assets/aistudio/870935333_1823517198967168_2066085148029613111_n_adaf6d85.jpg'
  ),
  cheesyPizza: assetUrl(
    '/assets/aistudio/844395902_1805097007475854_8009037226804917609_n_4e890b46.jpg'
  ),
  arabianNuggets: assetUrl(
    '/assets/aistudio/843118523_1802272391091649_8716307046697906808_n_78d75d82.jpg'
  ),
  injectedZinger: assetUrl(
    '/assets/aistudio/858265341_1814651609853727_7814418711396587768_n_af09cfd8.jpg'
  ),
  adhaTeraPizza: assetUrl(
    '/assets/aistudio/825267379_1795858618399693_5516934968943871607_n__1__f50aa7ef.jpg'
  ),
  tikkaMagic: assetUrl(
    '/assets/aistudio/840101984_1801229761195912_1064634127093061918_n_74a8fd63.jpg'
  ),
  adhaTeraZinger: assetUrl(
    '/assets/aistudio/825267255_1795858598399695_4186183598588551915_n__1__87cc9f5a.jpg'
  ),
  chickenSoup: assetUrl(
    '/assets/aistudio/825351275_1796753594976862_1887006753856092559_n_1cfe5444.jpg'
  ),
  adhaTeraWrap: assetUrl(
    '/assets/aistudio/825267249_1795858575066364_5683106478526877136_n__1__13c4ed3b.jpg'
  ),
  creamyPasta: assetUrl(
    '/assets/aistudio/825336570_1791955195456702_5548187968330834806_n_33d4c5af.jpg'
  ),
  crispyBitesBox: assetUrl(
    '/assets/aistudio/842678245_1803126621006226_7423135185929444418_n_ebea5812.jpg'
  ),
  adhaTeraClub: assetUrl(
    '/assets/aistudio/825267373_1795858571733031_4342849689479552230_n_56ad0e33.jpg'
  ),
};

export interface HeroSlide {
  id: string;
  eyebrow?: string;
  headline: string;
  subheadline: string;
  callouts?: string[];
  originalPrice?: number;
  price: number;
  image: string;
  targetCategoryId: string;
  theme: 'orange' | 'cream' | 'crimson' | 'dark';
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  badge?: 'New Arrival' | '15% OFF' | 'Best Seller';
  isFromPrice?: boolean;
  image: string;
  hasAddOnModal: boolean;
}

export type BannerMotif =
  | 'starburst'
  | 'flask'
  | 'burger'
  | 'wrap'
  | 'drink'
  | 'pizza';

export interface MenuCategory {
  id: string;
  label: string;
  bannerTitle: string;
  arabicAccent?: string;
  motif: BannerMotif;
}

export const GLOBAL_ADDONS: AddOnOption[] = [
  { id: 'addon-beef-patty', name: 'Extra Beef Patty (120g)', price: 280 },
  { id: 'addon-cheese-slice', name: 'Extra Cheese Slice', price: 90 },
  { id: 'addon-garlic-mayo', name: 'Garlic Mayo Dip Sauce', price: 80 },
  { id: 'addon-chipotle', name: 'Smoky Chipotle Dip Sauce', price: 80 },
  { id: 'addon-jalapenos', name: 'Pickled Jalapenos', price: 70 },
  { id: 'addon-fries', name: 'Side Classic Crispy Fries', price: 250 },
  { id: 'addon-cola', name: 'Chilled Soft Drink (345ml)', price: 130 },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-weekend-thrill',
    eyebrow: 'ROLL N ROLL KARACHI SPECIAL',
    headline: 'WEEKEND THRILL BOX',
    subheadline: '1 Zinger Burger · 1 Leg Broast · Fries · Coleslaw',
    callouts: ['Crispy Zinger', 'Leg Broast', 'Golden Fries'],
    originalPrice: 900,
    price: 800,
    image: POSTERS.weekendCombo,
    targetCategoryId: 'combo-deals',
    theme: 'orange',
  },
  {
    id: 'slide-deal-19',
    eyebrow: 'GOOD THING IT’S REAL',
    headline: 'DEAL 19 PLATTER',
    subheadline: 'Chicken Burger + Club Sandwich + Fries + Coleslaw',
    callouts: ['Club Sandwich', 'Zinger Burger', 'Coleslaw'],
    originalPrice: 880,
    price: 750,
    image: POSTERS.deal19,
    targetCategoryId: 'combo-deals',
    theme: 'cream',
  },
  {
    id: 'slide-zinger-wraps',
    eyebrow: 'NOW INTRODUCING',
    headline: 'CRISPY ZINGER ROLLS',
    subheadline: 'Fresh Paratha & Jumbo Tortilla Wraps · Bold Karachi Sauce',
    callouts: ['Crispy Zinger', 'Dynamite Mayo', 'Toasted Paratha'],
    price: 450,
    image: POSTERS.crispyZingerRoll,
    targetCategoryId: 'rolls-wraps',
    theme: 'crimson',
  },
  {
    id: 'slide-smoky-beast',
    eyebrow: 'FLAT-TOP SMASHED',
    headline: 'SMOKY BEAST SMASH',
    subheadline: 'Double Beef Patties · Smoky Strips · Double Cheddar',
    callouts: ['2x Beef Patties', 'Double Cheddar', 'BBQ Glaze'],
    originalPrice: 1250,
    price: 1080,
    image: assetUrl('/src/assets/images/hero_smoky_beast_1794923955569.jpg'),
    targetCategoryId: 'premium-beef',
    theme: 'dark',
  },
];

export const POPULAR_ITEM_IDS = [
  'weekend-combo-deal',
  'crispy-zinger-roll',
  'smoky-beast-burger',
  'injected-zinger-burger',
];

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'combo-deals',
    label: 'Say Less (Deals)',
    bannerTitle: 'SAY LESS',
    motif: 'starburst',
  },
  {
    id: 'rolls-wraps',
    label: 'Wrap It Up',
    bannerTitle: 'WRAP IT UP',
    motif: 'wrap',
  },
  {
    id: 'classic-beef',
    label: 'Classic Smash',
    bannerTitle: 'CLASSIC SMASH',
    motif: 'burger',
  },
  {
    id: 'premium-beef',
    label: 'The Mains',
    bannerTitle: 'THE MAINS',
    motif: 'burger',
  },
  {
    id: 'zingsters',
    label: 'The Loud Chicken',
    bannerTitle: 'THE LOUD CHICKEN',
    motif: 'starburst',
  },
  {
    id: 'pizza-pasta',
    label: 'Pizza & Pasta',
    bannerTitle: 'PIZZA & PASTA',
    motif: 'pizza',
  },
  {
    id: 'sandwiches-broast',
    label: 'Clubs & Broast',
    bannerTitle: 'CLUBS & BROAST',
    motif: 'starburst',
  },
  {
    id: 'desi-specials',
    label: 'Injected & Desi',
    bannerTitle: 'DESI & INJECTED',
    arabicAccent: 'حبيبي',
    motif: 'flask',
  },
  {
    id: 'fries-sides',
    label: 'Side Quests',
    bannerTitle: 'SIDE QUESTS',
    motif: 'starburst',
  },
  {
    id: 'drinks',
    label: 'Sip Lab',
    bannerTitle: 'SIP LAB',
    motif: 'drink',
  },
  {
    id: 'add-on',
    label: 'Add On',
    bannerTitle: 'EXTRA ADD ONS',
    motif: 'starburst',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // COMBO DEALS
  {
    id: 'weekend-combo-deal',
    categoryId: 'combo-deals',
    name: 'Weekend Combo Deal',
    description:
      '1 Crispy Zinger Burger + 1 crispy Leg Broast + Golden Fries + Fresh Coleslaw.',
    price: 800,
    originalPrice: 900,
    badge: '15% OFF',
    image: POSTERS.weekendCombo,
    hasAddOnModal: true,
  },
  {
    id: 'combo-deal-5',
    categoryId: 'combo-deals',
    name: 'Combo Deal 5 (5 Rolls)',
    description:
      '5 Signature Chicken Rolls served hot with crispy French Fries & creamy Coleslaw.',
    price: 1080,
    badge: 'Best Seller',
    image: POSTERS.comboDeal5,
    hasAddOnModal: true,
  },
  {
    id: 'deal-19-platter',
    categoryId: 'combo-deals',
    name: 'Deal 19 Platter',
    description:
      'Chicken Burger + Club Sandwich + Fresh Coleslaw + Crispy French Fries.',
    price: 750,
    originalPrice: 880,
    badge: '15% OFF',
    image: POSTERS.deal19,
    hasAddOnModal: true,
  },
  {
    id: 'crispy-bites-loaded-box',
    categoryId: 'combo-deals',
    name: 'Crispy Bites Loaded Box',
    description:
      'Golden crispy chicken strips, zinger burger, seasoned fries & chilled soft drink.',
    price: 950,
    badge: 'New Arrival',
    image: POSTERS.crispyBitesBox,
    hasAddOnModal: true,
  },

  // ROLLS & WRAPS
  {
    id: 'crispy-zinger-roll',
    categoryId: 'rolls-wraps',
    name: 'Crispy Zinger Roll',
    description:
      'Crispy fried chicken chunks, fresh iceberg & signature Roll N Roll dynamite sauce in warm paratha.',
    price: 450,
    isFromPrice: true,
    badge: 'Best Seller',
    image: POSTERS.crispyZingerRoll,
    hasAddOnModal: true,
  },
  {
    id: 'adha-tera-wrap',
    categoryId: 'rolls-wraps',
    name: 'Adha Tera Adha Mera Wrap',
    description:
      'Char-grilled jumbo tortilla wrap loaded with crispy zinger strips, tomatoes & garlic mayo.',
    price: 520,
    isFromPrice: true,
    image: POSTERS.adhaTeraWrap,
    hasAddOnModal: true,
  },
  {
    id: 'signature-roll',
    categoryId: 'rolls-wraps',
    name: 'Roll N Roll Signature Roll',
    description:
      'Smoky grilled chicken wrapped in toasted flatbread with melted cheddar, crisp lettuce & garlic sauce.',
    price: 480,
    isFromPrice: true,
    image: assetUrl('/src/assets/images/combo_rolls_platter_1794923954040.jpg'),
    hasAddOnModal: true,
  },
  {
    id: 'stuffed-pizza-roll',
    categoryId: 'rolls-wraps',
    name: 'Stuffed Pizza Roll (4 Pcs)',
    description:
      'Baked golden rolls stuffed with seasoned chicken, mozzarella cheese & Italian herbs.',
    price: 680,
    badge: 'New Arrival',
    image: assetUrl('/src/assets/images/roll_stuffed_pizza_1794923957164.jpg'),
    hasAddOnModal: true,
  },

  // CLASSIC BEEF
  {
    id: 'american-classic',
    categoryId: 'classic-beef',
    name: 'American Classic',
    description:
      'Single smashed beef patty, melted American cheddar, crisp lettuce, pickles & house sauce.',
    price: 650,
    isFromPrice: true,
    image: assetUrl('/src/assets/images/burger_classic_smash_1794923955768.jpg'),
    hasAddOnModal: true,
  },
  {
    id: 'mushroom-smash',
    categoryId: 'classic-beef',
    name: 'Mushroom Smash',
    description:
      'Juicy smashed beef patty topped with sautéed creamy mushrooms, Swiss cheese & garlic aioli.',
    price: 780,
    isFromPrice: true,
    image: assetUrl('/src/assets/images/burger_premium_double_1794923957962.jpg'),
    hasAddOnModal: true,
  },
  {
    id: 'bacon-smash',
    categoryId: 'classic-beef',
    name: 'Smoked Beef Bacon Smash',
    description:
      'Smashed beef patty layered with crispy beef bacon, double cheddar, smoky BBQ & caramelized onions.',
    price: 820,
    badge: 'New Arrival',
    image: assetUrl('/src/assets/images/hero_smoky_beast_1794923955569.jpg'),
    hasAddOnModal: true,
  },
  {
    id: 'hot-jalapeno-smash',
    categoryId: 'classic-beef',
    name: 'Hot Jalapeno Smash',
    description:
      'Spicy smashed beef patty with fiery jalapeños, pepper jack cheese & chipotle mayo.',
    price: 720,
    isFromPrice: true,
    image: assetUrl('/src/assets/images/burger_classic_smash_1794923955768.jpg'),
    hasAddOnModal: true,
  },

  // PREMIUM BEEF
  {
    id: 'majestic-double',
    categoryId: 'premium-beef',
    name: 'Majestic Double',
    description:
      'Double smashed beef patties, 2x melted cheddar, caramelized onions & signature truffle sauce.',
    price: 980,
    isFromPrice: true,
    image: assetUrl('/src/assets/images/burger_premium_double_1794923957962.jpg'),
    hasAddOnModal: true,
  },
  {
    id: 'cheesy-quadra',
    categoryId: 'premium-beef',
    name: 'Cheesy Quadra',
    description:
      'Double smashed beef patties, 4x cheese layers, crispy onion rings & rich cheese fondue.',
    price: 1150,
    image: assetUrl('/src/assets/images/hero_smoky_beast_1794923955569.jpg'),
    hasAddOnModal: true,
  },
  {
    id: 'smoky-beast-burger',
    categoryId: 'premium-beef',
    name: 'Smoky Beast',
    description:
      'Double beef patties, smoky beef strips, double cheddar, BBQ glaze & house special sauce.',
    price: 1080,
    originalPrice: 1250,
    badge: '15% OFF',
    image: assetUrl('/src/assets/images/hero_smoky_beast_1794923955569.jpg'),
    hasAddOnModal: true,
  },
  {
    id: 'triple-smash-tower',
    categoryId: 'premium-beef',
    name: 'Triple Smash Tower',
    description:
      'Triple smashed beef patties, triple cheddar, jalapeños & smoky chipotle sauce.',
    price: 1350,
    image: assetUrl('/src/assets/images/burger_premium_double_1794923957962.jpg'),
    hasAddOnModal: true,
  },

  // ZINGSTERS
  {
    id: 'injected-zinger-burger',
    categoryId: 'zingsters',
    name: 'Injected Zinger Burger',
    description:
      'Golden crunchy zinger fillet injected with molten cheddar cheese sauce & spicy mayo.',
    price: 680,
    badge: 'Best Seller',
    image: POSTERS.injectedZinger,
    hasAddOnModal: true,
  },
  {
    id: 'adha-tera-zinger',
    categoryId: 'zingsters',
    name: 'Adha Tera Adha Mera Zinger',
    description:
      'Thick crispy chicken fillet with fresh tomatoes, red onion, crisp lettuce & signature sauce.',
    price: 620,
    originalPrice: 720,
    badge: '15% OFF',
    image: POSTERS.adhaTeraZinger,
    hasAddOnModal: true,
  },
  {
    id: 'classic-zingster',
    categoryId: 'zingsters',
    name: 'Classic Zingster',
    description:
      "Potato bun, crispy chicken thigh fillet, iceberg lettuce, cheese & chef's zinger sauce.",
    price: 580,
    isFromPrice: true,
    image: assetUrl('/src/assets/images/burger_injected_zinger_1794923957389.jpg'),
    hasAddOnModal: true,
  },
  {
    id: 'double-cruncher',
    categoryId: 'zingsters',
    name: 'Double Cruncher',
    description:
      "Brioche bun, 2x crispy chicken patties, 2x cheese slices, iceberg & chef's signature sauce.",
    price: 890,
    image: assetUrl('/src/assets/images/hero_weekend_combo_1794923954426.jpg'),
    hasAddOnModal: true,
  },

  // PIZZA & PASTA
  {
    id: 'cheesy-pizza',
    categoryId: 'pizza-pasta',
    name: 'Cheesy Pizza',
    description:
      'Hand-tossed crust topped with spiced grilled chicken, mushrooms, cherry tomatoes & mozzarella.',
    price: 1150,
    isFromPrice: true,
    image: POSTERS.cheesyPizza,
    hasAddOnModal: true,
  },
  {
    id: 'beef-pepperoni-pizza',
    categoryId: 'pizza-pasta',
    name: 'Beef Pepperoni Pizza',
    description:
      'Classic red sauce pizza loaded with smoky beef pepperoni, green bell peppers & olives.',
    price: 1290,
    isFromPrice: true,
    image: POSTERS.beefPepperoniPizza,
    hasAddOnModal: true,
  },
  {
    id: 'pizza-and-pizza-roll',
    categoryId: 'pizza-pasta',
    name: 'Pizza & Pizza Roll Combo',
    description:
      'Cheesy chicken pizza paired with 4 stuffed pizza rolls & creamy garlic dip.',
    price: 1490,
    badge: 'Best Seller',
    image: POSTERS.pizzaAndRoll,
    hasAddOnModal: true,
  },
  {
    id: 'adha-tera-pizza',
    categoryId: 'pizza-pasta',
    name: 'Adha Tera Adha Mera Pizza',
    description:
      'Loaded pan-crust pizza with pepperoni, black olives, mushrooms, capsicum & extra cheese.',
    price: 1190,
    isFromPrice: true,
    image: POSTERS.adhaTeraPizza,
    hasAddOnModal: true,
  },
  {
    id: 'creamy-chicken-penne',
    categoryId: 'pizza-pasta',
    name: 'Creamy Chicken Penne Pasta',
    description:
      'Al dente penne tossed in rich creamy tomato herb sauce with tender chicken & parmesan.',
    price: 780,
    isFromPrice: true,
    image: POSTERS.creamyPasta,
    hasAddOnModal: true,
  },
  {
    id: 'alfredo-pasta',
    categoryId: 'pizza-pasta',
    name: 'Alfredo Pasta',
    description:
      'Creamy, cheesy, irresistible penne pasta with grilled chicken strips, mushrooms & herbs.',
    price: 850,
    badge: 'New Arrival',
    image: POSTERS.alfredoPasta,
    hasAddOnModal: true,
  },

  // SANDWICHES & BROAST
  {
    id: 'tandoori-club-sandwich',
    categoryId: 'sandwiches-broast',
    name: 'Tandoori Club Sandwich',
    description:
      'Triple-decker toasted sandwich stacked with smoky tandoori chicken cubes, fried egg & fries.',
    price: 620,
    isFromPrice: true,
    image: POSTERS.tandooriClub,
    hasAddOnModal: true,
  },
  {
    id: 'chicken-club-sandwich',
    categoryId: 'sandwiches-broast',
    name: 'Chicken Club Sandwich & Fries',
    description:
      'Classic grilled chicken club sandwich served with golden fries, pickles & coleslaw.',
    price: 590,
    isFromPrice: true,
    image: POSTERS.chickenClubSandwich,
    hasAddOnModal: true,
  },
  {
    id: 'adha-tera-club',
    categoryId: 'sandwiches-broast',
    name: 'Adha Tera Adha Mera Club',
    description:
      'Double crispy chicken fillet club sandwich layered with cheddar cheese, egg & olives.',
    price: 680,
    image: POSTERS.adhaTeraClub,
    hasAddOnModal: true,
  },
  {
    id: 'juicy-broast-epic',
    categoryId: 'sandwiches-broast',
    name: 'Juicy Broast Epic Crunch',
    description:
      'Golden crispy cheese-injected chicken broast seasoned with spices & French fries.',
    price: 690,
    badge: 'Best Seller',
    image: POSTERS.juicyBroast,
    hasAddOnModal: true,
  },

  // DESI & SPECIALS
  {
    id: 'taste-tikka-magic',
    categoryId: 'desi-specials',
    name: 'Taste the Tikka Magic',
    description:
      'Charcoal-grilled chicken tikka skewers served with fresh green mint chutney, onions & lemon.',
    price: 450,
    isFromPrice: true,
    image: POSTERS.tikkaMagic,
    hasAddOnModal: true,
  },
  {
    id: 'signature-masala-khausa',
    categoryId: 'desi-specials',
    name: 'Signature Masala Khausa',
    description:
      'Rich, creamy coconut curry over noodles topped with spiced chicken, crispy papdi & boiled egg.',
    price: 620,
    badge: 'Best Seller',
    image: POSTERS.masalaKhausa,
    hasAddOnModal: true,
  },
  {
    id: 'chicken-corn-soup',
    categoryId: 'desi-specials',
    name: 'Chicken Corn Soup',
    description:
      'Steaming hot Pakistani-style shredded chicken, sweet corn & black pepper soup.',
    price: 390,
    image: POSTERS.chickenSoup,
    hasAddOnModal: false,
  },
  {
    id: 'special-pistachio-kunafa',
    categoryId: 'desi-specials',
    name: 'Special Pistachio Kunafa',
    description:
      'Authentic crispy golden kunafa filled with rich cream & topped with crushed green pistachios.',
    price: 750,
    badge: 'New Arrival',
    image: POSTERS.specialKunafa,
    hasAddOnModal: false,
  },

  // FRIES & SIDES
  {
    id: 'arabian-injected-nuggets',
    categoryId: 'fries-sides',
    name: 'Arabian Injected Nuggets',
    description:
      'Crispy golden chicken nuggets injected with molten cheddar & garlic sauce + creamy dip.',
    price: 520,
    badge: 'New Arrival',
    image: POSTERS.arabianNuggets,
    hasAddOnModal: false,
  },
  {
    id: 'loaded-smash-fries',
    categoryId: 'fries-sides',
    name: 'Loaded Smash Fries (Large)',
    description:
      'Crispy fries loaded with melted cheddar cheese, chopped beef, crispy chicken & jalapeños.',
    price: 650,
    isFromPrice: true,
    image: assetUrl('/src/assets/images/fries_loaded_smash_1794923959706.jpg'),
    hasAddOnModal: false,
  },
  {
    id: 'cheese-loaded-fries',
    categoryId: 'fries-sides',
    name: 'Cheese Loaded Fries',
    description:
      'Golden crispy fries drenched in warm melted cheddar cheese & herbs.',
    price: 480,
    isFromPrice: true,
    image: assetUrl('/src/assets/images/fries_loaded_smash_1794923959706.jpg'),
    hasAddOnModal: false,
  },
  {
    id: 'classic-crispy-fries',
    categoryId: 'fries-sides',
    name: 'Classic Crispy Fries',
    description:
      'Golden crispy salted French fries served fresh with dipping sauce.',
    price: 250,
    image: assetUrl('/src/assets/images/combo_rolls_platter_1794923954040.jpg'),
    hasAddOnModal: false,
  },

  // DRINKS
  {
    id: 'mint-margarita',
    categoryId: 'drinks',
    name: 'Mint Margarita',
    description: 'Refreshing fresh mint & lemon slush cooler with a salt rim.',
    price: 290,
    image: assetUrl('/src/assets/images/drinks_mint_cola_1794923962753.jpg'),
    hasAddOnModal: false,
  },
  {
    id: 'chilled-soft-drink',
    categoryId: 'drinks',
    name: 'Chilled Soft Drink',
    description: 'Ice-cold carbonated soft drink served with fresh lime.',
    price: 130,
    image: assetUrl('/src/assets/images/drinks_mint_cola_1794923962753.jpg'),
    hasAddOnModal: false,
  },
  {
    id: 'jumbo-fountain-cola',
    categoryId: 'drinks',
    name: 'Jumbo Fountain Cola',
    description: 'Roll N Roll jumbo chilled fountain cola with ice.',
    price: 180,
    image: POSTERS.crispyBitesBox,
    hasAddOnModal: false,
  },
  {
    id: 'peach-iced-tea',
    categoryId: 'drinks',
    name: 'Peach Iced Tea',
    description: 'Chilled brewed iced tea infused with sweet peach & lemon.',
    price: 280,
    image: assetUrl('/src/assets/images/drinks_mint_cola_1794923962753.jpg'),
    hasAddOnModal: false,
  },

  // ADD ON
  {
    id: 'addon-extra-beef-patty',
    categoryId: 'add-on',
    name: 'Extra Beef Patty (120g)',
    description: 'Extra 100% pure smashed beef patty seared on the flat-top.',
    price: 280,
    image: assetUrl('/src/assets/images/burger_classic_smash_1794923955768.jpg'),
    hasAddOnModal: false,
  },
  {
    id: 'addon-extra-cheese-slice',
    categoryId: 'add-on',
    name: 'Extra Cheese Slice',
    description: 'Rich melted American cheddar cheese slice.',
    price: 90,
    image: assetUrl('/src/assets/images/burger_injected_zinger_1794923957389.jpg'),
    hasAddOnModal: false,
  },
  {
    id: 'addon-signature-dip',
    categoryId: 'add-on',
    name: 'Signature Dip Sauce',
    description:
      'Garlic Mayo, Chipotle, Honey Mustard, Hot Jalapeno or BBQ Dip.',
    price: 80,
    image: assetUrl('/src/assets/images/fries_loaded_smash_1794923959706.jpg'),
    hasAddOnModal: false,
  },
];

export interface CustomerReview {
  id: string;
  author: string;
  neighborhood: string;
  rating: number;
  dishOrdered: string;
  comment: string;
  date: string;
}

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Hamza Siddiqui',
    neighborhood: 'Jamshed Road, Karachi',
    rating: 5,
    dishOrdered: 'Smoky Beast & Crispy Zinger Roll',
    comment:
      'Best smashed beef burger near Jamshed Road! Double melted cheddar and smoky strips hit the spot, and the zinger roll paratha stayed crispy till delivery.',
    date: '2 days ago',
  },
  {
    id: 'rev-2',
    author: 'Ayesha Kamran',
    neighborhood: 'Bahadurabad, Karachi',
    rating: 5,
    dishOrdered: 'Weekend Combo Deal & Alfredo Pasta',
    comment:
      'Ordered the Weekend Combo for family dinner — super fresh broast, hot fries, and rich creamy Alfredo pasta. Great value for Rs. 800.',
    date: '5 days ago',
  },
  {
    id: 'rev-3',
    author: 'Bilal Raza',
    neighborhood: 'PECHS Block 2, Karachi',
    rating: 5,
    dishOrdered: 'Signature Masala Khausa & Kunafa',
    comment:
      'Their Masala Khausa tastes authentic and spicy just how Karachi likes it, and finishing with warm Pistachio Kunafa is unbeatable.',
    date: '1 week ago',
  },
];
