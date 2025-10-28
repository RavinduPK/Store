import React, { useState, useEffect } from "react";
import image from "../assets/pan.jpeg";
import image1 from "../assets/blender.jpeg";
import image2 from "../assets/knife.jpeg";
import image3 from "../assets/air.jpeg";
import image4 from "../assets/kettle.jpeg";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Heart,
  Star,
  Flame,
  TrendingUp,
  Award,
  Truck,
  Shield,
} from "lucide-react";

const filters = ["All", "Cookware", "Appliances", "Cutlery", "Storage"];

const kitchenItems = [
  {
    id: 1,
    name: "Non-Stick Frying Pan",
    subtitle: "Premium Ceramic Coating · 28cm",
    price: "$45",
    rating: 4.7,
    reviews: 342,
    img: image,
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 2,
    name: "Blender Pro",
    subtitle: "High Speed · 1500W Motor",
    price: "$129",
    rating: 4.9,
    reviews: 567,
    img: image1,
    badge: "Premium",
    inStock: true,
  },
  {
    id: 3,
    name: "Chef's Knife Set",
    subtitle: "Stainless Steel · 6 Pieces",
    price: "$89",
    rating: 4.8,
    reviews: 421,
    img: image2,
    inStock: true,
  },
  {
    id: 4,
    name: "Air Fryer XL",
    subtitle: "5L · Oil-Free Healthy Cooking",
    price: "$159",
    rating: 4.9,
    reviews: 892,
    img: image3,
    badge: "Hot",
    inStock: true,
  },
  {
    id: 5,
    name: "Glass Storage Jars",
    subtitle: "Airtight · Set of 6",
    price: "$35",
    rating: 4.6,
    reviews: 234,
    img: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: 6,
    name: "Hot water Kettle",
    subtitle: "Programmable · 12 Cups",
    price: "$99",
    rating: 4.7,
    reviews: 456,
    img: image4,
    inStock: true,
  },
];

function KitchenPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(kitchenItems);
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
    let filtered = kitchenItems;
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
    setFilteredItems(filtered);
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
        {/* BG Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-4 sm:left-10 w-60 sm:w-80 h-60 sm:h-80 bg-orange-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-36 right-4 sm:right-10 w-60 sm:w-80 h-60 sm:h-80 bg-rose-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-28 left-1/4 sm:left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-amber-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Header */}
       <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/60 shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-wrap gap-3">
    <button
      onClick={() => window.history.back()}
      className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
    >
      <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="font-medium hidden sm:block">Back</span>
    </button>

    <div className="flex items-center gap-2 sm:gap-4">
      <button className="relative p-2 sm:p-3 rounded-full bg-white/60 border hover:bg-white/80 transition-all shadow-md">
        <Heart className="w-5 h-5 text-rose-600" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
          {favorites.size}
        </span>
      </button>

      <button
        onClick={() => (window.location.href = "/cart")}
        className="relative p-2 sm:p-3 rounded-full bg-white/60 border hover:bg-white/80 transition-all shadow-md"
      >
        <ShoppingCart className="w-5 h-5 text-orange-700" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-xs rounded-full flex items-center justify-center">
          {cartItems.length}
        </span>
      </button>
    </div>
  </div>
</header>


        {/* Hero Section */}
        <section className="relative z-10 text-center pt-28 sm:pb-12 px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-orange-100 to-rose-100 border border-orange-200 mb-6 animate-bounce text-sm sm:text-base">
            <Flame className="w-4 h-4 text-orange-600" />
            <span className="font-semibold text-orange-700">
              Flash Sale — Up to 40% off kitchen must-haves!
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 animate-gradient">
              Kitchen Essentials
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto">
            Cook smarter, faster, and better 🍳
          </p>

          {/* Search Bar */}
          <div className="mt-6 sm:mt-10 max-w-3xl mx-auto">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition"></div>
              <div className="relative flex flex-col sm:flex-row items-center gap-3 bg-white/80 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border border-white/60">
                <Search className="w-6 h-6 text-slate-400 ml-1 sm:ml-3" />
                <input
                  type="text"
                  placeholder="Search for pans, blenders, knives..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-base sm:text-lg placeholder-slate-400 text-slate-800"
                />
                <button className="mt-2 sm:mt-0 px-6 sm:px-8 py-2 sm:py-3 rounded-2xl font-semibold bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-lg hover:scale-105 transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 justify-center">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                  selectedFilter === f
                    ? "bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-lg scale-105"
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
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/60 shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300"
              >
                {item.badge && (
                  <div
                    className={`absolute top-4 left-4 px-3 sm:px-4 py-1.5 rounded-full text-white text-xs sm:text-sm font-bold shadow-lg ${
                      item.badge === "Premium"
                        ? "bg-gradient-to-r from-amber-600 to-yellow-600"
                        : item.badge === "Hot"
                        ? "bg-gradient-to-r from-red-600 to-orange-600"
                        : "bg-gradient-to-r from-orange-600 to-rose-600"
                    }`}
                  >
                    {item.badge === "Hot" && (
                      <Flame className="w-3 h-3 inline mr-1" />
                    )}
                    {item.badge === "Bestseller" && (
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                    )}
                    {item.badge}
                  </div>
                )}

                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 shadow-lg hover:scale-110 transition-all duration-300"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.has(item.id)
                        ? "fill-rose-500 text-rose-500"
                        : "text-slate-400"
                    }`}
                  />
                </button>

                <div className="relative overflow-hidden h-64 sm:h-72 md:h-80">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm sm:text-base font-semibold text-slate-700">
                      {item.rating}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-400">
                      ({item.reviews} reviews)
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-500 mb-3 sm:mb-4">
                    {item.subtitle}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
                    <span className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">
                      {item.price}
                    </span>
                    <button
                      disabled={!item.inStock}
                      onClick={() => handleAddToCart(item)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition-all duration-300 ${
                        item.inStock
                          ? "bg-gradient-to-r from-orange-600 to-rose-600 text-white hover:scale-105"
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
    );
  }

  // ---------------- DETAILS PAGE ----------------
  if (page === "details" && selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4 sm:p-10">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 sm:mb-8 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-lg hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 bg-white/80 rounded-3xl shadow-xl border border-white/60 p-4 sm:p-6 md:p-10 backdrop-blur-xl">
          <img
            src={selectedItem.img}
            alt={selectedItem.name}
            className="rounded-2xl w-full h-64 sm:h-80 md:h-full object-cover"
          />

          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              {selectedItem.name}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-500 mb-4">
              {selectedItem.subtitle}
            </p>
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-sm sm:text-base text-slate-700 font-semibold">
                {selectedItem.rating} ({selectedItem.reviews} reviews)
              </span>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-4 sm:mb-6">
              Crafted for everyday chefs, this premium kitchen essential combines
              durability, performance, and style for perfect results every time.
            </p>

            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="text-2xl sm:text-3xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">
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
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-lg hover:scale-105 transition-all mb-6 sm:mb-8"
            >
              Add to Cart
            </button>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex items-center gap-2 bg-orange-100 p-3 sm:p-4 rounded-xl shadow-md">
                <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-orange-700" />
                <span className="text-sm sm:text-base">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 bg-rose-100 p-3 sm:p-4 rounded-xl shadow-md">
                <Truck className="w-5 sm:w-6 h-5 sm:h-6 text-rose-700" />
                <span className="text-sm sm:text-base">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-amber-100 p-3 sm:p-4 rounded-xl shadow-md">
                <Award className="w-5 sm:w-6 h-5 sm:h-6 text-amber-700" />
                <span className="text-sm sm:text-base">Top Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default KitchenPage;
