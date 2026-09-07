/**
 * Kasir Simamora PRO - Smart POS & Virtual Payment Gateway
 * Authors: Google DeepMind Antigravity Pair Programmer
 */

// ==========================================
// 1. SOUND & VOICE ENGINE (Web Audio & Speech API)
// ==========================================
class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
    this.voiceEnabled = true;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playBeep() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1900, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2500, this.audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0, now + i * 0.07);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.35);
      });
    } catch (e) {}
  }

  playClick() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {}
  }

  playWarning() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(170, this.audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.15);
    } catch (e) {}
  }

  speak(text) {
    if (!this.voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  }
}

const sound = new SoundEngine();

// ==========================================
// 2. INITIAL CATALOG DATA
// ==========================================
const DEFAULT_PRODUCTS = [
  // --- MINUMAN & KOPI / TEH / MATCHA ---
  {
    id: 'P04',
    name: 'Kopi Susu Gula Aren Creamy',
    category: 'minuman',
    price: 18000,
    stock: 80,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P13',
    name: 'Kopi Susu Pandan Wangi',
    category: 'minuman',
    price: 20000,
    stock: 65,
    badge: 'Favorit',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P14',
    name: 'Iced Caramel Macchiato',
    category: 'minuman',
    price: 24000,
    stock: 45,
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P15',
    name: 'Iced Americano Single Origin',
    category: 'minuman',
    price: 15000,
    stock: 90,
    badge: 'Sugar Free',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P05',
    name: 'Matcha Green Tea Latte',
    category: 'minuman',
    price: 22000,
    stock: 55,
    badge: 'Signature',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P16',
    name: 'Matcha Espresso Fusion',
    category: 'minuman',
    price: 25000,
    stock: 35,
    badge: 'Viral',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P17',
    name: 'Es Teh Manis Melati Jumbo',
    category: 'minuman',
    price: 6000,
    stock: 150,
    badge: 'Murah Meriah',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P06',
    name: 'Es Lemon Tea Segar',
    category: 'minuman',
    price: 12000,
    stock: 100,
    badge: 'Segar',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P18',
    name: 'Es Teh Tarik Malaya Asli',
    category: 'minuman',
    price: 15000,
    stock: 70,
    badge: 'Authentic',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P19',
    name: 'Thai Milk Tea Ice Original',
    category: 'minuman',
    price: 16000,
    stock: 60,
    badge: 'Creamy',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P20',
    name: 'Brown Sugar Fresh Milk Boba',
    category: 'minuman',
    price: 22000,
    stock: 50,
    badge: 'Top Boba',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P21',
    name: 'Taro Milk Tea with Boba',
    category: 'minuman',
    price: 20000,
    stock: 45,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1558857563-b37cf99e52df?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P22',
    name: 'Jus Alpukat Kocok Cokelat',
    category: 'minuman',
    price: 18000,
    stock: 40,
    badge: 'Kental',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P23',
    name: 'Es Jeruk Peras Asli',
    category: 'minuman',
    price: 10000,
    stock: 85,
    badge: 'Vitamin C',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80'
  },

  // --- MAKANAN UTAMA ---
  {
    id: 'P01',
    name: 'Nasi Goreng Spesial KasirKu',
    category: 'makanan',
    price: 28000,
    stock: 45,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P02',
    name: 'Ayam Geprek Sambal Bawang',
    category: 'makanan',
    price: 24000,
    stock: 30,
    badge: 'Pedas Mantap',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P24',
    name: 'Nasi Ayam Bakar Madu',
    category: 'makanan',
    price: 26000,
    stock: 35,
    badge: 'Rekomendasi',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P03',
    name: 'Mie Goreng Seafood Jawa',
    category: 'makanan',
    price: 26000,
    stock: 25,
    badge: 'Gurih',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P25',
    name: 'Kwetiau Goreng Sapi Spesial',
    category: 'makanan',
    price: 27000,
    stock: 28,
    badge: 'Sedap',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P26',
    name: 'Spaghetti Creamy Carbonara',
    category: 'makanan',
    price: 28000,
    stock: 20,
    badge: 'Western',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80'
  },

  // --- SNACK & DESSERT ---
  {
    id: 'P07',
    name: 'French Fries Crispy BBQ',
    category: 'snack',
    price: 16000,
    stock: 50,
    badge: 'Crispy',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P08',
    name: 'Tahu Walik Krispi Sambal Kecap',
    category: 'snack',
    price: 15000,
    stock: 35,
    badge: 'Gurih',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P27',
    name: 'Pisang Goreng Keju Cokelat',
    category: 'snack',
    price: 15000,
    stock: 40,
    badge: 'Renyah',
    image: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P28',
    name: 'Roti Bakar Cokelat Keju Melt',
    category: 'snack',
    price: 18000,
    stock: 30,
    badge: 'Lumer',
    image: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P29',
    name: 'Dimsum Siomay Ayam Udang (4 pcs)',
    category: 'snack',
    price: 18000,
    stock: 35,
    badge: 'Kukus Hangat',
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P12',
    name: 'Croissant Butter Perancis',
    category: 'snack',
    price: 19000,
    stock: 20,
    badge: 'Fresh Bake',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80'
  },

  // --- PAKET HEMAT & PROMO ---
  {
    id: 'P09',
    name: 'Paket Hemat Kenyang (Nasi + Ayam + Es Teh)',
    category: 'paket',
    price: 32000,
    stock: 60,
    badge: 'Hemat 25%',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P10',
    name: 'Paket Nongkrong (Kopi + French Fries)',
    category: 'paket',
    price: 29000,
    stock: 50,
    badge: 'Hemat 20%',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P30',
    name: 'Paket Ngopi & Roti (Kopi Susu + Roti Bakar)',
    category: 'paket',
    price: 30000,
    stock: 40,
    badge: 'Hemat 15%',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P11',
    name: 'Beef Burger Double Cheese',
    category: 'promo',
    price: 35000,
    stock: 20,
    badge: 'Promo 30%',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'P31',
    name: 'Combo Matcha Lovers (Matcha Latte + Croissant)',
    category: 'promo',
    price: 33000,
    stock: 25,
    badge: 'Flash Sale',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80'
  }
];

// ==========================================
// 3. APPLICATION STATE
// ==========================================
const state = {
  products: [],
  cart: [],
  currentCategory: 'all',
  searchQuery: '',
  appliedDiscount: null, // { code: 'HEMAT10', type: 'percent', value: 10 }
  isTaxEnabled: true,
  taxRate: 0.11, // 11% PPN
  activePaymentTab: 'qris',
  selectedEmoney: 'GoPay',
  selectedBank: 'BCA',
  qrisTimerInterval: null,
  qrisSecondsRemaining: 300,
  orderNumberCounter: 8821,
  heldBills: [],
  salesHistory: [],
  reportPeriod: 'all',
  activeCashier: 'Admin Kasir',
  charts: {
    payment: null,
    trend: null
  }
};

// ==========================================
// 4. STORAGE & INITIALIZATION
// ==========================================
function loadStateFromStorage() {
  const savedVersion = localStorage.getItem('kasirku_catalog_version');
  const savedProducts = localStorage.getItem('kasirku_products');

  if (savedProducts && savedVersion === 'v2.5') {
    try {
      state.products = JSON.parse(savedProducts);
    } catch (e) {
      state.products = [...DEFAULT_PRODUCTS];
    }
  } else {
    // Preserve custom items while upgrading catalog
    if (savedProducts) {
      try {
        const existing = JSON.parse(savedProducts);
        const customItems = existing.filter(p => !DEFAULT_PRODUCTS.some(dp => dp.id === p.id));
        state.products = [...DEFAULT_PRODUCTS, ...customItems];
      } catch (e) {
        state.products = [...DEFAULT_PRODUCTS];
      }
    } else {
      state.products = [...DEFAULT_PRODUCTS];
    }
    localStorage.setItem('kasirku_products', JSON.stringify(state.products));
    localStorage.setItem('kasirku_catalog_version', 'v2.5');
  }

  const savedHistory = localStorage.getItem('kasirku_sales_history');
  if (savedHistory) {
    try {
      state.salesHistory = JSON.parse(savedHistory);
    } catch (e) {}
  }

  const savedHeld = localStorage.getItem('kasirku_held_bills');
  if (savedHeld) {
    try {
      state.heldBills = JSON.parse(savedHeld);
    } catch (e) {}
  }

  const savedCounter = localStorage.getItem('kasirku_order_counter');
  if (savedCounter) {
    state.orderNumberCounter = parseInt(savedCounter, 10) || 8821;
  }

  const savedSound = localStorage.getItem('kasirku_sound_enabled');
  if (savedSound !== null) {
    sound.enabled = savedSound === 'true';
  }

  const savedVoice = localStorage.getItem('kasirku_voice_enabled');
  if (savedVoice !== null) {
    sound.voiceEnabled = savedVoice === 'true';
  }

  const savedTheme = localStorage.getItem('kasirku_theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  }
}

function saveStateToStorage() {
  localStorage.setItem('kasirku_products', JSON.stringify(state.products));
  localStorage.setItem('kasirku_sales_history', JSON.stringify(state.salesHistory));
  localStorage.setItem('kasirku_held_bills', JSON.stringify(state.heldBills));
  localStorage.setItem('kasirku_order_counter', state.orderNumberCounter.toString());
  localStorage.setItem('kasirku_sound_enabled', sound.enabled.toString());
  localStorage.setItem('kasirku_voice_enabled', sound.voiceEnabled.toString());
  localStorage.setItem('kasirku_theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

// Format IDR Currency
function formatIDR(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// Generate Unique VA Number
function generateVANumber(bank) {
  const prefixes = {
    BCA: '80145',
    Mandiri: '89508',
    BRI: '12800',
    BNI: '98812',
    Permata: '84550',
    CIMB: '23321'
  };
  const prefix = prefixes[bank] || '88001';
  const randomSuffix = Math.floor(100000000 + Math.random() * 900000000).toString();
  return `${prefix} ${randomSuffix.slice(0, 4)} ${randomSuffix.slice(4)}`;
}

// Toast Notification
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');

  const bgColors = {
    success: 'bg-emerald-600 text-white',
    error: 'bg-rose-600 text-white',
    info: 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900',
    warning: 'bg-amber-500 text-white'
  };

  toast.className = `pointer-events-auto px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-pop-in ${bgColors[type] || bgColors.info}`;

  let iconName = 'info';
  if (type === 'success') iconName = 'check-circle';
  if (type === 'error') iconName = 'alert-triangle';
  if (type === 'warning') iconName = 'alert-circle';

  toast.innerHTML = `<i data-lucide="${iconName}" class="w-4 h-4"></i><span>${message}</span>`;
  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ==========================================
// 5. CATALOG & CART RENDERING
// ==========================================

// Render Product Grid
function renderProducts() {
  const grid = document.getElementById('productGrid');
  const emptyState = document.getElementById('emptyCatalogState');
  if (!grid) return;

  let filtered = state.products;

  // Filter Category
  if (state.currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === state.currentCategory);
  }

  // Filter Search
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) {
      emptyState.classList.remove('hidden');
      emptyState.classList.add('flex');
    }
    return;
  }

  if (emptyState) {
    emptyState.classList.add('hidden');
    emptyState.classList.remove('flex');
  }

  grid.innerHTML = filtered.map(product => {
    const cartItem = state.cart.find(item => item.id === product.id);
    const inCartQty = cartItem ? cartItem.qty : 0;

    return `
      <div 
        onclick="handleProductCardClick('${product.id}', event)"
        class="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2.5 flex flex-col justify-between hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 cursor-pointer overflow-hidden select-none"
      >
        <!-- Product Image & Badges -->
        <div class="relative w-full h-28 sm:h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-2">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'"
          >
          
          ${product.badge ? `
            <span class="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-rose-500 text-white text-[10px] font-bold uppercase shadow-sm">
              ${product.badge}
            </span>
          ` : ''}

          <!-- In-Cart Quantity Badge -->
          ${inCartQty > 0 ? `
            <span class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-extrabold shadow-md animate-pop-in">
              ${inCartQty}x
            </span>
          ` : ''}

          <span class="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium">
            Stok: ${product.stock}
          </span>
        </div>

        <!-- Product Details -->
        <div class="flex flex-col gap-0.5">
          <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">${product.category}</span>
          <h3 class="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
            ${product.name}
          </h3>
        </div>

        <!-- Price & Quick Add Button -->
        <div class="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span class="font-extrabold text-xs sm:text-sm text-blue-600 dark:text-blue-400">
            ${formatIDR(product.price)}
          </span>
          
          <button 
            type="button"
            class="p-1.5 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white dark:bg-slate-800 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white transition shadow-sm"
          >
            <i data-lucide="plus" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

// Fly to Cart visual particle animation
function triggerFlyToCartAnimation(event) {
  if (!event || !event.clientX) return;
  const cartBadge = document.getElementById('cartTotalItemsBadge');
  if (!cartBadge) return;

  const targetRect = cartBadge.getBoundingClientRect();
  const particle = document.createElement('div');
  particle.className = 'flying-particle';
  particle.textContent = '+1';
  particle.style.left = `${event.clientX}px`;
  particle.style.top = `${event.clientY}px`;

  document.body.appendChild(particle);

  requestAnimationFrame(() => {
    particle.style.left = `${targetRect.left}px`;
    particle.style.top = `${targetRect.top}px`;
    particle.style.transform = 'scale(0.4)';
    particle.style.opacity = '0.2';
  });

  setTimeout(() => particle.remove(), 550);
}

// Add Product to Cart
window.handleProductCardClick = function(productId, event) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  if (product.stock <= 0) {
    sound.playWarning();
    showToast(`Stok ${product.name} telah habis!`, 'warning');
    return;
  }

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    if (existing.qty < product.stock) {
      existing.qty += 1;
      sound.playBeep();
      triggerFlyToCartAnimation(event);
    } else {
      sound.playWarning();
      showToast(`Stok ${product.name} telah mencapai batas (${product.stock})!`, 'warning');
      return;
    }
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      image: product.image,
      note: ''
    });
    sound.playBeep();
    triggerFlyToCartAnimation(event);
  }

  renderCart();
  renderProducts();
};

// Render Cart
function renderCart() {
  const list = document.getElementById('cartItemList');
  const emptyState = document.getElementById('emptyCartState');
  const badge = document.getElementById('cartTotalItemsBadge');
  const btnPay = document.getElementById('btnOpenPaymentModal');
  if (!list) return;

  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  if (badge) badge.textContent = totalItems;

  if (state.cart.length === 0) {
    list.innerHTML = '';
    if (emptyState) {
      emptyState.classList.remove('hidden');
      emptyState.classList.add('flex');
    }
    if (btnPay) btnPay.disabled = true;
    updateCalculations();
    return;
  }

  if (emptyState) {
    emptyState.classList.add('hidden');
    emptyState.classList.remove('flex');
  }
  if (btnPay) btnPay.disabled = false;

  list.innerHTML = state.cart.map(item => `
    <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 flex flex-col gap-1.5 transition hover:border-slate-300">
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2 min-w-0">
          <img src="${item.image}" class="w-9 h-9 rounded-lg object-cover bg-slate-200 dark:bg-slate-700 flex-shrink-0" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'">
          <div class="min-w-0">
            <h4 class="font-bold text-xs text-slate-900 dark:text-white truncate">${item.name}</h4>
            <span class="text-[11px] font-semibold text-blue-600 dark:text-blue-400">${formatIDR(item.price)}</span>
          </div>
        </div>

        <!-- Quantity Controls -->
        <div class="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-700 flex-shrink-0">
          <button onclick="changeCartQty('${item.id}', -1)" class="w-6 h-6 rounded flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <i data-lucide="minus" class="w-3.5 h-3.5"></i>
          </button>
          <span class="w-6 text-center font-bold text-xs text-slate-900 dark:text-white">${item.qty}</span>
          <button onclick="changeCartQty('${item.id}', 1)" class="w-6 h-6 rounded flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>

      <!-- Item Note & Remove -->
      <div class="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 dark:border-slate-700/50">
        <input 
          type="text" 
          placeholder="Catatan (cth: Less Ice, Pedas)..." 
          value="${item.note || ''}" 
          onchange="updateItemNote('${item.id}', this.value)"
          class="w-full bg-transparent text-slate-600 dark:text-slate-300 placeholder-slate-400 focus:outline-none text-[11px]"
        >
        <button onclick="removeCartItem('${item.id}')" class="text-rose-400 hover:text-rose-600 ml-1 p-1" title="Hapus item">
          <i data-lucide="trash" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
  updateCalculations();
}

window.changeCartQty = function(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  const product = state.products.find(p => p.id === productId);

  if (delta > 0) {
    if (product && item.qty >= product.stock) {
      sound.playWarning();
      showToast(`Stok ${product.name} telah mencapai batas!`, 'warning');
      return;
    }
    item.qty += 1;
    sound.playClick();
  } else {
    item.qty -= 1;
    sound.playClick();
    if (item.qty <= 0) {
      state.cart = state.cart.filter(i => i.id !== productId);
    }
  }

  renderCart();
  renderProducts();
};

window.updateItemNote = function(productId, note) {
  const item = state.cart.find(i => i.id === productId);
  if (item) {
    item.note = note.trim();
  }
};

window.removeCartItem = function(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  sound.playClick();
  renderCart();
  renderProducts();
};

// Calculate Financials (Subtotal, Discount, Tax, Grand Total)
function calculateBill() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  let discountAmount = 0;
  if (state.appliedDiscount) {
    if (state.appliedDiscount.type === 'percent') {
      discountAmount = Math.round(subtotal * (state.appliedDiscount.value / 100));
    } else if (state.appliedDiscount.type === 'fixed') {
      discountAmount = Math.min(subtotal, state.appliedDiscount.value);
    }
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = state.isTaxEnabled ? Math.round(taxableAmount * state.taxRate) : 0;
  const grandTotal = taxableAmount + tax;

  return { subtotal, discountAmount, tax, grandTotal };
}

function updateCalculations() {
  const { subtotal, discountAmount, tax, grandTotal } = calculateBill();

  const subtotalEl = document.getElementById('subtotalDisplay');
  const taxEl = document.getElementById('taxDisplay');
  const grandTotalEl = document.getElementById('grandTotalDisplay');
  const discountRow = document.getElementById('discountRow');

  if (subtotalEl) subtotalEl.textContent = formatIDR(subtotal);
  if (taxEl) taxEl.textContent = formatIDR(tax);
  if (grandTotalEl) grandTotalEl.textContent = formatIDR(grandTotal);

  if (discountRow) {
    if (state.appliedDiscount && discountAmount > 0) {
      discountRow.classList.remove('hidden');
      discountRow.classList.add('flex');
      const badgeEl = document.getElementById('discountLabelBadge');
      const discEl = document.getElementById('discountAmountDisplay');
      if (badgeEl) badgeEl.textContent = state.appliedDiscount.code;
      if (discEl) discEl.textContent = `- ${formatIDR(discountAmount)}`;
    } else {
      discountRow.classList.add('hidden');
      discountRow.classList.remove('flex');
    }
  }
}

// Promo Codes
const PROMO_CODES = {
  'HEMAT10': { code: 'HEMAT10', type: 'percent', value: 10 },
  'DISKON20': { code: 'DISKON20', type: 'percent', value: 20 },
  'KASIRHEMAT': { code: 'KASIRHEMAT', type: 'fixed', value: 15000 }
};

function applyPromoCode(code) {
  const cleanCode = (code || '').trim().toUpperCase();
  if (!cleanCode) {
    showToast('Masukkan kode promo terlebih dahulu!', 'warning');
    return;
  }

  if (PROMO_CODES[cleanCode]) {
    state.appliedDiscount = PROMO_CODES[cleanCode];
    sound.playSuccess();
    showToast(`Promo ${cleanCode} berhasil diterapkan!`, 'success');
  } else {
    sound.playWarning();
    showToast('Kode promo tidak valid atau telah kedaluwarsa.', 'error');
  }

  const inputEl = document.getElementById('discountCodeInput');
  if (inputEl) inputEl.value = '';
  updateCalculations();
}

function removeDiscount() {
  state.appliedDiscount = null;
  sound.playClick();
  updateCalculations();
  showToast('Diskon telah dihapus.', 'info');
}

// ==========================================
// 6. VIRTUAL PAYMENT GATEWAY SYSTEM
// ==========================================
function openPaymentModal() {
  if (state.cart.length === 0) {
    showToast('Keranjang masih kosong!', 'warning');
    return;
  }

  const { grandTotal } = calculateBill();
  const payTotalEl = document.getElementById('modalPayTotalDisplay');
  if (payTotalEl) payTotalEl.textContent = formatIDR(grandTotal);

  switchPaymentTab('qris');

  const modal = document.getElementById('paymentGatewayModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
  sound.playClick();
}

function closePaymentModal() {
  const modal = document.getElementById('paymentGatewayModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  clearInterval(state.qrisTimerInterval);
}

function switchPaymentTab(tabName) {
  state.activePaymentTab = tabName;

  document.querySelectorAll('.payment-tab').forEach(tab => {
    if (tab.dataset.tab === tabName) {
      tab.className = 'payment-tab active-tab flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm transition font-bold';
    } else {
      tab.className = 'payment-tab flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800 transition font-semibold';
    }
  });

  document.querySelectorAll('.payment-tab-content').forEach(content => {
    content.classList.add('hidden');
    content.classList.remove('flex');
  });

  const activeContent = document.getElementById(`tabContent_${tabName}`);
  if (activeContent) {
    activeContent.classList.remove('hidden');
    activeContent.classList.add('flex');
  }

  if (tabName === 'qris') {
    initQrisPayment();
  } else if (tabName === 'bank') {
    updateVirtualAccount();
  } else if (tabName === 'cash') {
    initCashTab();
  }
}

// 6.1 QRIS Sub-Engine
function initQrisPayment() {
  const { grandTotal } = calculateBill();
  const orderId = `ORD-${state.orderNumberCounter}`;

  const container = document.getElementById('qrisCanvasContainer');
  if (!container) return;
  container.innerHTML = '';

  const qrisPayload = `00020101021226600016ID.CO.KASIRKU.WWW01189360000201100088210215${orderId}51040000520458125303360540${grandTotal}5802ID5919KASIR SIMAMORA6007TARUTUNG6304`;

  try {
    if (window.QRCode) {
      new QRCode(container, {
        text: qrisPayload,
        width: 170,
        height: 170,
        colorDark: "#0f172a",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
    }
  } catch (e) {}

  state.qrisSecondsRemaining = 300;
  clearInterval(state.qrisTimerInterval);
  updateQrisCountdownDisplay();

  state.qrisTimerInterval = setInterval(() => {
    state.qrisSecondsRemaining -= 1;
    updateQrisCountdownDisplay();
    if (state.qrisSecondsRemaining <= 0) {
      clearInterval(state.qrisTimerInterval);
      showToast('Waktu QRIS telah habis! Silakan buka kembali tagihan.', 'error');
    }
  }, 1000);
}

function updateQrisCountdownDisplay() {
  const min = Math.floor(state.qrisSecondsRemaining / 60);
  const sec = state.qrisSecondsRemaining % 60;
  const formatted = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  const cdEl = document.getElementById('qrisCountdown');
  if (cdEl) cdEl.textContent = formatted;
}

window.simulateQrisSuccess = function(provider) {
  showToast(`Menerima notifikasi QRIS via ${provider}...`, 'info');

  setTimeout(() => {
    finishTransaction(`QRIS (${provider})`, 0, 0);
  }, 1100);
};

// 6.2 E-Money Sub-Engine
function setupEmoneyEvents() {
  const providerBtns = document.querySelectorAll('.emoney-provider-btn');
  providerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      providerBtns.forEach(b => {
        b.classList.remove('active-provider', 'border-cyan-500', 'bg-cyan-50/50', 'dark:bg-cyan-950/30');
        b.classList.add('border-slate-200', 'dark:border-slate-700', 'bg-white', 'dark:bg-slate-800');
      });
      btn.classList.add('active-provider', 'border-cyan-500', 'bg-cyan-50/50', 'dark:bg-cyan-950/30');
      btn.classList.remove('border-slate-200', 'dark:border-slate-700', 'bg-white', 'dark:bg-slate-800');
      state.selectedEmoney = btn.dataset.provider;
      sound.playClick();
    });
  });

  const btnSend = document.getElementById('btnSendEmoneyRequest');
  if (btnSend) {
    btnSend.addEventListener('click', () => {
      const phoneInput = document.getElementById('emoneyPhoneInput');
      const phone = phoneInput ? phoneInput.value.trim() : '';
      if (!phone || phone.length < 8) {
        showToast('Masukkan nomor HP yang valid!', 'warning');
        return;
      }

      const statusText = document.getElementById('emoneyStatusText');
      btnSend.disabled = true;
      btnSend.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Mengirim Notifikasi ke ${state.selectedEmoney}...</span>`;
      if (window.lucide) lucide.createIcons();

      if (statusText) {
        statusText.textContent = 'Menunggu Konfirmasi Pelanggan...';
        statusText.className = 'px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold animate-pulse';
      }

      setTimeout(() => {
        if (statusText) {
          statusText.textContent = 'PIN Terverifikasi! Memproses...';
          statusText.className = 'px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold';
        }

        setTimeout(() => {
          btnSend.disabled = false;
          btnSend.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i><span>Kirim Tagihan Push Notification & Verifikasi</span>`;
          if (window.lucide) lucide.createIcons();
          finishTransaction(`E-Money (${state.selectedEmoney} - +62 ${phone})`, 0, 0);
        }, 900);
      }, 1500);
    });
  }
}

// 6.3 Transfer Bank / VA Sub-Engine
function setupBankEvents() {
  const bankBtns = document.querySelectorAll('.bank-provider-btn');
  bankBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      bankBtns.forEach(b => {
        b.classList.remove('active-bank', 'border-blue-600', 'bg-blue-50/50', 'dark:bg-blue-950/30');
        b.classList.add('border-slate-200', 'dark:border-slate-700', 'bg-white', 'dark:bg-slate-800');
      });
      btn.classList.add('active-bank', 'border-blue-600', 'bg-blue-50/50', 'dark:bg-blue-950/30');
      btn.classList.remove('border-slate-200', 'dark:border-slate-700', 'bg-white', 'dark:bg-slate-800');
      state.selectedBank = btn.dataset.bank;
      sound.playClick();
      updateVirtualAccount();
    });
  });

  const btnCopy = document.getElementById('btnCopyVA');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const vaEl = document.getElementById('vaNumberDisplay');
      const vaText = vaEl ? vaEl.textContent.replace(/\s/g, '') : '';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(vaText);
      }
      sound.playClick();
      const copyText = document.getElementById('copyVAText');
      if (copyText) copyText.textContent = 'Tersalin!';
      showToast('Nomor Virtual Account berhasil disalin!', 'success');
      setTimeout(() => {
        if (copyText) copyText.textContent = 'Salin';
      }, 2000);
    });
  }

  const btnCheckVA = document.getElementById('btnCheckVASimulation');
  if (btnCheckVA) {
    btnCheckVA.addEventListener('click', () => {
      btnCheckVA.disabled = true;
      btnCheckVA.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Memverifikasi Mutasi Virtual Account...</span>`;
      if (window.lucide) lucide.createIcons();

      setTimeout(() => {
        btnCheckVA.disabled = false;
        btnCheckVA.innerHTML = `<i data-lucide="check-circle-2" class="w-4 h-4"></i><span>Simulasi Transfer Berhasil (Cek Status Otomatis)</span>`;
        if (window.lucide) lucide.createIcons();
        finishTransaction(`Transfer VA (${state.selectedBank})`, 0, 0);
      }, 1200);
    });
  }
}

function updateVirtualAccount() {
  const bankLabel = document.getElementById('vaBankNameLabel');
  const vaNumber = document.getElementById('vaNumberDisplay');
  if (bankLabel) bankLabel.textContent = `${state.selectedBank} Virtual Account`;
  if (vaNumber) vaNumber.textContent = generateVANumber(state.selectedBank);
}

// 6.4 Cash / Tunai Sub-Engine
function initCashTab() {
  const { grandTotal } = calculateBill();
  const cashInput = document.getElementById('cashGivenInput');
  if (cashInput) {
    cashInput.value = '';
  }
  updateCashChange();

  const btnExact = document.getElementById('btnCashExact');
  if (btnExact) {
    btnExact.onclick = () => {
      if (cashInput) cashInput.value = grandTotal;
      sound.playClick();
      updateCashChange();
    };
  }

  document.querySelectorAll('.quick-cash-btn[data-amount]').forEach(btn => {
    btn.onclick = () => {
      if (cashInput) cashInput.value = btn.dataset.amount;
      sound.playClick();
      updateCashChange();
    };
  });

  if (cashInput) {
    cashInput.oninput = () => {
      updateCashChange();
    };
  }

  const btnConfirmCash = document.getElementById('btnConfirmCashPay');
  if (btnConfirmCash) {
    btnConfirmCash.onclick = () => {
      const cashGiven = parseFloat(cashInput ? cashInput.value : 0) || 0;
      const { grandTotal: total } = calculateBill();

      if (cashGiven < total) {
        sound.playWarning();
        showToast('Nominal uang tunai kurang dari total tagihan!', 'error');
        return;
      }

      const change = cashGiven - total;
      finishTransaction('Tunai (Cash)', cashGiven, change);
    };
  }
}

function updateCashChange() {
  const { grandTotal } = calculateBill();
  const cashInput = document.getElementById('cashGivenInput');
  const cashGiven = parseFloat(cashInput ? cashInput.value : 0) || 0;
  const changeDueDisplay = document.getElementById('changeDueDisplay');
  const statusBadge = document.getElementById('changeStatusBadge');
  const btnConfirm = document.getElementById('btnConfirmCashPay');

  if (!changeDueDisplay || !statusBadge || !btnConfirm) return;

  if (cashGiven === 0) {
    changeDueDisplay.textContent = 'Rp 0';
    changeDueDisplay.className = 'font-extrabold text-xl sm:text-2xl text-slate-800 dark:text-slate-200';
    statusBadge.textContent = 'Masukkan Uang';
    statusBadge.className = 'px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold';
    btnConfirm.disabled = true;
  } else if (cashGiven < grandTotal) {
    const shortage = grandTotal - cashGiven;
    changeDueDisplay.textContent = `- ${formatIDR(shortage)}`;
    changeDueDisplay.className = 'font-extrabold text-xl sm:text-2xl text-rose-500';
    statusBadge.textContent = 'Uang Kurang';
    statusBadge.className = 'px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold';
    btnConfirm.disabled = true;
  } else {
    const change = cashGiven - grandTotal;
    changeDueDisplay.textContent = formatIDR(change);
    changeDueDisplay.className = 'font-extrabold text-xl sm:text-2xl text-emerald-600 dark:text-emerald-400';
    statusBadge.textContent = change === 0 ? 'Uang Pas' : 'Kembalian Pas';
    statusBadge.className = 'px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold';
    btnConfirm.disabled = false;
  }
}

// ==========================================
// 7. FINISH TRANSACTION & THERMAL RECEIPT
// ==========================================
function finishTransaction(paymentMethod, cashGiven = 0, change = 0) {
  closePaymentModal();
  sound.playSuccess();

  // Trigger Confetti
  try {
    if (window.confetti) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  } catch (e) {}

  const { subtotal, discountAmount, tax, grandTotal } = calculateBill();
  const customerNameInput = document.getElementById('customerNameInput');
  const customerName = (customerNameInput ? customerNameInput.value.trim() : '') || 'Umum / Walk-in';
  const orderTypeSelect = document.getElementById('orderTypeSelect');
  const orderType = orderTypeSelect ? orderTypeSelect.value : 'Dine In';
  const orderId = `ORD-#${state.orderNumberCounter}`;
  const now = new Date();

  // Voice announcement
  sound.speak(`Pembayaran sebesar ${formatIDR(grandTotal)} berhasil diselesaikan.`);

  // Record Transaction to History
  const transactionRecord = {
    orderId,
    timestamp: now.toISOString(),
    formattedDate: now.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    formattedTime: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
    customerName,
    orderType,
    items: JSON.parse(JSON.stringify(state.cart)),
    subtotal,
    discountAmount,
    discountCode: state.appliedDiscount ? state.appliedDiscount.code : null,
    tax,
    grandTotal,
    paymentMethod,
    cashGiven: cashGiven || grandTotal,
    change: change || 0,
    cashier: state.activeCashier
  };

  state.salesHistory.unshift(transactionRecord);
  state.orderNumberCounter += 1;

  // Deduct stock
  state.cart.forEach(item => {
    const prod = state.products.find(p => p.id === item.id);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.qty);
    }
  });

  saveStateToStorage();

  // Populate Thermal Receipt Modal
  populateReceiptModal(transactionRecord);

  // Show Receipt Modal
  const receiptModal = document.getElementById('thermalReceiptModal');
  if (receiptModal) {
    receiptModal.classList.remove('hidden');
    receiptModal.classList.add('flex');
  }
}

function populateReceiptModal(record) {
  const orderIdEl = document.getElementById('receiptOrderId');
  const cashierEl = document.getElementById('receiptCashier');
  const dateEl = document.getElementById('receiptDate');
  const timeEl = document.getElementById('receiptTime');
  const custEl = document.getElementById('receiptCustomerName');
  const typeEl = document.getElementById('receiptOrderType');

  if (orderIdEl) orderIdEl.textContent = `NO: ${record.orderId}`;
  if (cashierEl) cashierEl.textContent = `KASIR: ${record.cashier || 'Admin Kasir'}`;
  if (dateEl) dateEl.textContent = record.formattedDate;
  if (timeEl) timeEl.textContent = record.formattedTime;
  if (custEl) custEl.textContent = record.customerName;
  if (typeEl) typeEl.textContent = record.orderType;

  // Table items
  const tbody = document.getElementById('receiptTableBody');
  if (tbody) {
    tbody.innerHTML = record.items.map(item => `
      <tr class="py-1">
        <td class="py-1">
          <div class="font-bold text-black">${item.name}</div>
          ${item.note ? `<div class="text-[9px] text-slate-600 italic">* ${item.note}</div>` : ''}
          <div class="text-[10px] text-slate-600">${item.qty} x ${formatIDR(item.price)}</div>
        </td>
        <td class="py-1 text-right font-bold text-black align-top">
          ${formatIDR(item.qty * item.price)}
        </td>
      </tr>
    `).join('');
  }

  const subtotalEl = document.getElementById('receiptSubtotal');
  const discRow = document.getElementById('receiptDiscountRow');
  const discEl = document.getElementById('receiptDiscount');
  const taxEl = document.getElementById('receiptTax');
  const totalEl = document.getElementById('receiptTotal');
  const methodEl = document.getElementById('receiptPaymentMethod');

  if (subtotalEl) subtotalEl.textContent = formatIDR(record.subtotal);

  if (discRow && discEl) {
    if (record.discountAmount > 0) {
      discRow.classList.remove('hidden');
      discRow.classList.add('flex');
      discEl.textContent = `- ${formatIDR(record.discountAmount)}`;
    } else {
      discRow.classList.add('hidden');
      discRow.classList.remove('flex');
    }
  }

  if (taxEl) taxEl.textContent = formatIDR(record.tax);
  if (totalEl) totalEl.textContent = formatIDR(record.grandTotal);
  if (methodEl) methodEl.textContent = record.paymentMethod;

  const cashGivenRow = document.getElementById('receiptCashGivenRow');
  const changeRow = document.getElementById('receiptChangeRow');
  const cashGivenEl = document.getElementById('receiptCashGiven');
  const changeEl = document.getElementById('receiptChange');

  if (record.paymentMethod.startsWith('Tunai')) {
    if (cashGivenRow) {
      cashGivenRow.classList.remove('hidden');
      cashGivenRow.classList.add('flex');
    }
    if (changeRow) {
      changeRow.classList.remove('hidden');
      changeRow.classList.add('flex');
    }
    if (cashGivenEl) cashGivenEl.textContent = formatIDR(record.cashGiven);
    if (changeEl) changeEl.textContent = formatIDR(record.change);
  } else {
    if (cashGivenRow) {
      cashGivenRow.classList.add('hidden');
      cashGivenRow.classList.remove('flex');
    }
    if (changeRow) {
      changeRow.classList.add('hidden');
      changeRow.classList.remove('flex');
    }
  }

  // Setup WhatsApp share button
  const btnWA = document.getElementById('btnShareWhatsApp');
  if (btnWA) {
    btnWA.onclick = () => {
      let text = `*STRUK PEMBAYARAN KASIR SIMAMORA*\n`;
      text += `No: ${record.orderId}\n`;
      text += `Waktu: ${record.formattedDate} ${record.formattedTime}\n`;
      text += `Kasir: ${record.cashier || 'Admin'}\n`;
      text += `Pelanggan: ${record.customerName} (${record.orderType})\n\n`;
      text += `*DAFTAR PESANAN:*\n`;
      record.items.forEach(i => {
        text += `- ${i.name} (${i.qty}x) = ${formatIDR(i.qty * i.price)}\n`;
        if (i.note) text += `  Catatan: ${i.note}\n`;
      });
      text += `\nSubtotal: ${formatIDR(record.subtotal)}\n`;
      if (record.discountAmount > 0) text += `Diskon: -${formatIDR(record.discountAmount)}\n`;
      text += `PPN (11%): ${formatIDR(record.tax)}\n`;
      text += `*TOTAL: ${formatIDR(record.grandTotal)}*\n`;
      text += `Metode Pembayaran: ${record.paymentMethod}\n`;
      text += `Status: LUNAS / SUKSES\n\n`;
      text += `Terima kasih atas kunjungan Anda!`;

      const encoded = encodeURIComponent(text);
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
    };
  }
}

function startNewTransaction() {
  state.cart = [];
  state.appliedDiscount = null;

  const custInput = document.getElementById('customerNameInput');
  const discInput = document.getElementById('discountCodeInput');
  if (custInput) custInput.value = '';
  if (discInput) discInput.value = '';

  const modal = document.getElementById('thermalReceiptModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  const ordDisplay = document.getElementById('orderNumberDisplay');
  if (ordDisplay) ordDisplay.textContent = `ORD-#${state.orderNumberCounter}`;

  renderCart();
  renderProducts();
  showToast('Siap untuk transaksi baru!', 'info');
}

// ==========================================
// 8. PARKED / HOLD BILLS SYSTEM (F4)
// ==========================================
function holdCurrentBill() {
  if (state.cart.length === 0) {
    showToast('Keranjang masih kosong!', 'warning');
    return;
  }

  const custInput = document.getElementById('customerNameInput');
  const customerName = (custInput ? custInput.value.trim() : '') || 'Pelanggan';
  const orderTypeSelect = document.getElementById('orderTypeSelect');
  const orderType = orderTypeSelect ? orderTypeSelect.value : 'Dine In';
  const { grandTotal } = calculateBill();

  const heldOrder = {
    id: 'HOLD-' + Date.now().toString().slice(-5),
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    customerName,
    orderType,
    cart: JSON.parse(JSON.stringify(state.cart)),
    appliedDiscount: state.appliedDiscount,
    grandTotal
  };

  state.heldBills.push(heldOrder);
  saveStateToStorage();
  updateHeldBadge();

  // Reset current cart
  state.cart = [];
  state.appliedDiscount = null;
  if (custInput) custInput.value = '';
  renderCart();
  renderProducts();

  sound.playClick();
  showToast(`Pesanan ${heldOrder.id} berhasil disimpan sementara!`, 'success');
}

function updateHeldBadge() {
  const badge = document.getElementById('heldCountBadge');
  if (!badge) return;
  if (state.heldBills.length > 0) {
    badge.textContent = state.heldBills.length;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function openHeldBillsModal() {
  const modal = document.getElementById('heldBillsModal');
  const container = document.getElementById('heldBillsContainer');
  if (!modal || !container) return;

  if (state.heldBills.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-400">
        <i data-lucide="pause-circle" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
        <p class="text-xs font-semibold">Tidak ada transaksi yang di-hold</p>
      </div>
    `;
  } else {
    container.innerHTML = state.heldBills.map((bill, index) => `
      <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <span class="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">${bill.id}</span>
            <span class="text-[10px] text-slate-400">• ${bill.time}</span>
          </div>
          <p class="font-semibold text-xs text-slate-800 dark:text-white truncate">${bill.customerName} (${bill.orderType})</p>
          <span class="text-[11px] text-slate-500">${bill.cart.length} item • <strong class="text-slate-800 dark:text-slate-200">${formatIDR(bill.grandTotal)}</strong></span>
        </div>

        <div class="flex items-center gap-1.5 flex-shrink-0">
          <button onclick="restoreHeldBill(${index})" class="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition">
            Pulihkan
          </button>
          <button onclick="deleteHeldBill(${index})" class="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition" title="Hapus">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  if (window.lucide) lucide.createIcons();
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

window.restoreHeldBill = function(index) {
  const bill = state.heldBills[index];
  if (!bill) return;

  if (state.cart.length > 0) {
    if (!confirm('Keranjang saat ini berisi item. Timpa dengan pesanan yang dipulihkan?')) {
      return;
    }
  }

  state.cart = JSON.parse(JSON.stringify(bill.cart));
  state.appliedDiscount = bill.appliedDiscount || null;

  const custInput = document.getElementById('customerNameInput');
  if (custInput) custInput.value = bill.customerName || '';

  const orderTypeSelect = document.getElementById('orderTypeSelect');
  if (orderTypeSelect && bill.orderType) orderTypeSelect.value = bill.orderType;

  state.heldBills.splice(index, 1);
  saveStateToStorage();
  updateHeldBadge();

  const modal = document.getElementById('heldBillsModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }

  renderCart();
  renderProducts();
  sound.playClick();
  showToast(`Pesanan ${bill.id} berhasil dimuat kembali ke kasir.`, 'success');
};

window.deleteHeldBill = function(index) {
  state.heldBills.splice(index, 1);
  saveStateToStorage();
  updateHeldBadge();
  openHeldBillsModal();
  sound.playClick();
  showToast('Transaksi hold berhasil dihapus.', 'info');
};

// ==========================================
// 9. SALES REPORTS & ANALYTICS DASHBOARD (F9)
// ==========================================
function openReportsModal() {
  const modal = document.getElementById('reportsModal');
  if (!modal) return;

  renderReportsData();

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function renderReportsData() {
  let list = state.salesHistory;

  if (state.reportPeriod === 'today') {
    const todayStr = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
    list = list.filter(t => t.formattedDate === todayStr);
  }

  const totalRevenue = list.reduce((sum, item) => sum + item.grandTotal, 0);
  const totalCount = list.length;
  const avgOrder = totalCount > 0 ? Math.round(totalRevenue / totalCount) : 0;
  const totalDiscount = list.reduce((sum, item) => sum + (item.discountAmount || 0), 0);

  const revEl = document.getElementById('reportTotalRevenue');
  const countEl = document.getElementById('reportTotalCount');
  const avgEl = document.getElementById('reportAverageOrder');
  const discEl = document.getElementById('reportTotalDiscount');

  if (revEl) revEl.textContent = formatIDR(totalRevenue);
  if (countEl) countEl.textContent = `${totalCount} Transaksi`;
  if (avgEl) avgEl.textContent = formatIDR(avgOrder);
  if (discEl) discEl.textContent = formatIDR(totalDiscount);

  // Render Top 3 Best Sellers
  renderTopProducts(list);

  // Render History Table
  const tbody = document.getElementById('historyTableBody');
  if (tbody) {
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-slate-400">Belum ada riwayat transaksi penjualan.</td></tr>`;
    } else {
      tbody.innerHTML = list.map(tx => `
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50">
          <td class="p-3 font-mono font-bold text-slate-900 dark:text-white">${tx.orderId}</td>
          <td class="p-3 text-[11px] text-slate-500">${tx.formattedDate} ${tx.formattedTime}</td>
          <td class="p-3">${tx.customerName}</td>
          <td class="p-3">${tx.items.length} item</td>
          <td class="p-3"><span class="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-bold">${tx.paymentMethod}</span></td>
          <td class="p-3 font-bold text-blue-600 dark:text-blue-400">${formatIDR(tx.grandTotal)}</td>
          <td class="p-3 text-center">
            <button onclick="reprintReceipt('${tx.orderId}')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px] transition shadow-sm">
              Struk
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // Render Chart.js Analytics
  renderCharts(list);
}

function renderTopProducts(historyList) {
  const container = document.getElementById('reportTopProductsContainer');
  if (!container) return;

  const itemCounts = {};
  historyList.forEach(tx => {
    tx.items.forEach(item => {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + item.qty;
    });
  });

  const sortedItems = Object.entries(itemCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  if (sortedItems.length === 0) {
    container.innerHTML = `<p class="col-span-3 text-slate-400 text-center py-2">Belum ada data penjualan produk.</p>`;
    return;
  }

  const medalColors = ['from-amber-400 to-amber-600', 'from-slate-400 to-slate-600', 'from-amber-600 to-amber-800'];

  container.innerHTML = sortedItems.map(([name, count], index) => `
    <div class="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
      <div class="flex items-center gap-2 min-w-0">
        <span class="w-6 h-6 rounded-lg bg-gradient-to-tr ${medalColors[index] || 'from-blue-500 to-indigo-600'} text-white font-bold flex items-center justify-center text-[10px] flex-shrink-0">
          #${index + 1}
        </span>
        <span class="font-bold text-slate-800 dark:text-white truncate">${name}</span>
      </div>
      <span class="font-extrabold text-blue-600 dark:text-blue-400 flex-shrink-0">${count}x Terjual</span>
    </div>
  `).join('');
}

function renderCharts(historyList) {
  if (!window.Chart) return;

  // 1. Payment Methods Breakdown
  const paymentCounts = {
    QRIS: 0,
    'E-Money': 0,
    'Transfer VA': 0,
    Tunai: 0
  };

  historyList.forEach(tx => {
    if (tx.paymentMethod.includes('QRIS')) paymentCounts.QRIS += 1;
    else if (tx.paymentMethod.includes('E-Money')) paymentCounts['E-Money'] += 1;
    else if (tx.paymentMethod.includes('Transfer VA')) paymentCounts['Transfer VA'] += 1;
    else paymentCounts.Tunai += 1;
  });

  const paymentCanvas = document.getElementById('paymentMethodChart');
  if (paymentCanvas) {
    if (state.charts.payment) state.charts.payment.destroy();

    state.charts.payment = new Chart(paymentCanvas, {
      type: 'doughnut',
      data: {
        labels: ['QRIS', 'E-Money', 'Transfer VA', 'Tunai'],
        datasets: [{
          data: [paymentCounts.QRIS, paymentCounts['E-Money'], paymentCounts['Transfer VA'], paymentCounts.Tunai],
          backgroundColor: ['#e11d48', '#00aed6', '#3b82f6', '#10b981'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 10, font: { size: 10 } }
          }
        }
      }
    });
  }

  // 2. Revenue Trend Chart
  const trendCanvas = document.getElementById('revenueTrendChart');
  if (trendCanvas) {
    if (state.charts.trend) state.charts.trend.destroy();

    const recentTx = [...historyList].slice(0, 7).reverse();
    const labels = recentTx.map(t => t.orderId);
    const values = recentTx.map(t => t.grandTotal);

    state.charts.trend = new Chart(trendCanvas, {
      type: 'bar',
      data: {
        labels: labels.length > 0 ? labels : ['Belum Ada Data'],
        datasets: [{
          label: 'Omzet Transaksi (Rp)',
          data: values.length > 0 ? values : [0],
          backgroundColor: 'rgba(59, 130, 246, 0.75)',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { font: { size: 10 } }
          },
          x: {
            ticks: { font: { size: 10 } }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}

window.reprintReceipt = function(orderId) {
  const tx = state.salesHistory.find(t => t.orderId === orderId);
  if (!tx) return;
  populateReceiptModal(tx);

  const reportsModal = document.getElementById('reportsModal');
  const receiptModal = document.getElementById('thermalReceiptModal');

  if (reportsModal) {
    reportsModal.classList.add('hidden');
    reportsModal.classList.remove('flex');
  }
  if (receiptModal) {
    receiptModal.classList.remove('hidden');
    receiptModal.classList.add('flex');
  }
};

function exportSalesToCSV() {
  if (state.salesHistory.length === 0) {
    showToast('Belum ada data transaksi untuk diexport!', 'warning');
    return;
  }

  const headers = ['Order ID', 'Tanggal', 'Waktu', 'Kasir', 'Pelanggan', 'Tipe Order', 'Item Terjual', 'Subtotal', 'Diskon', 'PPN', 'Total Pembayaran', 'Metode Bayar'];
  const rows = state.salesHistory.map(tx => {
    const itemsDetail = tx.items.map(i => `${i.name} (${i.qty}x)`).join('; ');
    return [
      `"${tx.orderId}"`,
      `"${tx.formattedDate}"`,
      `"${tx.formattedTime}"`,
      `"${tx.cashier || 'Admin'}"`,
      `"${tx.customerName}"`,
      `"${tx.orderType}"`,
      `"${itemsDetail}"`,
      tx.subtotal,
      tx.discountAmount || 0,
      tx.tax || 0,
      tx.grandTotal,
      `"${tx.paymentMethod}"`
    ];
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Laporan_Penjualan_Kasir_Simamora_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Laporan penjualan berhasil diexport ke CSV!', 'success');
}

// ==========================================
// 10. PRODUCT MANAGEMENT (CRUD)
// ==========================================
function openProductModal() {
  switchMenuManageTab('add');
  const modal = document.getElementById('productManagementModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function switchMenuManageTab(tab) {
  document.querySelectorAll('.menu-manage-tab').forEach(btn => {
    if (btn.dataset.menutab === tab) {
      btn.className = 'menu-manage-tab active-menu-tab flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm transition font-bold';
    } else {
      btn.className = 'menu-manage-tab flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800 transition font-semibold';
    }
  });

  const addForm = document.getElementById('addNewProductForm');
  const editTab = document.getElementById('editMenuTabContent');
  const deleteTab = document.getElementById('deleteMenuTabContent');

  if (addForm) addForm.classList.toggle('hidden', tab !== 'add');
  if (editTab) {
    editTab.classList.toggle('hidden', tab !== 'edit');
    editTab.classList.toggle('flex', tab === 'edit');
  }
  if (deleteTab) {
    deleteTab.classList.toggle('hidden', tab !== 'delete');
    deleteTab.classList.toggle('flex', tab === 'delete');
  }

  if (tab === 'edit') {
    populateEditProductOptions();
  } else if (tab === 'delete') {
    renderDeleteProductOptions();
  }
}

// 10.1 Add Product
function handleAddProduct(e) {
  e.preventDefault();
  const nameInput = document.getElementById('newProdName');
  const categoryInput = document.getElementById('newProdCategory');
  const priceInput = document.getElementById('newProdPrice');
  const stockInput = document.getElementById('newProdStock');
  const badgeInput = document.getElementById('newProdBadge');
  const imageInput = document.getElementById('newProdImage');

  const name = nameInput ? nameInput.value.trim() : '';
  const category = categoryInput ? categoryInput.value : 'makanan';
  const price = parseFloat(priceInput ? priceInput.value : 0) || 0;
  const stock = parseInt(stockInput ? stockInput.value : 50, 10) || 50;
  const badge = badgeInput ? badgeInput.value.trim() : '';
  let image = imageInput ? imageInput.value.trim() : '';

  if (!name || price <= 0) {
    showToast('Mohon lengkapi nama dan harga menu!', 'warning');
    return;
  }

  if (!image) {
    const defaultImages = {
      makanan: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
      minuman: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80',
      snack: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=400&q=80',
      paket: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
      promo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
    };
    image = defaultImages[category] || defaultImages.makanan;
  }

  const newId = 'P' + String(Date.now()).slice(-4);
  const newProduct = {
    id: newId,
    name,
    category,
    price,
    stock,
    badge: badge || undefined,
    image
  };

  state.products.unshift(newProduct);
  saveStateToStorage();
  renderProducts();
  sound.playSuccess();
  showToast(`Menu "${name}" berhasil ditambahkan ke katalog!`, 'success');

  const addForm = document.getElementById('addNewProductForm');
  if (addForm) addForm.reset();

  const modal = document.getElementById('productManagementModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// 10.2 Edit Product & Stock
function populateEditProductOptions() {
  const select = document.getElementById('editProdSelect');
  if (!select) return;

  if (state.products.length === 0) {
    select.innerHTML = `<option value="">Tidak ada menu di katalog</option>`;
    return;
  }

  select.innerHTML = state.products
    .map(p => `<option value="${p.id}">${p.name} (${formatIDR(p.price)})</option>`)
    .join('');

  updateEditProductPreview();
}

function updateEditProductPreview() {
  const select = document.getElementById('editProdSelect');
  if (!select) return;
  const product = state.products.find(p => p.id === select.value);
  if (!product) return;

  const nameEl = document.getElementById('editProdName');
  const catEl = document.getElementById('editProdCategory');
  const priceEl = document.getElementById('editProdPrice');
  const stockEl = document.getElementById('editProdStock');
  const badgeEl = document.getElementById('editProdBadge');
  const imgEl = document.getElementById('editProdImage');

  if (nameEl) nameEl.value = product.name;
  if (catEl) catEl.value = product.category;
  if (priceEl) priceEl.value = product.price;
  if (stockEl) stockEl.value = product.stock;
  if (badgeEl) badgeEl.value = product.badge || '';
  if (imgEl) imgEl.value = product.image;
}

window.quickAddStock = function(amount) {
  const stockEl = document.getElementById('editProdStock');
  if (stockEl) {
    const current = parseInt(stockEl.value, 10) || 0;
    stockEl.value = current + amount;
    sound.playClick();
  }
};

function handleSaveEditProduct() {
  const select = document.getElementById('editProdSelect');
  if (!select) return;
  const product = state.products.find(p => p.id === select.value);
  if (!product) return;

  const name = document.getElementById('editProdName').value.trim();
  const category = document.getElementById('editProdCategory').value;
  const price = parseFloat(document.getElementById('editProdPrice').value) || 0;
  const stock = parseInt(document.getElementById('editProdStock').value, 10) || 0;
  const badge = document.getElementById('editProdBadge').value.trim();
  const image = document.getElementById('editProdImage').value.trim();

  if (!name || price <= 0) {
    showToast('Nama dan harga harus diisi dengan benar!', 'warning');
    return;
  }

  product.name = name;
  product.category = category;
  product.price = price;
  product.stock = stock;
  product.badge = badge || undefined;
  if (image) product.image = image;

  saveStateToStorage();
  renderProducts();
  renderCart();
  sound.playSuccess();
  showToast(`Menu "${product.name}" berhasil diperbarui!`, 'success');

  const modal = document.getElementById('productManagementModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// 10.3 Delete Product
function renderDeleteProductOptions() {
  const select = document.getElementById('deleteProdSelect');
  const btnDelete = document.getElementById('btnConfirmDeleteProd');
  const preview = document.getElementById('deleteProdPreview');
  if (!select || !btnDelete) return;

  if (state.products.length === 0) {
    select.innerHTML = `<option value="">Tidak ada menu di katalog</option>`;
    if (preview) preview.classList.add('hidden');
    btnDelete.disabled = true;
    return;
  }

  select.innerHTML = state.products
    .map(p => `<option value="${p.id}">${p.name} (${formatIDR(p.price)})</option>`)
    .join('');

  btnDelete.disabled = false;
  updateDeleteProductPreview();
}

function updateDeleteProductPreview() {
  const select = document.getElementById('deleteProdSelect');
  if (!select) return;
  const product = state.products.find(p => p.id === select.value);
  const preview = document.getElementById('deleteProdPreview');

  if (!product) {
    if (preview) preview.classList.add('hidden');
    return;
  }

  if (preview) preview.classList.remove('hidden');
  const imgEl = document.getElementById('deleteProdPreviewImg');
  const nameEl = document.getElementById('deleteProdPreviewName');
  const metaEl = document.getElementById('deleteProdPreviewMeta');

  if (imgEl) imgEl.src = product.image;
  if (nameEl) nameEl.textContent = product.name;
  if (metaEl) metaEl.textContent = `Kategori: ${product.category} • Harga: ${formatIDR(product.price)} • Stok: ${product.stock}`;
}

function handleDeleteProduct() {
  const select = document.getElementById('deleteProdSelect');
  if (!select) return;
  const product = state.products.find(p => p.id === select.value);
  if (!product) return;

  const confirmed = confirm(`Yakin ingin menghapus menu "${product.name}" dari katalog?`);
  if (!confirmed) return;

  state.products = state.products.filter(p => p.id !== product.id);
  state.cart = state.cart.filter(item => item.id !== product.id);

  saveStateToStorage();
  renderProducts();
  renderCart();
  renderDeleteProductOptions();

  sound.playClick();
  showToast(`Menu "${product.name}" berhasil dihapus.`, 'info');
}

// ==========================================
// 11. CLOCK & EVENT LISTENERS
// ==========================================
function initClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;
  function update() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';
  }
  update();
  setInterval(update, 1000);
}

function safeAddEventListener(elementId, eventName, handler) {
  const el = document.getElementById(elementId);
  if (el) {
    el.addEventListener(eventName, handler);
  }
}

function setupEventListeners() {
  // Cashier Switcher
  const cashierSelect = document.getElementById('cashierSelect');
  if (cashierSelect) {
    cashierSelect.addEventListener('change', (e) => {
      state.activeCashier = e.target.value;
      sound.playClick();
      showToast(`Kasir aktif: ${state.activeCashier}`, 'info');
    });
  }

  // Dark mode
  const themeBtn = document.getElementById('toggleThemeBtn');
  const themeIcon = document.getElementById('themeIcon');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      if (themeIcon) themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
      if (window.lucide) lucide.createIcons();
      saveStateToStorage();
      sound.playClick();
    });
  }

  // Sound toggle
  const soundBtn = document.getElementById('toggleSoundBtn');
  const soundIcon = document.getElementById('soundIcon');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      sound.enabled = !sound.enabled;
      if (soundIcon) soundIcon.setAttribute('data-lucide', sound.enabled ? 'volume-2' : 'volume-x');
      if (window.lucide) lucide.createIcons();
      saveStateToStorage();
      showToast(sound.enabled ? 'Suara efek diaktifkan' : 'Suara efek dimatikan', 'info');
    });
  }

  // Voice toggle
  const voiceBtn = document.getElementById('toggleVoiceBtn');
  const voiceIcon = document.getElementById('voiceIcon');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      sound.voiceEnabled = !sound.voiceEnabled;
      if (voiceIcon) voiceIcon.setAttribute('data-lucide', sound.voiceEnabled ? 'mic' : 'mic-off');
      if (window.lucide) lucide.createIcons();
      saveStateToStorage();
      showToast(sound.voiceEnabled ? 'Pengumuman suara transaksi (TTS) diaktifkan' : 'Pengumuman suara dimatikan', 'info');
    });
  }

  // Category filter pills
  document.querySelectorAll('.category-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-pill').forEach(b => {
        b.className = 'category-pill flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition flex-shrink-0';
      });
      btn.className = 'category-pill active-category flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white shadow-sm transition flex-shrink-0';
      state.currentCategory = btn.dataset.category;
      sound.playClick();
      renderProducts();
    });
  });

  // Search input
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  if (searchInput && clearBtn) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (state.searchQuery) {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }
      renderProducts();
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      clearBtn.classList.add('hidden');
      renderProducts();
    });
  }

  // Barcode Scanner Simulator
  safeAddEventListener('btnBarcodeDemo', 'click', () => {
    if (state.products.length === 0) return;
    const randomProduct = state.products[Math.floor(Math.random() * state.products.length)];
    if (randomProduct) {
      sound.playBeep();
      showToast(`Scan Barcode: ${randomProduct.name}`, 'info');
      handleProductCardClick(randomProduct.id);
    }
  });

  // Cart Clear Button
  safeAddEventListener('btnClearCart', 'click', () => {
    if (state.cart.length === 0) return;
    state.cart = [];
    state.appliedDiscount = null;
    sound.playClick();
    renderCart();
    renderProducts();
    showToast('Keranjang telah direset.', 'info');
  });

  // Promo Code Button & Quick Badges
  safeAddEventListener('btnApplyDiscount', 'click', () => {
    const input = document.getElementById('discountCodeInput');
    applyPromoCode(input ? input.value : '');
  });

  document.querySelectorAll('.promo-quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      applyPromoCode(btn.dataset.code);
    });
  });

  safeAddEventListener('btnRemoveDiscount', 'click', removeDiscount);

  // Tax Toggle
  const taxToggle = document.getElementById('taxToggle');
  if (taxToggle) {
    taxToggle.addEventListener('change', (e) => {
      state.isTaxEnabled = e.target.checked;
      sound.playClick();
      updateCalculations();
    });
  }

  // Payment Tabs
  document.querySelectorAll('.payment-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      sound.playClick();
      switchPaymentTab(tab.dataset.tab);
    });
  });

  // Main Action Buttons
  safeAddEventListener('btnOpenPaymentModal', 'click', openPaymentModal);
  safeAddEventListener('btnClosePaymentModal', 'click', closePaymentModal);
  safeAddEventListener('btnHoldCurrentBill', 'click', holdCurrentBill);
  safeAddEventListener('btnOpenHeldBills', 'click', openHeldBillsModal);
  safeAddEventListener('btnCloseHeldModal', 'click', () => {
    const modal = document.getElementById('heldBillsModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });

  // Print Receipt Direct
  safeAddEventListener('btnPrintReceipt', 'click', () => {
    window.print();
  });

  // New Transaction
  safeAddEventListener('btnNewTransaction', 'click', startNewTransaction);

  // Reports Modal
  safeAddEventListener('btnOpenReportsModal', 'click', openReportsModal);
  safeAddEventListener('btnCloseReportsModal', 'click', () => {
    const modal = document.getElementById('reportsModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });

  // Report Period Filter
  document.querySelectorAll('.report-period-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.report-period-btn').forEach(b => {
        b.className = 'report-period-btn px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 transition';
      });
      btn.className = 'report-period-btn active-period px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm transition font-bold';
      state.reportPeriod = btn.dataset.period;
      sound.playClick();
      renderReportsData();
    });
  });

  // Export CSV
  safeAddEventListener('btnExportCSV', 'click', exportSalesToCSV);

  // Clear History
  safeAddEventListener('btnClearHistory', 'click', () => {
    if (confirm('Yakin ingin menghapus seluruh riwayat penjualan?')) {
      state.salesHistory = [];
      saveStateToStorage();
      renderReportsData();
      showToast('Riwayat penjualan telah dibersihkan.', 'info');
    }
  });

  // Product Management Modal
  safeAddEventListener('btnOpenProductModal', 'click', openProductModal);
  safeAddEventListener('btnCloseProductModal', 'click', () => {
    const modal = document.getElementById('productManagementModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });

  // Product Manage Tabs
  document.querySelectorAll('.menu-manage-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      switchMenuManageTab(btn.dataset.menutab);
    });
  });

  safeAddEventListener('addNewProductForm', 'submit', handleAddProduct);
  safeAddEventListener('editProdSelect', 'change', updateEditProductPreview);
  safeAddEventListener('btnSaveEditProduct', 'click', handleSaveEditProduct);
  safeAddEventListener('deleteProdSelect', 'change', updateDeleteProductPreview);
  safeAddEventListener('btnConfirmDeleteProd', 'click', handleDeleteProduct);

  // Setup sub-engines
  setupEmoneyEvents();
  setupBankEvents();

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // F2: Search focus
    if (e.key === 'F2') {
      e.preventDefault();
      const search = document.getElementById('searchInput');
      if (search) search.focus();
    }
    // F4: Hold Bill
    else if (e.key === 'F4') {
      e.preventDefault();
      holdCurrentBill();
    }
    // F8: Pay
    else if (e.key === 'F8') {
      e.preventDefault();
      const btn = document.getElementById('btnOpenPaymentModal');
      if (btn && !btn.disabled) {
        openPaymentModal();
      }
    }
    // F9: Reports
    else if (e.key === 'F9') {
      e.preventDefault();
      openReportsModal();
    }
    // Enter on receipt modal
    else if (e.key === 'Enter') {
      const receiptModal = document.getElementById('thermalReceiptModal');
      if (receiptModal && !receiptModal.classList.contains('hidden')) {
        startNewTransaction();
      }
    }
    // Esc: Close Modals
    else if (e.key === 'Escape') {
      closePaymentModal();
      const modals = ['reportsModal', 'productManagementModal', 'heldBillsModal', 'thermalReceiptModal'];
      modals.forEach(m => {
        const el = document.getElementById(m);
        if (el) {
          el.classList.add('hidden');
          el.classList.remove('flex');
        }
      });
    }
  });
}

// ==========================================
// 12. DOM INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  loadStateFromStorage();
  initClock();
  setupEventListeners();
  renderProducts();
  renderCart();
  updateHeldBadge();

  const ordEl = document.getElementById('orderNumberDisplay');
  if (ordEl) ordEl.textContent = `ORD-#${state.orderNumberCounter}`;

  // Check dark mode icon
  const isDark = document.documentElement.classList.contains('dark');
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
  }

  // Check sound icon
  const soundIcon = document.getElementById('soundIcon');
  if (soundIcon) {
    soundIcon.setAttribute('data-lucide', sound.enabled ? 'volume-2' : 'volume-x');
  }

  // Check voice icon
  const voiceIcon = document.getElementById('voiceIcon');
  if (voiceIcon) {
    voiceIcon.setAttribute('data-lucide', sound.voiceEnabled ? 'mic' : 'mic-off');
  }

  if (window.lucide) lucide.createIcons();
});
