import React, { useState, useEffect } from "react";
import image from "../assets/15 pro.jpeg";
import image1 from "../assets/S23.jpeg";
import image2 from "../assets/pixel.jpeg";
import image3 from "../assets/oneplus.jpeg";
import image4 from "../assets/sony.jpeg";
import image5 from "../assets/mag.jpeg";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Heart,
  Star,
  Zap,
  Award,
  Shield,
  Truck,
} from "lucide-react";

const filters = ["All", "Smartphones", "Accessories", "Headphones", "Chargers"];

const mobileItems = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    subtitle: "128GB · Titanium · A17 Pro chip",
    price: "$999",
    rating: 4.9,
    reviews: 1243,
    img: image,
    badge: "Premium",
    inStock: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    subtitle: "256GB · Snapdragon 8 Gen 2",
    price: "$899",
    rating: 4.8,
    reviews: 987,
    img: image1,
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 3,
    name: "Google Pixel 8",
    subtitle: "128GB · AI Camera · Android 14",
    price: "$799",
    rating: 4.7,
    reviews: 654,
    img: image2,
    inStock: true,
  },
  {
    id: 4,
    name: "OnePlus 11",
    subtitle: "16GB RAM · Hasselblad Camera",
    price: "$699",
    rating: 4.6,
    reviews: 432,
    img: image3,
    badge: "Hot Deal",
    inStock: true,
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    subtitle: "Noise Cancelling Headphones",
    price: "$349",
    rating: 4.9,
    reviews: 2156,
    img: image4,
    inStock: true,
  },
  {
    id: 6,
    name: "MagSafe Charger",
    subtitle: "Fast Wireless Charging",
    price: "$59",
    rating: 4.5,
    reviews: 324,
    img: image5,
    inStock: true,
  },
];

function MobilePage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMobiles, setFilteredMobiles] = useState(mobileItems);
  const [page, setPage] = useState("main");
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const updateCart = () => {
      const stored = JSON.parse(localStorage.getItem("/cart")) || [];
      setCartItems(stored);
    };
    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  useEffect(() => {
    let filtered = mobileItems;
    if (selectedFilter !== "All") {
      filtered = filtered.filter((item) =>
        item.subtitle.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    }
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredMobiles(filtered);
  }, [selectedFilter, searchQuery]);

  const toggleFavorite = (id) => {
    const updated = new Set(favorites);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setFavorites(updated);
  };

  const handleAddToCart = (item) => {
    if (!item.inStock) return;
    setSelectedItem(item);
    setPage("details");
  };

  const handleBack = () => setPage("main");

  // ---------------- MAIN PAGE ----------------
  if (page === "main") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-60 sm:w-80 h-60 sm:h-80 bg-indigo-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-60 sm:w-80 h-60 sm:h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-32 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* 🧭 Sticky Responsive Header */}
        <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/50 border-b border-white/60 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back</span>
            </button>

            <div className="flex items-center gap-3 sm:gap-4">
              <button className="relative p-2 sm:p-3 rounded-full bg-white/70 border hover:bg-white/90 transition-all shadow-md">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-rose-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center">
                  {favorites.size}
                </span>
              </button>

              <button
                onClick={() => (window.location.href = "/cart")}
                className="relative p-2 sm:p-3 rounded-full bg-white/70 border hover:bg-white/90 transition-all shadow-md"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-700" />
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-indigo-600 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Push Content Below Header */}
        <div className="pt-24 sm:pt-28">
          {/* Hero Section */}
          <section className="relative z-10 text-center pb-10 sm:pb-12 px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 mb-6 animate-bounce text-sm sm:text-base">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span className="font-semibold text-indigo-700">
                Lightning deals — up to 30% off flagship phones!
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-3 sm:mb-4">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 animate-gradient">
                Mobile Collection
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto">
              Cutting-edge gadgets that keep you ahead 🚀
            </p>

            {/* Search Bar */}
            <div className="mt-8 sm:mt-10 max-w-3xl mx-auto px-2">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition"></div>
                <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white/80 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border border-white/60">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Search className="w-5 sm:w-6 h-5 sm:h-6 text-slate-400 ml-2" />
                    <input
                      type="text"
                      placeholder="Search iPhone, Samsung, accessories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 bg-transparent outline-none text-base sm:text-lg placeholder-slate-400 text-slate-800"
                    />
                  </div>
                  <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-105 transition-all">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3 justify-center px-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                    selectedFilter === f
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                      : "bg-white/70 text-slate-700 border border-slate-200 hover:bg-white hover:shadow-md hover:scale-105"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </section>

          {/* Product Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredMobiles.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/60 shadow-xl hover:-translate-y-2 transition-all"
                >
                  {item.badge && (
                    <div
                      className={`absolute top-3 left-3 sm:top-4 sm:left-4 px-3 sm:px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                        item.badge === "Premium"
                          ? "bg-gradient-to-r from-amber-600 to-yellow-600"
                          : item.badge === "Hot Deal"
                          ? "bg-gradient-to-r from-red-600 to-orange-600"
                          : "bg-gradient-to-r from-indigo-600 to-purple-600"
                      }`}
                    >
                      {item.badge}
                    </div>
                  )}

                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 sm:p-2.5 rounded-full bg-white/90 shadow-lg hover:scale-110 transition-all"
                  >
                    <Heart
                      className={`w-4 sm:w-5 h-4 sm:h-5 ${
                        favorites.has(item.id)
                          ? "fill-rose-500 text-rose-500"
                          : "text-slate-400"
                      }`}
                    />
                  </button>

                  <div className="relative overflow-hidden h-64 sm:h-80">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="bg-red-600 text-white font-bold px-6 py-3 rounded-2xl">
                          OUT OF STOCK
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-slate-700">
                        {item.rating}
                      </span>
                      <span className="text-sm text-slate-400">
                        ({item.reviews} reviews)
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-slate-500 mb-4 text-sm sm:text-base">
                      {item.subtitle}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        {item.price}
                      </span>
                      <button
                        disabled={!item.inStock}
                        onClick={() => handleAddToCart(item)}
                        className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition-all text-sm sm:text-base ${
                          item.inStock
                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-105"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // ---------------- DETAILS PAGE ----------------
  if (page === "details" && selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 p-4 sm:p-6 md:p-10">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 sm:mb-8 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 bg-white/80 rounded-3xl shadow-xl border border-white/60 p-4 sm:p-6 backdrop-blur-xl">
          <img
            src={selectedItem.img}
            alt={selectedItem.name}
            className="rounded-2xl w-full h-full object-cover"
          />

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
              {selectedItem.name}
            </h1>
            <p className="text-slate-500 mb-4 text-sm sm:text-base">
              {selectedItem.subtitle}
            </p>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Star className="w-4 sm:w-5 h-4 sm:h-5 fill-amber-400 text-amber-400" />
              <span className="text-slate-700 font-semibold text-sm sm:text-base">
                {selectedItem.rating} ({selectedItem.reviews} reviews)
              </span>
            </div>
            <p className="text-sm sm:text-lg text-slate-600 mb-6">
              Experience the next generation of speed, innovation, and design —
              built for performance and style.
            </p>

            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {selectedItem.price}
              </span>
            </div>

            <button
              onClick={() => {
                const stored = JSON.parse(localStorage.getItem("/cart")) || [];
                const existing = stored.find((i) => i.id === selectedItem.id);
                if (existing) existing.quantity += 1;
                else stored.push({ ...selectedItem, quantity: 1 });
                localStorage.setItem("/cart", JSON.stringify(stored));
                window.dispatchEvent(new Event("storage"));
                window.location.href = "/cart";
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:scale-105 transition-all"
            >
              Add to Cart
            </button>

            <div className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-6">
              <div className="flex items-center gap-2 bg-indigo-100 p-3 sm:p-4 rounded-xl shadow-md text-sm sm:text-base">
                <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-indigo-700" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-100 p-3 sm:p-4 rounded-xl shadow-md text-sm sm:text-base">
                <Truck className="w-5 sm:w-6 h-5 sm:h-6 text-purple-700" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-100 p-3 sm:p-4 rounded-xl shadow-md text-sm sm:text-base">
                <Award className="w-5 sm:w-6 h-5 sm:h-6 text-blue-700" />
                <span>Genuine Products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default MobilePage;
