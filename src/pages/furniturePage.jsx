import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Heart,
  Star,
  Home,
  Shield,
  Truck,
  Zap,
} from "lucide-react";

const categories = ["All", "Living Room", "Bedroom", "Office", "Outdoor", "Decor"];

const furnitureItems = [
  {
    id: 1,
    name: "Modern Sofa",
    subtitle: "Comfortable & Stylish",
    price: "$899",
    rating: 4.8,
    reviews: 432,
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 2,
    name: "Dining Table Set",
    subtitle: "Elegant Wooden Set",
    price: "$699",
    rating: 4.7,
    reviews: 287,
    img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop",
    badge: "Premium",
    inStock: true,
  },
  {
    id: 3,
    name: "Office Chair",
    subtitle: "Ergonomic & Comfortable",
    price: "$199",
    rating: 4.6,
    reviews: 654,
    img: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: 4,
    name: "Bookshelf",
    subtitle: "Spacious & Modern",
    price: "$299",
    rating: 4.7,
    reviews: 321,
    img: "https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=1200&auto=format&fit=crop",
    badge: "New",
    inStock: true,
  },
  {
    id: 5,
    name: "Outdoor Chair",
    subtitle: "Durable & Stylish",
    price: "$149",
    rating: 4.5,
    reviews: 198,
    img: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?q=80&w=1200&auto=format&fit=crop",
    inStock: false,
  },
  {
    id: 6,
    name: "Coffee Table",
    subtitle: "Minimalist Design",
    price: "$179",
    rating: 4.8,
    reviews: 543,
    img: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
  },
];

function FurniturePage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFurniture, setFilteredFurniture] = useState(furnitureItems);
  const [page, setPage] = useState("main"); // "main" | "details"
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
    let filtered = furnitureItems;
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
    setFilteredFurniture(filtered);
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
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-slate-50 to-zinc-50 relative overflow-hidden">
        {/* Background Blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-48 h-48 sm:w-80 sm:h-80 bg-stone-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-48 h-48 sm:w-80 sm:h-80 bg-slate-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-32 left-1/3 w-64 h-64 sm:w-96 sm:h-96 bg-zinc-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/60 shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-wrap gap-3">
    <button
      onClick={() => window.history.back()}
      className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-stone-700 to-slate-700 text-white shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
    >
      <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="font-medium hidden sm:block">Back</span>
    </button>

    <div className="flex items-center gap-2 sm:gap-4">
      <button className="relative p-2 sm:p-3 rounded-full bg-white/60 border hover:bg-white/80 transition-all shadow-md">
        <Heart className="w-4 sm:w-5 h-4 sm:h-5 text-rose-600" />
        <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-rose-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center">
          {favorites.size}
        </span>
      </button>

      <button
        onClick={() => (window.location.href = "/cart")}
        className="relative p-2 sm:p-3 rounded-full bg-white/60 border hover:bg-white/80 transition-all shadow-md"
      >
        <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5 text-stone-700" />
        <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-stone-700 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center">
          {cartItems.length}
        </span>
      </button>
    </div>
  </div>
</header>


        {/* Hero */}
        <section className="relative z-10 text-center pt-28 sm:pb-12 px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-stone-100 to-slate-100 border border-stone-200 mb-4 sm:mb-6 animate-bounce text-xs sm:text-sm">
            <Home className="w-4 h-4 text-stone-700" />
            <span className="font-semibold text-stone-700">
              Free delivery on furniture orders over $500!
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight mb-3 sm:mb-4 leading-tight">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-stone-700 via-slate-700 to-zinc-700">
              Furniture Collection
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto">
            Transform your space with elegant design 🛋️
          </p>

          {/* Search Bar */}
          <div className="mt-8 sm:mt-10 max-w-3xl mx-auto w-full px-2 sm:px-0">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-stone-600 via-slate-600 to-zinc-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition"></div>
              <div className="relative flex flex-col sm:flex-row items-center gap-3 bg-white/80 backdrop-blur-xl rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/60">
                <div className="flex items-center w-full">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 ml-2 sm:ml-3" />
                  <input
                    type="text"
                    placeholder="Search sofa, table, chair..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm sm:text-lg placeholder-slate-400 text-slate-800 px-2 sm:px-3"
                  />
                </div>
                <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-semibold bg-gradient-to-r from-stone-700 to-slate-700 text-white shadow-lg hover:scale-105 transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  selectedFilter === cat
                    ? "bg-gradient-to-r from-stone-700 to-slate-700 text-white shadow-lg scale-105"
                    : "bg-white/70 text-slate-700 border border-slate-200 hover:bg-white hover:shadow-md hover:scale-105"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFurniture.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/60 shadow-xl hover:-translate-y-2 transition-all"
              >
                {item.badge && (
                  <div
                    className={`absolute top-3 sm:top-4 left-3 sm:left-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-white text-[10px] sm:text-xs font-bold shadow-lg ${
                      item.badge === "Premium"
                        ? "bg-gradient-to-r from-amber-600 to-yellow-600"
                        : item.badge === "New"
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600"
                        : "bg-gradient-to-r from-stone-700 to-slate-700"
                    }`}
                  >
                    {item.badge}
                  </div>
                )}

                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 p-2 sm:p-2.5 rounded-full bg-white/90 shadow-lg hover:scale-110 transition-all"
                >
                  <Heart
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      favorites.has(item.id)
                        ? "fill-rose-500 text-rose-500"
                        : "text-slate-400"
                    }`}
                  />
                </button>

                <div className="relative overflow-hidden h-60 sm:h-72 md:h-80">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="bg-red-600 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-xs sm:text-sm">
                        OUT OF STOCK
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">
                      {item.rating}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-400">
                      ({item.reviews} reviews)
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-slate-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base mb-3 sm:mb-4">
                    {item.subtitle}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-slate-700">
                      {item.price}
                    </span>
                    <button
                      disabled={!item.inStock}
                      onClick={() => handleAddToCart(item)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold shadow-lg flex items-center gap-1.5 sm:gap-2 transition-all ${
                        item.inStock
                          ? "bg-gradient-to-r from-stone-700 to-slate-700 text-white hover:scale-105"
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
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-slate-50 to-zinc-50 p-4 sm:p-8 md:p-10">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 sm:mb-8 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-stone-700 to-slate-700 text-white shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 bg-white/80 rounded-3xl shadow-xl border border-white/60 p-4 sm:p-6 md:p-8 backdrop-blur-xl">
          <img
            src={selectedItem.img}
            alt={selectedItem.name}
            className="rounded-2xl w-full h-64 sm:h-80 md:h-full object-cover"
          />

          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              {selectedItem.name}
            </h1>
            <p className="text-slate-500 mb-4 text-sm sm:text-base">
              {selectedItem.subtitle}
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
              <span className="text-slate-700 font-semibold text-sm sm:text-base">
                {selectedItem.rating} ({selectedItem.reviews} reviews)
              </span>
            </div>
            <p className="text-sm sm:text-lg text-slate-600 mb-4 sm:mb-6">
              Crafted with precision and care to bring timeless elegance and comfort to your home.
            </p>
            <span className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-slate-700">
              {selectedItem.price}
            </span>

            <button
              onClick={() => {
                const stored = JSON.parse(localStorage.getItem("/cart")) || [];
                const existing = stored.find((i) => i.id === selectedItem.id);
                if (existing) existing.quantity += 1;
                else stored.push({ ...selectedItem, quantity: 1 });
                localStorage.setItem("/cart", JSON.stringify(stored));
                window.dispatchEvent(new Event("storage"));
                window.location.href = "cart";
              }}
              className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold bg-gradient-to-r from-stone-700 to-slate-700 text-white shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
            >
              Add to Cart
            </button>

            <div className="mt-8 sm:mt-10 flex flex-wrap gap-4 sm:gap-6">
              <div className="flex items-center gap-2 bg-stone-100 p-3 sm:p-4 rounded-xl shadow-md text-sm sm:text-base">
                <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-stone-700" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 p-3 sm:p-4 rounded-xl shadow-md text-sm sm:text-base">
                <Truck className="w-5 sm:w-6 h-5 sm:h-6 text-slate-700" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-100 p-3 sm:p-4 rounded-xl shadow-md text-sm sm:text-base">
                <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-zinc-700" />
                <span>Quality Assured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default FurniturePage;
