"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Flame, 
  ShoppingBag, 
  Utensils, 
  Bike, 
  Store, 
  MapPin, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Minus, 
  Plus, 
  Trash2, 
  Search, 
  Star, 
  X, 
  Check, 
  Info, 
  Dices,
  ChefHat,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

// The full interactive dataset matching images and DA/USD descriptions
interface Dish {
  id: string;
  name: string;
  category: string;
  priceUSD: number;
  priceDA: number;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  description: string;
  image: string;
  spicy: boolean;
  vegan: boolean;
  vegetarian: boolean;
  rating: number;
  reviews: number;
}

const DISHES: Dish[] = [
  {
    id: "kung-pao",
    name: "Kung Pao Chicken",
    category: "Entrees",
    priceUSD: 14.95,
    priceDA: 850,
    calories: 680,
    protein: "38g",
    carbs: "22g",
    fat: "28g",
    description: "A spicy stir-fry with peanuts, tender chicken breast, and crisp vegetables in our signature savory chili sauce.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaG2-LtLgcwrMN-KBboX_PrzXUP6bWOY4tLdyZTJShlv4pX7AIhxfVVadqLrS1sjD3m-_wHdrVHM7CEfTiA-uhD4VElQUIt0ZycwmgByMAot-IggISceAU1L-G5BohQtFgbf6CW_s9dQkt43sNk3lpQHV6KTaKQnatw8WobEQZxUnVQBcrJm51geUmVPhmGAFOfTMITTVfZG9TGULtVyLN_Dpon-rxf5eC1uWybLwN1c8hkUe0QyMT",
    spicy: true,
    vegan: false,
    vegetarian: false,
    rating: 4.8,
    reviews: 1240,
  },
  {
    id: "shrimp-dumplings",
    name: "Shrimp Dumplings",
    category: "Dim Sum",
    priceUSD: 9.50,
    priceDA: 450,
    calories: 320,
    protein: "18g",
    carbs: "34g",
    fat: "6g",
    description: "Delicate, hand-pleated steamed dumplings filled with succulent shrimp and subtle seasonings.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5qrY57FbaHpiRN2WaetG7mw5J8TErp61bEuM0kVFkVJi0_0tus3pAz35CXDN4CANRlKL1D3T_gkzIf0HayYZRf-6dNDOJlYkirPjf87fLhqisS8vYVQgO4k7zohehh8ypzfoWy6lZfbP0eXjg--_IVMpH-RaMBle02i0h2wJ9zwLC-01eS2TTovzn3olOJ0HAvVGVRhanWab_X6smZmtzc8DaMmdFbnVQi0enIw3YsZx2VPI2m4cq",
    spicy: false,
    vegan: false,
    vegetarian: false,
    rating: 4.9,
    reviews: 840,
  },
  {
    id: "spring-rolls",
    name: "Spring Rolls",
    category: "Starters",
    priceUSD: 6.00,
    priceDA: 300,
    calories: 240,
    protein: "4g",
    carbs: "28g",
    fat: "10g",
    description: "Crispy golden rolls filled with fresh shredded vegetables, served with sweet plum dipping sauce.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsTsfoDOF9y1rVNrAoFHk7RRKWTsBIusZt9wjPi1DbZDoUcrXECpXrh2I_hJHk4GAXjdbDS4Kq53A740jXwNfWRsbdI5ZiG2lBpQ6OWyI2OsNYZXghDjJ9Hkl2dRFPehMfeponw9_833StyFn0j0HvDRQqNKBc-F1InofYtR5EktU7PIgS2BGg088DDgKDSapJgP3sk0kDETQhsfeCGJKJoMFjSMBHlBYciaLEaY3SzewuSvoXwPzj",
    spicy: false,
    vegan: true,
    vegetarian: true,
    rating: 4.7,
    reviews: 520,
  },
  {
    id: "beef-broccoli",
    name: "Beef & Broccoli",
    category: "Entrees",
    priceUSD: 13.95,
    priceDA: 950,
    calories: 590,
    protein: "42g",
    carbs: "18g",
    fat: "32g",
    description: "Tender marinated beef slices wok-tossed with fresh broccoli florets in a rich garlic soy ginger sauce.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB08gFYnZ_jkYqH60i9FyQqPl2OWoewGHXBGdZI05CUHbQaHV7tgNPYBAaiftQnE9BE7K9PeVImAu6yyFVz4ref-h4VOr3zE9t6RzXPlCc7dbhO6ZjLq1tf8khQIrkGgk-Ev7rwhilrAE0953nVdyorNx5EItdJVn4xetqagfml1vVvQ8RnJn6h72rYXAP1vHImxxXZq_pw4UxxhfbjrkE_D8dIFQJ6jBBHioL2NfhYgEaT0-aq2yxs",
    spicy: false,
    vegan: false,
    vegetarian: false,
    rating: 4.8,
    reviews: 980,
  },
  {
    id: "wok-fried-rice",
    name: "Wok Fried Rice",
    category: "Sides",
    priceUSD: 10.50,
    priceDA: 550,
    calories: 520,
    protein: "12g",
    carbs: "68g",
    fat: "14g",
    description: "Classic smoky fried rice tossed with egg, peas, carrots, and scallions. Cooked fast at ultra-high heat.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzZw5PO9f5IK288YnaRBwCjiUHolrcIC1wQ4aUOLhiI9AH7Szs--w_L3rgvTp5gkDqRq4ZLscSCcy6cvvW_qfeY9YvQoICbCXNJsXF_4-jZOGTq8VHCqAwSQPY-XHus7TmckLI-85Y0RPs_H9v0iXMq7F03Lap7A_I-Devlrk41Z9ztg6D4XrQbO9eK0rQmZKAYWoouPPscC9zW1rrtOSMABCRH8ppIlhrzKDDDe12ye7Uh2lvPsOt",
    spicy: false,
    vegan: false,
    vegetarian: true,
    rating: 4.6,
    reviews: 750,
  },
  {
    id: "crispy-wontons",
    name: "Crispy Wontons",
    category: "Starters",
    priceUSD: 8.00,
    priceDA: 350,
    calories: 380,
    protein: "14g",
    carbs: "30g",
    fat: "18g",
    description: "Golden-fried wontons filled with seasoned chicken, served blisteringly hot with sweet and sour sauce.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzWHbWmOd_9Wm6Pk0TbZDf7Kl-p-1QRBtl-O0FCQoHIFbmdLsUqjSS5H2392mkLBDydTIFXuzj5p1l9N1wQWvuHhu9Njc6csS6s-0aejnfS6A4qlzb6aqZoRCPY4fua_LJ670zy04-uPzeHljy0tOnQySIRc4DqVocvp8Kwiplz0o0wXWExR1h3SZvbvS71942NOhtDsNdxMRaaX3PgwEr2xlK1HA1VmLjKvVFLROFPo2QZGLgXGnP",
    spicy: false,
    vegan: false,
    vegetarian: false,
    rating: 4.7,
    reviews: 620,
  }
];

interface CartItem {
  dish: Dish;
  quantity: number;
}

interface FortuneResult {
  fortune: string;
  luckyNumbers: number[];
  recommendedDish: string;
  pairingExplanation: string;
}

export default function Home() {
  // Core UI states
  const [currency, setCurrency] = useState<"USD" | "DA">("DA");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dietaryFilter, setDietaryFilter] = useState<{ spicy: boolean; vegan: boolean; vegetarian: boolean }>({
    spicy: false,
    vegan: false,
    vegetarian: false,
  });

  // Cart & checkout states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);
  const [couponError, setCouponError] = useState<string>("");
  
  // Checkout flow states
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "details" | "processing" | "tracking">("cart");
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
    paymentMethod: "cash"
  });

  // Order tracking status simulation
  const [trackingState, setTrackingState] = useState<number>(0); // 0: confirmed, 1: preparing, 2: delivery, 3: arrived
  const [trackingTimer, setTrackingTimer] = useState<number>(1200); // 20 minutes countdown

  // Gemini Fortune states
  const [selectedMood, setSelectedMood] = useState<string>("🌶️ Spicy / Fiery");
  const [userName, setUserName] = useState<string>("");
  const [fortuneData, setFortuneData] = useState<FortuneResult | null>(null);
  const [isGeneratingFortune, setIsGeneratingFortune] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string>("");

  // Other navigation overlays
  const [activeTab, setActiveTab] = useState<"menu" | "about" | "locations">("menu");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Auto scroll logic for navigation tabs
  const scrollToSection = (id: string) => {
    setActiveTab(id as any);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Cart operations
  const addToCart = (dish: Dish) => {
    setCart(prev => {
      const existing = prev.find(item => item.dish.id === dish.id);
      if (existing) {
        return prev.map(item => item.dish.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { dish, quantity: 1 }];
    });
    // Shake / pop open cart temporarily
    setIsCartOpen(true);
  };

  const updateQuantity = (dishId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.dish.id === dishId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (dishId: string) => {
    setCart(prev => prev.filter(item => item.dish.id !== dishId));
  };

  // Price calculations
  const getPrice = (dish: Dish) => {
    return currency === "USD" ? dish.priceUSD : dish.priceDA;
  };

  const formatPrice = (amount: number) => {
    return currency === "USD" 
      ? `$${amount.toFixed(2)}` 
      : `${Math.round(amount)} DA`;
  };

  // Cart calculations
  const subtotal = cart.reduce((acc, item) => acc + (getPrice(item.dish) * item.quantity), 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const deliveryFee = orderType === "delivery" ? (currency === "USD" ? 2.99 : 150) : 0;
  const grandTotal = subtotal - discountAmount + deliveryFee;

  // Nutrition aggregation for health-conscious users
  const totalCalories = cart.reduce((acc, item) => acc + (item.dish.calories * item.quantity), 0);
  const totalProtein = cart.reduce((acc, item) => acc + (parseInt(item.dish.protein) * item.quantity), 0);
  const totalCarbs = cart.reduce((acc, item) => acc + (parseInt(item.dish.carbs) * item.quantity), 0);
  const totalFat = cart.reduce((acc, item) => acc + (parseInt(item.dish.fat) * item.quantity), 0);

  // Apply Coupon Code
  const applyPromoCode = () => {
    setCouponError("");
    const cleaned = coupon.trim().toUpperCase();
    if (cleaned === "WOK10") {
      setAppliedCoupon({ code: "WOK10", discountPercent: 10 });
    } else if (cleaned === "FIREWOK") {
      setAppliedCoupon({ code: "FIREWOK", discountPercent: 15 });
    } else if (cleaned === "FASTLAUNCH") {
      setAppliedCoupon({ code: "FASTLAUNCH", discountPercent: 20 });
    } else {
      setCouponError("Invalid promo code. Try 'WOK10' or 'FIREWOK'!");
    }
  };

  // Simulated delivery tracker countdown & status advance
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (checkoutStep === "tracking" && trackingTimer > 0) {
      interval = setInterval(() => {
        setTrackingTimer(prev => {
          if (prev <= 1) {
            setTrackingState(3); // Delivered
            return 0;
          }
          // Advance progress states based on time blocks
          if (prev === 900) setTrackingState(1); // Preparing
          if (prev === 450) setTrackingState(2); // Out for delivery
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [checkoutStep, trackingTimer]);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerDetails.name || !customerDetails.phone || (orderType === "delivery" && !customerDetails.address)) {
      alert("Please fill out all required fields.");
      return;
    }
    
    // Switch to animated loading
    setCheckoutStep("processing");
    setTimeout(() => {
      setCheckoutStep("tracking");
      setTrackingState(0);
      setTrackingTimer(1200); // 20 minutes countdown
    }, 2500);
  };

  // Gemini AI integration
  const crackFortuneCookie = async () => {
    setIsGeneratingFortune(true);
    setAiError("");
    setFortuneData(null);
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "fortune",
          mood: selectedMood,
          dietaryPreferences: Object.entries(dietaryFilter)
            .filter(([_, active]) => active)
            .map(([name]) => name),
          currentCart: cart.map(item => item.dish.name),
        }),
      });

      if (!response.ok) {
        throw new Error("Chef is currently wok-tossing a giant feast. Please try again in a bit!");
      }

      const data = await response.json();
      setFortuneData(data);
    } catch (err: any) {
      setAiError(err.message || "Failed to crack fortune cookie.");
    } finally {
      setIsGeneratingFortune(false);
    }
  };

  // Quick action from AI corner
  const addFortuneRecommendation = () => {
    if (!fortuneData) return;
    const recommended = DISHES.find(d => d.name.toLowerCase() === fortuneData.recommendedDish.toLowerCase());
    if (recommended) {
      addToCart(recommended);
    } else {
      // Fallback
      const fallback = DISHES[0];
      addToCart(fallback);
    }
  };

  // Filter and search logic
  const filteredDishes = DISHES.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || dish.category === selectedCategory;
    const matchesSpicy = !dietaryFilter.spicy || dish.spicy;
    const matchesVegan = !dietaryFilter.vegan || dish.vegan;
    const matchesVegetarian = !dietaryFilter.vegetarian || dish.vegetarian;

    return matchesSearch && matchesCategory && matchesSpicy && matchesVegan && matchesVegetarian;
  });

  return (
    <div className="min-h-screen flex flex-col bg-surface select-none">
      {/* 1. STICKY TOP NAV BAR */}
      <nav className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center h-20 px-4 md:px-10 max-w-7xl mx-auto">
          {/* Brand Logo & Title */}
          <button onClick={() => scrollToSection("hero")} className="flex items-center gap-3 group text-left">
            <img 
              alt="WOK & FLAME logo" 
              className="h-11 w-11 object-contain group-hover:rotate-12 transition-transform duration-300" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0b4Ru3Bwqw6uImq2wK25PzFzwXx9R7Q90IO91buZq20MlvpDuKC8tR2YkLgxi-3F7YFKR6tVeKYAFbr_UTR0FHjFW2wBPe3l3sA5xgKGiZuvkKtUg4xv0BXBE53Dz3R0ckZk3uoAOgeuSrhZrIMAJ1kYZjKJ69eq7Nxez5cwNrjRKEtjoKD5r8s6TFnd4clF8-1POJKq1Rl6s7xycETh9Zy9ErLBAirJ2L9Cdcfe6HNcskZhZfsbR"
            />
            <div>
              <span className="font-display text-xl md:text-2xl font-extrabold text-primary block leading-none">
                WOK & FLAME
              </span>
              <span className="text-[10px] tracking-widest uppercase font-sans text-outline font-bold block mt-1">
                BESTITA CHINESE FOOD
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <button 
                onClick={() => scrollToSection("menu")} 
                className={`font-display font-bold text-sm tracking-wide transition-colors py-1 border-b-2 ${activeTab === "menu" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-primary"}`}
              >
                Menu
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("locations")} 
                className={`font-display font-bold text-sm tracking-wide transition-colors py-1 border-b-2 ${activeTab === "locations" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-primary"}`}
              >
                Locations
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("about")} 
                className={`font-display font-bold text-sm tracking-wide transition-colors py-1 border-b-2 ${activeTab === "about" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-primary"}`}
              >
                Our Story
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("chef-corner")} 
                className={`font-display font-bold text-sm tracking-wide text-secondary hover:text-on-secondary-container transition-all flex items-center gap-1.5 px-3 py-1 bg-secondary-container/20 rounded-full`}
              >
                <Sparkles className="w-4 h-4" /> AI Fortune
              </button>
            </li>
          </ul>

          {/* Currency Toggle & Interactive Cart Action Button */}
          <div className="flex items-center gap-4">
            {/* Currency Converter Badge */}
            <div className="bg-surface-container border border-outline-variant rounded-full p-1 flex items-center shadow-inner">
              <button 
                onClick={() => setCurrency("DA")} 
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${currency === "DA" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
              >
                DA
              </button>
              <button 
                onClick={() => setCurrency("USD")} 
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${currency === "USD" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}
              >
                USD
              </button>
            </div>

            {/* Cart trigger button */}
            <button 
              onClick={() => setIsCartOpen(true)} 
              className="relative flex items-center gap-2 bg-primary text-on-primary px-4 md:px-5 py-2.5 rounded-xl hover:bg-primary-container hover:shadow-lg transition-all duration-200 active:scale-95 shadow-[0_4px_12px_rgba(154,0,33,0.3)] group"
              id="cart-trigger-button"
            >
              <ShoppingBag className="w-4.5 h-4.5 group-hover:animate-bounce" />
              <span className="font-sans font-bold text-sm hidden sm:inline">Order Now</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary-container text-on-secondary-container border border-primary w-5.5 h-5.5 rounded-full flex items-center justify-center font-sans text-[11px] font-extrabold animate-pulse">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Mobile Hamburger menu */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden text-primary p-2 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-surface border-t border-outline-variant/30 px-6 py-5 space-y-4 shadow-xl"
            >
              <button onClick={() => scrollToSection("menu")} className="block w-full text-left font-display font-bold text-lg text-on-surface hover:text-primary transition-colors">
                Menu
              </button>
              <button onClick={() => scrollToSection("locations")} className="block w-full text-left font-display font-bold text-lg text-on-surface hover:text-primary transition-colors">
                Locations
              </button>
              <button onClick={() => scrollToSection("about")} className="block w-full text-left font-display font-bold text-lg text-on-surface hover:text-primary transition-colors">
                Our Story
              </button>
              <button 
                onClick={() => scrollToSection("chef-corner")} 
                className="flex items-center gap-2 font-display font-bold text-lg text-secondary transition-colors"
              >
                <Sparkles className="w-5 h-5 text-secondary-container bg-secondary/10 p-0.5 rounded" /> AI Fortune Cookie
              </button>
              <div className="pt-4 border-t border-outline-variant/40 flex justify-between items-center">
                <span className="text-sm font-sans font-medium text-outline">Select Currency:</span>
                <div className="bg-surface-container border border-outline-variant rounded-full p-0.5 flex items-center">
                  <button onClick={() => setCurrency("DA")} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${currency === "DA" ? "bg-primary text-on-primary" : "text-on-surface-variant"}`}>
                    DA
                  </button>
                  <button onClick={() => setCurrency("USD")} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${currency === "USD" ? "bg-primary text-on-primary" : "text-on-surface-variant"}`}>
                    USD
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-20 flex-grow" id="hero">
        {/* 2. HERO BANNER SECTION */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-on-background">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Sizzling wok cooking" 
              className="object-cover w-full h-full opacity-65"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSUCcZ16cSFuQxoZwmGJgC-PxRJQ8YkZAHZcVQbXsNo7NEdUUHREukZT0qzRYaAg3FgkWyNvd6HsPkaMZJMxgSgBzPEyRf71oyTYpKaJGnlW-XLjagYItQQHD25AGukUQ2RlhzC5NZQc1JZA8OR6F4HwjV0l1ysIrvlQ4rwM5_Wc_ISus27gpGwTph8OXOSh-kzWJf7qHt1wYU5ceBwfb-nTgGwVI7uf65R8FgtnnoqbcmhXRbPHzS"
            />
            {/* Multi-layered rich ambient dark gradient to ensure text has absolute highest contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-on-background/95 via-on-background/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-on-background via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-16 flex flex-col items-start text-surface">
            {/* Promotional Badge Chip */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-container/30 border border-primary-container/60 text-primary-fixed-dim backdrop-blur-md rounded-full font-sans font-bold text-xs uppercase tracking-wider mb-6"
            >
              <Flame className="w-4 h-4 text-secondary-container fill-secondary-container" />
              Sizzling Since 1998
            </motion.div>

            {/* Display Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight drop-shadow-lg"
            >
              Authentic Chinese Flavor, <br className="hidden sm:inline" />
              <span className="text-secondary-container bg-gradient-to-r from-secondary-container to-amber-400 bg-clip-text text-transparent">Delivered Fast</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-base sm:text-lg md:text-xl text-surface-container-highest max-w-xl mt-6 leading-relaxed drop-shadow"
            >
              Experience the breath of the wok (&quot;wok hei&quot;) with our fresh, made-to-order classics. Real local ingredients cooked at intense high heat for maximum flavor.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mt-8 w-full sm:w-auto"
            >
              <button 
                onClick={() => scrollToSection("menu")}
                className="w-full sm:w-auto px-8 py-4 bg-primary-container text-on-primary font-display font-bold text-base rounded-xl transition-all duration-300 hover:bg-primary hover:shadow-[0_8px_24px_rgba(196,18,48,0.4)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
              >
                Order Online
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection("locations")}
                className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border-2 border-white/60 hover:border-white hover:bg-white/10 backdrop-blur-sm font-display font-bold text-base rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Find a Branch
                <MapPin className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* 3. CORE INTERACTIVE MENU SECTION */}
        <section className="py-20 bg-surface-container-low" id="menu">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            {/* Heading & Subtitle */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
                  Signature Dishes
                </h2>
                <p className="font-sans text-sm md:text-base text-on-surface-variant mt-2 max-w-2xl">
                  Wok-tossed to perfection. Click categories below to filter or search for your favorites.
                </p>
              </div>

              {/* Dynamic Categories Selector */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                {["All", "Starters", "Dim Sum", "Entrees", "Sides"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${selectedCategory === cat ? "bg-primary text-on-primary shadow-md" : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Search Bar & Dietary Quick Filters */}
            <div className="bg-surface rounded-2xl p-5 border border-outline-variant/30 shadow-sm mb-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Search input field */}
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-outline" />
                <input 
                  type="text"
                  placeholder="Search chicken, dumpling, rice..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10.5 pr-4 py-2.5 bg-surface-container-low border border-outline-variant/50 rounded-xl font-sans text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Dietary Toggle Filters */}
              <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                <span className="text-xs font-sans font-bold text-outline uppercase tracking-wider">Quick Filters:</span>
                
                <button
                  onClick={() => setDietaryFilter(prev => ({ ...prev, spicy: !prev.spicy }))}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${dietaryFilter.spicy ? "bg-error-container text-on-error-container border-error" : "bg-surface border-outline-variant/60 text-on-surface-variant"}`}
                >
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  Spicy
                </button>

                <button
                  onClick={() => setDietaryFilter(prev => ({ ...prev, vegetarian: !prev.vegetarian }))}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${dietaryFilter.vegetarian ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-surface border-outline-variant/60 text-on-surface-variant"}`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Vegetarian
                </button>

                <button
                  onClick={() => setDietaryFilter(prev => ({ ...prev, vegan: !prev.vegan }))}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${dietaryFilter.vegan ? "bg-teal-100 text-teal-800 border-teal-300" : "bg-surface border-outline-variant/60 text-on-surface-variant"}`}
                >
                  <Check className="w-3.5 h-3.5" />
                  Vegan
                </button>

                {(dietaryFilter.spicy || dietaryFilter.vegan || dietaryFilter.vegetarian || selectedCategory !== "All" || searchQuery) && (
                  <button
                    onClick={() => {
                      setDietaryFilter({ spicy: false, vegan: false, vegetarian: false });
                      setSelectedCategory("All");
                      setSearchQuery("");
                    }}
                    className="text-xs font-sans font-extrabold text-primary hover:underline ml-2"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            </div>

            {/* Dish Grid Card Display */}
            {filteredDishes.length === 0 ? (
              <div className="bg-surface rounded-2xl p-12 text-center border border-dashed border-outline-variant max-w-md mx-auto">
                <ChefHat className="w-12 h-12 text-outline mx-auto animate-bounce mb-4" />
                <h3 className="font-display font-bold text-lg text-on-surface">No Sizzling Dishes Found</h3>
                <p className="font-sans text-sm text-on-surface-variant mt-2">
                  The chefs are checking the ingredients! Try altering your search or disabling dietary filters.
                </p>
                <button
                  onClick={() => {
                    setDietaryFilter({ spicy: false, vegan: false, vegetarian: false });
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 bg-primary text-on-primary font-display font-bold text-xs rounded-lg hover:bg-primary-container transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDishes.map(dish => (
                  <motion.article 
                    layout
                    key={dish.id}
                    className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-default"
                  >
                    {/* Visual Asset Block */}
                    <div className="relative h-56 w-full overflow-hidden bg-surface-container-high">
                      <img 
                        alt={dish.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        src={dish.image}
                      />
                      
                      {/* Dietary Indicators badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {dish.spicy && (
                          <span className="bg-error-container text-on-error-container font-sans font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 border border-error/20 backdrop-blur-sm shadow-sm">
                            <Flame className="w-3 h-3 fill-current" /> Spicy
                          </span>
                        )}
                        {dish.vegan && (
                          <span className="bg-teal-100 text-teal-800 font-sans font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 border border-teal-200 backdrop-blur-sm shadow-sm">
                            Vegan
                          </span>
                        )}
                        {!dish.vegan && dish.vegetarian && (
                          <span className="bg-emerald-100 text-emerald-800 font-sans font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-200 backdrop-blur-sm shadow-sm">
                            Vegetarian
                          </span>
                        )}
                      </div>

                      {/* Calorie Indicator badge */}
                      <span className="absolute bottom-3 right-3 bg-inverse-surface/80 text-inverse-on-surface font-sans text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {dish.calories} kcal
                      </span>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h3 className="font-display text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                          {dish.name}
                        </h3>
                        <span className="font-display font-extrabold text-base text-primary shrink-0">
                          {formatPrice(getPrice(dish))}
                        </span>
                      </div>

                      {/* Brief description */}
                      <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed line-clamp-3 mb-4 flex-grow">
                        {dish.description}
                      </p>

                      {/* Meta feedback rating and Add to order button */}
                      <div className="border-t border-outline-variant/30 pt-4 flex items-center justify-between mt-auto">
                        <div className="flex items-center text-secondary">
                          <Star className="w-4 h-4 fill-secondary text-secondary" />
                          <span className="font-sans font-extrabold text-xs text-on-surface ml-1">{dish.rating}</span>
                          <span className="font-sans text-[11px] text-outline ml-1">({dish.reviews})</span>
                        </div>

                        <button 
                          onClick={() => addToCart(dish)}
                          className="px-4 py-2 border border-primary text-primary hover:bg-primary-container hover:text-on-primary hover:border-primary-container font-sans font-bold text-xs rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add to Order
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 4. AI FORTUNE COOKIE & PERSONALIZED CHEF ADVICE (Gemini powered) */}
        <section className="py-20 bg-surface border-t border-outline-variant/30" id="chef-corner">
          <div className="max-w-4xl mx-auto px-4 md:px-10">
            <div className="bg-gradient-to-br from-inverse-surface to-neutral-900 rounded-3xl text-surface p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Background ambient light */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                
                {/* AI Interactive controls */}
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-2 text-secondary-container mb-4">
                    <Sparkles className="w-5 h-5 text-secondary-container" />
                    <span className="font-display font-extrabold text-sm tracking-wider uppercase">AI Chef&apos;s Corner</span>
                  </div>
                  
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white leading-tight">
                    Crack Your AI <br /> Fortune Cookie
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-surface-container-highest mt-3 leading-relaxed">
                    Let our Virtual Chef read your current mood and whip up a customized digital fortune alongside a delicious personalized dish recommendation!
                  </p>

                  {/* Vibe selection */}
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-sans font-bold text-outline-variant mb-1.5 uppercase tracking-wide">
                        What&apos;s your mood today?
                      </label>
                      <select
                        value={selectedMood}
                        onChange={(e) => setSelectedMood(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-3.5 py-2.5 font-sans text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      >
                        <option value="🌶️ Spicy / Fiery">🌶️ Spicy &amp; Bold (Ready for heat)</option>
                        <option value="😌 Peaceful / Cozy">😌 Peaceful &amp; Cozy (Looking for warmth)</option>
                        <option value="🎉 Lucky / Celebratory">🎉 Lucky &amp; Celebratory (Ready to feast)</option>
                        <option value="🚀 Ambitious / Energetic">🚀 Ambitious &amp; Energetic (Tackling the day)</option>
                        <option value="🥬 Light / Healthy">🥬 Light &amp; Healthy (Refreshing bites)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-bold text-outline-variant mb-1.5 uppercase tracking-wide">
                        Your Name (Optional)
                      </label>
                      <input 
                        type="text"
                        placeholder="Enter your name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-3.5 py-2.5 font-sans text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-neutral-500"
                      />
                    </div>

                    {/* Crack Button */}
                    <button
                      onClick={crackFortuneCookie}
                      disabled={isGeneratingFortune}
                      className="w-full py-3.5 bg-secondary-container hover:bg-amber-500 text-on-secondary-container font-display font-extrabold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isGeneratingFortune ? (
                        <>
                          <div className="w-5 h-5 border-2 border-on-secondary-container border-t-transparent rounded-full animate-spin"></div>
                          Wok-tossing Your Fortune...
                        </>
                      ) : (
                        <>
                          <Dices className="w-4.5 h-4.5" />
                          Crack Fortune Cookie
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* AI Response Display Area */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center min-h-[250px] bg-neutral-800/50 border border-neutral-700/50 rounded-2xl p-6 relative">
                  {isGeneratingFortune && (
                    <div className="text-center">
                      <ChefHat className="w-12 h-12 text-secondary-container animate-bounce mx-auto mb-4" />
                      <p className="text-sm font-sans text-surface-container-highest animate-pulse">
                        The virtual chef is cracking eggs, lighting the burner, and tuning your destiny...
                      </p>
                    </div>
                  )}

                  {!isGeneratingFortune && !fortuneData && !aiError && (
                    <div className="text-center p-4">
                      <div className="w-16 h-16 bg-neutral-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Dices className="w-8 h-8 text-secondary-container" />
                      </div>
                      <p className="text-sm font-sans font-bold text-white">Your destiny awaits</p>
                      <p className="text-xs font-sans text-neutral-400 mt-2 max-w-xs mx-auto">
                        Fill in your mood above and click to crack open your custom fortune cookie.
                      </p>
                    </div>
                  )}

                  {aiError && (
                    <div className="text-center p-4">
                      <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                      <p className="text-sm font-sans font-bold text-white">Culinary Hiccup</p>
                      <p className="text-xs font-sans text-red-200 mt-2">{aiError}</p>
                    </div>
                  )}

                  {fortuneData && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full text-left space-y-4"
                    >
                      {/* Fortune Text */}
                      <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-700 relative">
                        <span className="absolute -top-3.5 left-4 bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full font-sans text-[10px] font-extrabold uppercase tracking-widest">
                          Fortune
                        </span>
                        <p className="font-sans italic text-sm text-amber-100 leading-relaxed pt-1.5">
                          &ldquo;{fortuneData.fortune}&rdquo;
                        </p>
                      </div>

                      {/* Lucky Numbers */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-sans font-bold text-neutral-400">Lucky Numbers:</span>
                        <div className="flex gap-1.5">
                          {fortuneData.luckyNumbers?.map((num, i) => (
                            <span key={i} className="w-7 h-7 bg-neutral-700 rounded-full flex items-center justify-center font-sans text-xs font-extrabold text-white">
                              {num}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Recommended Dish */}
                      <div className="bg-primary/20 p-4 rounded-xl border border-primary/30">
                        <span className="font-display text-[10px] font-extrabold text-secondary-container uppercase tracking-widest block mb-1">
                          Chef&apos;s Recommendation
                        </span>
                        <h4 className="font-display font-extrabold text-sm text-white">
                          {fortuneData.recommendedDish}
                        </h4>
                        <p className="font-sans text-xs text-surface-container-highest mt-1">
                          {fortuneData.pairingExplanation}
                        </p>
                        
                        {/* Quick Add trigger */}
                        <button
                          onClick={addFortuneRecommendation}
                          className="mt-3.5 w-full py-1.5 bg-primary hover:bg-primary-container text-on-primary font-sans font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Recommended Dish to Order
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 5. VALUE PROPOSITION SECTION ("The Bestita Standard") */}
        <section className="py-20 bg-surface border-y border-outline-variant/30" id="about">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
                The Wok & Flame Standard
              </h2>
              <p className="font-sans text-sm md:text-base text-on-surface-variant mt-3 max-w-xl mx-auto">
                We don&apos;t compromise on quality, ingredients, or speed. Discover why we&apos;ve been the city&apos;s favorite wok kitchen since 1998.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Value prop 1 */}
              <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary-container/10 text-primary flex items-center justify-center mb-6">
                  <Utensils className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-on-surface mb-2">Fresh Ingredients</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Sourced locally and prepped fresh daily by hand. We never compromise on raw quality. No MSG shortcuts.
                </p>
              </div>

              {/* Value prop 2 */}
              <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                  <Bike className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="font-display text-lg font-bold text-on-surface mb-2">Lightning Fast</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Wok hei means &quot;breath of the wok&quot;. Cooked instantly under ultra-high heat and delivered hot by our dedicated fleet.
                </p>
              </div>

              {/* Value prop 3 */}
              <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-neutral-100 text-on-surface flex items-center justify-center mb-6">
                  <Store className="w-8 h-8 text-neutral-700" />
                </div>
                <h3 className="font-display text-lg font-bold text-on-surface mb-2">Multiple Branches</h3>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  Always nearby. With 12 premium kitchen locations across the city, your favorite sizzling meal is never far.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. LOCATIONS MODAL OR SECTION */}
        <section className="py-20 bg-surface-container-low" id="locations">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-1/2">
                <span className="font-display font-extrabold text-xs text-primary uppercase tracking-widest block mb-2">Find Wok & Flame</span>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
                  12 Sizzling Locations Near You
                </h2>
                <p className="font-sans text-sm md:text-base text-on-surface-variant mt-4 leading-relaxed">
                  Our kitchens are strategically scattered across key districts of the city to guarantee your food arrives piping hot under 30 minutes. Visit a branch for casual dine-in or grab quick takeout!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="p-4 bg-surface rounded-xl border border-outline-variant/30">
                    <h4 className="font-display font-bold text-sm text-on-surface flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" /> Downtown Central
                    </h4>
                    <p className="text-xs font-sans text-on-surface-variant mt-1.5">
                      45 Rue Didouche Mourad, Algiers
                    </p>
                    <span className="text-[10px] font-sans text-emerald-600 font-bold uppercase tracking-wider block mt-2">Open Now • Dine-in & Delivery</span>
                  </div>

                  <div className="p-4 bg-surface rounded-xl border border-outline-variant/30">
                    <h4 className="font-display font-bold text-sm text-on-surface flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" /> Batna Plaza
                    </h4>
                    <p className="text-xs font-sans text-on-surface-variant mt-1.5">
                      Avenue de l&apos;Indépendance, Batna
                    </p>
                    <span className="text-[10px] font-sans text-emerald-600 font-bold uppercase tracking-wider block mt-2">Open Now • Takeout &amp; Delivery</span>
                  </div>

                  <div className="p-4 bg-surface rounded-xl border border-outline-variant/30">
                    <h4 className="font-display font-bold text-sm text-on-surface flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" /> Bab Ezzouar Mall
                    </h4>
                    <p className="text-xs font-sans text-on-surface-variant mt-1.5">
                      Food Court, Bab Ezzouar, Algiers
                    </p>
                    <span className="text-[10px] font-sans text-emerald-600 font-bold uppercase tracking-wider block mt-2">Open Now • dine-in & takeaway</span>
                  </div>

                  <div className="p-4 bg-surface rounded-xl border border-outline-variant/30">
                    <h4 className="font-display font-bold text-sm text-on-surface flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" /> Oran Seafront
                    </h4>
                    <p className="text-xs font-sans text-on-surface-variant mt-1.5">
                      Boulevard de l&apos;Armee, Oran
                    </p>
                    <span className="text-[10px] font-sans text-emerald-600 font-bold uppercase tracking-wider block mt-2">Open Now • full service dine-in</span>
                  </div>
                </div>
              </div>

              {/* Decorative map mockup */}
              <div className="w-full lg:w-1/2 h-[350px] md:h-[450px] bg-neutral-200 rounded-3xl overflow-hidden relative shadow-lg border border-outline-variant/40">
                {/* Simulated Map illustration using CSS and Tailwind patterns */}
                <div className="absolute inset-0 bg-stone-100 opacity-90 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  {/* Grid Roads simulation */}
                  <div className="absolute inset-x-0 top-1/4 h-3 bg-white border-y border-stone-200"></div>
                  <div className="absolute inset-x-0 top-2/3 h-4 bg-white border-y border-stone-200"></div>
                  <div className="absolute inset-y-0 left-1/3 w-3.5 bg-white border-x border-stone-200"></div>
                  <div className="absolute inset-y-0 left-3/4 w-3 bg-white border-x border-stone-200"></div>

                  {/* Location pins */}
                  <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse">
                    <MapPin className="w-8 h-8 text-primary fill-primary-container" />
                  </div>
                  <div className="absolute top-2/3 left-3/4 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse">
                    <MapPin className="w-8 h-8 text-primary fill-primary-container" />
                  </div>
                  <div className="absolute top-[45%] left-[20%] text-primary animate-bounce">
                    <div className="bg-primary text-on-primary text-[10px] font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md whitespace-nowrap">
                      <Flame className="w-3.5 h-3.5 text-secondary-container" />
                      Wok & Flame Downtown
                    </div>
                  </div>
                </div>
                {/* Floating controls */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-md border border-outline-variant/30 max-w-xs">
                  <span className="text-[10px] font-sans font-extrabold text-primary uppercase tracking-widest block">Operational Status</span>
                  <p className="text-xs font-sans font-bold text-on-surface mt-1">All 12 branches operating normally.</p>
                  <p className="text-[10px] font-sans text-on-surface-variant mt-1">Average kitchen turn time: 7.2 minutes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. FOOTER */}
      <footer className="bg-inverse-surface border-t border-outline-variant/20 py-12 text-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex items-center gap-4">
            <img 
              alt="WOK & FLAME brand mark" 
              className="w-12 h-12 object-contain grayscale brightness-150 hover:grayscale-0 hover:brightness-100 transition-all cursor-pointer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0b4Ru3Bwqw6uImq2wK25PzFzwXx9R7Q90IO91buZq20MlvpDuKC8tR2YkLgxi-3F7YFKR6tVeKYAFbr_UTR0FHjFW2wBPe3l3sA5xgKGiZuvkKtUg4xv0BXBE53Dz3R0ckZk3uoAOgeuSrhZrIMAJ1kYZjKJ69eq7Nxez5cwNrjRKEtjoKD5r8s6TFnd4clF8-1POJKq1Rl6s7xycETh9Zy9ErLBAirJ2L9Cdcfe6HNcskZhZfsbR"
            />
            <div>
              <span className="font-display text-xl font-extrabold text-white block">WOK & FLAME</span>
              <span className="text-[10px] font-sans text-neutral-400 font-medium block uppercase tracking-wider">Sizzling Since 1998</span>
            </div>
          </div>

          <nav>
            <ul className="flex flex-wrap gap-6 text-sm font-sans font-medium text-neutral-300">
              <li><button onClick={() => alert("Privacy Policy applied locally.")} className="hover:text-primary transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => alert("Terms of Service approved.")} className="hover:text-primary transition-colors">Terms of Service</button></li>
              <li><button onClick={() => scrollToSection("menu")} className="hover:text-primary transition-colors">Nutrition Guide</button></li>
              <li><button onClick={() => scrollToSection("locations")} className="hover:text-primary transition-colors">Contact</button></li>
            </ul>
          </nav>

          <p className="text-xs font-sans text-neutral-500">
            © 2026 WOK & FLAME. All rights reserved. Sizzling since 1998.
          </p>
        </div>
      </footer>

      {/* 8. INTERACTIVE SHOPPING CART & CHECKOUT SIDEBAR DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Sidebar Body */}
            <motion.aside 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface z-50 shadow-2xl flex flex-col border-l border-outline-variant/30"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-outline-variant/30 flex items-center justify-between bg-surface">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-lg font-extrabold text-on-surface">Your Custom Order</h3>
                </div>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    // Reset checkout flow only if ordered/completed
                    if (checkoutStep === "tracking" && trackingState === 3) {
                      setCheckoutStep("cart");
                      setCart([]);
                    }
                  }} 
                  className="p-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sidebar Content Wrapper */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                
                {/* 1. CART VIEW */}
                {checkoutStep === "cart" && (
                  <>
                    {cart.length === 0 ? (
                      <div className="text-center py-20">
                        <ShoppingBag className="w-16 h-16 text-outline/30 mx-auto mb-4" />
                        <h4 className="font-display font-bold text-base text-on-surface">Your Cart is Empty</h4>
                        <p className="font-sans text-xs text-on-surface-variant mt-2 max-w-xs mx-auto">
                          Wok-hei wait for no one! Choose from our menu cards to build your custom delicious feast.
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Cart List */}
                        <div className="space-y-4">
                          {cart.map(item => (
                            <div 
                              key={item.dish.id} 
                              className="flex items-center gap-4 bg-surface-container-low border border-outline-variant/30 rounded-xl p-3"
                            >
                              <img 
                                alt={item.dish.name} 
                                className="w-14 h-14 object-cover rounded-lg shrink-0 bg-surface-container"
                                src={item.dish.image}
                              />
                              <div className="flex-grow min-w-0">
                                <h5 className="font-display font-bold text-sm text-on-surface truncate">
                                  {item.dish.name}
                                </h5>
                                <p className="font-sans text-xs text-primary font-bold mt-1">
                                  {formatPrice(getPrice(item.dish))} each
                                </p>
                              </div>
                              <div className="flex items-center bg-surface border border-outline-variant rounded-lg p-1 shrink-0">
                                <button 
                                  onClick={() => updateQuantity(item.dish.id, -1)}
                                  className="p-1 hover:bg-surface-container text-on-surface-variant rounded"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="px-3.5 font-sans font-bold text-xs text-on-surface">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(item.dish.id, 1)}
                                  className="p-1 hover:bg-surface-container text-on-surface-variant rounded"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <button 
                                onClick={() => removeFromCart(item.dish.id)}
                                className="text-outline hover:text-primary transition-colors p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* Nutrition Calculator aggregate dashboard */}
                        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
                          <h6 className="font-display font-bold text-xs text-emerald-800 flex items-center gap-1.5 uppercase tracking-wide mb-2">
                            <Info className="w-4 h-4" /> Order Nutrition Summary
                          </h6>
                          <div className="grid grid-cols-4 gap-2 text-center">
                            <div className="bg-surface border border-emerald-100 p-2 rounded-lg">
                              <span className="block text-[10px] font-sans font-bold text-outline uppercase tracking-wider">Cals</span>
                              <span className="font-sans font-extrabold text-xs text-emerald-900">{totalCalories}</span>
                            </div>
                            <div className="bg-surface border border-emerald-100 p-2 rounded-lg">
                              <span className="block text-[10px] font-sans font-bold text-outline uppercase tracking-wider">Prot</span>
                              <span className="font-sans font-extrabold text-xs text-emerald-900">{totalProtein}g</span>
                            </div>
                            <div className="bg-surface border border-emerald-100 p-2 rounded-lg">
                              <span className="block text-[10px] font-sans font-bold text-outline uppercase tracking-wider">Carb</span>
                              <span className="font-sans font-extrabold text-xs text-emerald-900">{totalCarbs}g</span>
                            </div>
                            <div className="bg-surface border border-emerald-100 p-2 rounded-lg">
                              <span className="block text-[10px] font-sans font-bold text-outline uppercase tracking-wider">Fats</span>
                              <span className="font-sans font-extrabold text-xs text-emerald-900">{totalFat}g</span>
                            </div>
                          </div>
                        </div>

                        {/* Promotional Coupon Entry */}
                        <div className="space-y-2">
                          <label className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider">
                            Promotion Coupon Code
                          </label>
                          <div className="flex gap-2">
                            <input 
                              type="text"
                              placeholder="Enter coupon (e.g. WOK10)"
                              value={coupon}
                              onChange={(e) => setCoupon(e.target.value)}
                              className="flex-grow px-3.5 py-2 bg-surface-container border border-outline-variant rounded-xl font-sans text-sm focus:outline-none"
                            />
                            <button 
                              onClick={applyPromoCode}
                              className="px-4 bg-primary hover:bg-primary-container text-on-primary font-display font-bold text-xs rounded-xl transition-all"
                            >
                              Apply
                            </button>
                          </div>
                          {couponError && <p className="text-[11px] font-sans text-error mt-1">{couponError}</p>}
                          {appliedCoupon && (
                            <p className="text-[11px] font-sans text-emerald-600 font-bold flex items-center gap-1 mt-1">
                              ✓ Promo Code &ldquo;{appliedCoupon.code}&rdquo; applied! ({appliedCoupon.discountPercent}% Discount)
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* 2. ORDER DETAILS FORM */}
                {checkoutStep === "details" && (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-left">
                    {/* Order Type Toggle */}
                    <div>
                      <span className="block text-xs font-sans font-bold text-outline uppercase tracking-wider mb-2">Order Type:</span>
                      <div className="bg-surface-container-low border border-outline-variant p-1 rounded-xl flex">
                        <button
                          type="button"
                          onClick={() => setOrderType("delivery")}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${orderType === "delivery" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"}`}
                        >
                          <Bike className="w-3.5 h-3.5" />
                          Delivery
                        </button>
                        <button
                          type="button"
                          onClick={() => setOrderType("pickup")}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${orderType === "pickup" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"}`}
                        >
                          <Store className="w-3.5 h-3.5" />
                          Pickup
                        </button>
                      </div>
                    </div>

                    {/* Contact Inputs */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                          Full Name *
                        </label>
                        <input 
                          type="text" 
                          required
                          value={customerDetails.name}
                          onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full px-3.5 py-2.5 bg-surface-container border border-outline-variant/60 rounded-xl font-sans text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                          Phone Number *
                        </label>
                        <input 
                          type="tel" 
                          required
                          value={customerDetails.phone}
                          onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                          placeholder="e.g. +213 555 12 34 56"
                          className="w-full px-3.5 py-2.5 bg-surface-container border border-outline-variant/60 rounded-xl font-sans text-sm"
                        />
                      </div>

                      {orderType === "delivery" && (
                        <div>
                          <label className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                            Delivery Address *
                          </label>
                          <textarea 
                            required
                            rows={2}
                            value={customerDetails.address}
                            onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                            placeholder="Stree Address, Apartment, Building Number"
                            className="w-full px-3.5 py-2.5 bg-surface-container border border-outline-variant/60 rounded-xl font-sans text-sm resize-none"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-sans font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                          Special Instructions / Notes
                        </label>
                        <input 
                          type="text" 
                          value={customerDetails.notes}
                          onChange={(e) => setCustomerDetails({ ...customerDetails, notes: e.target.value })}
                          placeholder="Extra napkins, leave at door, no nuts, etc."
                          className="w-full px-3.5 py-2.5 bg-surface-container border border-outline-variant/60 rounded-xl font-sans text-sm"
                        />
                      </div>

                      {/* Payment Selection */}
                      <div>
                        <span className="block text-xs font-sans font-bold text-outline uppercase tracking-wider mb-2">Payment Method:</span>
                        <div className="grid grid-cols-2 gap-2">
                          <label className={`border p-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${customerDetails.paymentMethod === "cash" ? "border-primary bg-primary/5 text-primary font-bold" : "border-outline-variant hover:bg-neutral-50 text-on-surface-variant"}`}>
                            <input 
                              type="radio" 
                              name="payment" 
                              value="cash"
                              checked={customerDetails.paymentMethod === "cash"}
                              onChange={() => setCustomerDetails({ ...customerDetails, paymentMethod: "cash" })}
                              className="hidden"
                            />
                            <span>💵 Pay on Delivery</span>
                          </label>
                          <label className={`border p-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${customerDetails.paymentMethod === "card" ? "border-primary bg-primary/5 text-primary font-bold" : "border-outline-variant hover:bg-neutral-50 text-on-surface-variant"}`}>
                            <input 
                              type="radio" 
                              name="payment" 
                              value="card"
                              checked={customerDetails.paymentMethod === "card"}
                              onChange={() => setCustomerDetails({ ...customerDetails, paymentMethod: "card" })}
                              className="hidden"
                            />
                            <span>💳 Credit Card</span>
                          </label>
                        </div>
                      </div>

                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-primary text-on-primary font-display font-extrabold text-base rounded-xl transition-all duration-300 hover:bg-primary-container shadow-md flex items-center justify-center gap-2 mt-4 cursor-pointer"
                    >
                      Place Your Feast Order
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setCheckoutStep("cart")}
                      className="w-full text-center text-xs font-sans font-bold text-outline hover:text-on-surface py-2"
                    >
                      ← Back to Cart
                    </button>
                  </form>
                )}

                {/* 3. ORDER PROCESSING LOADING WINDOW */}
                {checkoutStep === "processing" && (
                  <div className="text-center py-20 flex flex-col items-center justify-center space-y-4">
                    <ChefHat className="w-16 h-16 text-primary animate-spin" />
                    <h4 className="font-display font-extrabold text-lg text-on-surface animate-pulse">
                      Wok & Flame Chef is Cooking!
                    </h4>
                    <p className="font-sans text-xs text-on-surface-variant max-w-xs leading-relaxed">
                      Warming up the massive induction heaters, folding fresh dough wrappers, and tossing crispy scallions. Your secure payment is processing...
                    </p>
                  </div>
                )}

                {/* 4. REAL-TIME DELIVERY PIPELINE TRACKER */}
                {checkoutStep === "tracking" && (
                  <div className="space-y-6 text-left">
                    {/* Visual Countdown Card */}
                    <div className="bg-neutral-900 text-white rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
                      
                      <span className="text-[10px] font-sans font-extrabold text-secondary uppercase tracking-widest block">Simulated Delivery Window</span>
                      <h4 className="font-display font-extrabold text-3xl text-white mt-2">
                        {Math.floor(trackingTimer / 60)}:{(trackingTimer % 60).toString().padStart(2, "0")}
                      </h4>
                      <p className="text-xs font-sans text-neutral-400 mt-1">Minutes remaining until arrival</p>

                      <div className="mt-4 pt-4 border-t border-neutral-800 text-left flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-sans text-neutral-500 uppercase font-bold">Courier Name</span>
                          <p className="text-xs font-sans font-bold text-white">Yassine Fast</p>
                        </div>
                        <div className="bg-primary/20 border border-primary/40 px-3 py-1 rounded-full text-[10px] font-sans font-extrabold text-secondary flex items-center gap-1.5">
                          <Bike className="w-3.5 h-3.5" /> Fast Courier
                        </div>
                      </div>
                    </div>

                    {/* Operational Progress Stepper */}
                    <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                      
                      {/* Step 1: Confirmed */}
                      <div className="relative">
                        <div className={`absolute -left-6.5 top-0.5 w-5 h-5 rounded-full border-2 bg-surface flex items-center justify-center ${trackingState >= 0 ? "border-emerald-600 text-emerald-600 fill-emerald-600" : "border-neutral-300"}`}>
                          {trackingState >= 0 ? <Check className="w-3 h-3 stroke-[3]" /> : null}
                        </div>
                        <div className="pl-2">
                          <h5 className={`font-display text-sm font-bold ${trackingState >= 0 ? "text-on-surface" : "text-neutral-400"}`}>
                            Order Confirmed
                          </h5>
                          <p className="text-xs font-sans text-on-surface-variant mt-0.5">
                            Kitchen is firing up the burners and prepping raw ingredients.
                          </p>
                        </div>
                      </div>

                      {/* Step 2: Cook in Wok */}
                      <div className="relative">
                        <div className={`absolute -left-6.5 top-0.5 w-5 h-5 rounded-full border-2 bg-surface flex items-center justify-center ${trackingState >= 1 ? "border-emerald-600 text-emerald-600" : "border-neutral-300"}`}>
                          {trackingState >= 1 ? <Check className="w-3 h-3 stroke-[3]" /> : <div className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-ping"></div>}
                        </div>
                        <div className="pl-2">
                          <h5 className={`font-display text-sm font-bold ${trackingState >= 1 ? "text-on-surface" : "text-neutral-400"}`}>
                            Sizzling in the Wok
                          </h5>
                          <p className="text-xs font-sans text-on-surface-variant mt-0.5">
                            Your food is tossing in authentic high heat for perfect wok hei caramelization.
                          </p>
                        </div>
                      </div>

                      {/* Step 3: Out on Road */}
                      <div className="relative">
                        <div className={`absolute -left-6.5 top-0.5 w-5 h-5 rounded-full border-2 bg-surface flex items-center justify-center ${trackingState >= 2 ? "border-emerald-600 text-emerald-600" : "border-neutral-300"}`}>
                          {trackingState >= 2 ? <Check className="w-3 h-3 stroke-[3]" /> : null}
                        </div>
                        <div className="pl-2">
                          <h5 className={`font-display text-sm font-bold ${trackingState >= 2 ? "text-on-surface" : "text-neutral-400"}`}>
                            Out for Speedy Delivery
                          </h5>
                          <p className="text-xs font-sans text-on-surface-variant mt-0.5">
                            Piping hot items are packed in custom insulated cases and on the road.
                          </p>
                        </div>
                      </div>

                      {/* Step 4: Arrived */}
                      <div className="relative">
                        <div className={`absolute -left-6.5 top-0.5 w-5 h-5 rounded-full border-2 bg-surface flex items-center justify-center ${trackingState >= 3 ? "border-emerald-600 text-emerald-600" : "border-neutral-300"}`}>
                          {trackingState >= 3 ? <Check className="w-3 h-3 stroke-[3]" /> : null}
                        </div>
                        <div className="pl-2">
                          <h5 className={`font-display text-sm font-bold ${trackingState >= 3 ? "text-on-surface" : "text-neutral-400"}`}>
                            Arrived & Sizzling
                          </h5>
                          <p className="text-xs font-sans text-on-surface-variant mt-0.5">
                            Feast has arrived at your door! Unbox immediately and enjoy the intense heat.
                          </p>
                        </div>
                      </div>

                    </div>

                    {trackingState === 3 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center mt-6"
                      >
                        <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                        <h5 className="font-display font-extrabold text-sm text-emerald-900">Order Completed Successfully!</h5>
                        <p className="font-sans text-xs text-emerald-700 mt-1">Thank you for dining with Wok & Flame. Sizzling since 1998.</p>
                        <button
                          onClick={() => {
                            setCheckoutStep("cart");
                            setCart([]);
                            setIsCartOpen(false);
                          }}
                          className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-xs rounded-lg transition-colors"
                        >
                          Clear Order & Finish
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}

              </div>

              {/* Drawer Sticky Footer summary info */}
              {cart.length > 0 && checkoutStep !== "processing" && (
                <div className="p-6 border-t border-outline-variant/30 bg-surface-container-lowest shadow-inner text-left space-y-4 shrink-0">
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-xs font-sans text-on-surface-variant">
                      <span>Order Subtotal:</span>
                      <span className="font-bold">{formatPrice(subtotal)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-xs font-sans text-emerald-600 font-bold">
                        <span>Discount ({appliedCoupon.discountPercent}%):</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    {orderType === "delivery" && (
                      <div className="flex justify-between text-xs font-sans text-on-surface-variant">
                        <span>Speedy Delivery Fee:</span>
                        <span className="font-bold">{formatPrice(deliveryFee)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-display font-extrabold text-on-surface border-t border-outline-variant/30 pt-3">
                      <span>Grand Total:</span>
                      <span className="text-primary">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>

                  {checkoutStep === "cart" && (
                    <button 
                      onClick={() => setCheckoutStep("details")}
                      className="w-full py-4 bg-primary text-on-primary hover:bg-primary-container font-display font-extrabold text-base rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Proceed to Checkout Details
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}

            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
