import React, { useState, useEffect } from "react";
import image from "../assets/combo.jpeg";
import image1 from "../assets/teddy.jpeg";
import image2 from "../assets/hamper.jpeg";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Heart,
  Star,
  Gift,
  Sparkles,
  Award,
  Shield,
  Truck,
} from "lucide-react";

const filters = ["All", "Birthday", "Anniversary", "Valentine", "Corporate", "Luxury"];

const giftsData = [
  {
    id: 1,
    name: "Luxury Gift Box",
    subtitle: "Elegant packaging with premium items",
    price: "$129",
    rating: 4.9,
    reviews: 876,
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop",
    badge: "Luxury",
    inStock: true,
  },
  {
    id: 2,
    name: "Flower & Chocolate Combo",
    subtitle: "Perfect for special occasions",
    price: "$79",
    rating: 4.8,
    reviews: 1234,
    img: image,
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 3,
    name: "Personalized Mug",
    subtitle: "Custom printed mugs",
    price: "$25",
    rating: 4.6,
    reviews: 543,
    img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: 4,
    name: "Teddy Bear",
    subtitle: "Soft & cuddly toy gift",
    price: "$45",
    rating: 4.7,
    reviews: 654,
    img: image1,
    inStock: true,
  },
  {
    id: 5,
    name: "Corporate Gift Set",
    subtitle: "Premium pens & accessories",
    price: "$99",
    rating: 4.8,
    reviews: 432,
    img: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=1200&auto=format&fit=crop",
    badge: "Premium",
    inStock: true,
  },
  {
    id: 6,
    name: "Valentine Hamper",
    subtitle: "Roses, chocolates & wine",
    price: "$149",
    rating: 4.9,
    reviews: 987,
    img: image2,
    badge: "Special",
    inStock: true,
  },
];

function GiftsPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGifts, setFilteredGifts] = useState(giftsData);
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
    let filtered = giftsData;

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

    setFilteredGifts(filtered);
  }, [selectedFilter, searchQuery]);

  const toggleFavorite = (id) => {
    const updated = new Set(favorites);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setFavorites(updated);
  };

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    setPage("details");
  };

  const handleBack = () => setPage("main");

  // ---------- MAIN PAGE ----------
  if (page === "main") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 sm:w-80 h-64 sm:h-80 bg-rose-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-32 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-red-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Navbar */}
       <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/60 shadow-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-wrap gap-3">
    <button
      onClick={() => window.history.back()}
      className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
    >
      <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 group-hover:-translate-x-1 transition-transform" />
      <span className="font-medium hidden sm:block">Back</span>
    </button>

    <div className="flex items-center gap-2 sm:gap-4">
      <button className="relative p-2 sm:p-3 rounded-full bg-white/60 border hover:bg-white/80 transition-all shadow-md">
        <Heart className="w-4 sm:w-5 h-4 sm:h-5 text-rose-600" />
        <span className="absolute -top-1 -right-1 w-4 sm:w-5 h-4 sm:h-5 bg-rose-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center">
          {favorites.size}
        </span>
      </button>

      <button
        onClick={() => (window.location.href = "/cart")}
        className="relative p-2 sm:p-3 rounded-full bg-white/60 border hover:bg-white/80 transition-all shadow-md"
      >
        <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5 text-rose-700" />
        <span className="absolute -top-1 -right-1 w-4 sm:w-5 h-4 sm:h-5 bg-rose-600 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center">
          {cartItems.length}
        </span>
      </button>
    </div>
  </div>
</header>


        {/* Hero */}
        <section className="relative z-10 text-center pt-28 sm:pb-12 px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-pink-100 border border-rose-200 mb-6 animate-bounce text-sm sm:text-base">
            <Gift className="w-4 h-4 text-rose-600" />
            <span className="font-semibold text-rose-700">
              Free gift wrapping on all orders!
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-3 sm:mb-4">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 animate-gradient">
              Gifts Collection
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto">
            Thoughtful presents for every celebration 🎁
          </p>

          {/* Search */}
          <div className="mt-8 sm:mt-10 max-w-3xl mx-auto px-2 sm:px-0">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition"></div>
              <div className="relative flex flex-col sm:flex-row items-center gap-3 bg-white/80 backdrop-blur-xl rounded-3xl p-3 shadow-2xl border border-white/60">
                <div className="flex items-center gap-3 w-full">
                  <Search className="w-5 sm:w-6 h-5 sm:h-6 text-slate-400 ml-2 sm:ml-3" />
                  <input
                    type="text"
                    placeholder="Search gifts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-base sm:text-lg placeholder-slate-400 text-slate-800"
                  />
                </div>
                <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-semibold bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg hover:scale-105 transition-all text-sm sm:text-base">
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
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-sm font-semibold transition-all ${
                  selectedFilter === f
                    ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg scale-105"
                    : "bg-white/70 text-slate-700 border border-slate-200 hover:bg-white hover:shadow-md hover:scale-105"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Gifts Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGifts.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/60 shadow-xl hover:-translate-y-2 transition-all"
              >
                {/* Badge */}
                {item.badge && (
                  <div
                    className={`absolute top-3 left-3 sm:top-4 sm:left-4 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-white text-xs font-bold shadow-lg ${
                      item.badge === "Luxury"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600"
                        : item.badge === "Premium"
                        ? "bg-gradient-to-r from-amber-600 to-yellow-600"
                        : item.badge === "Special"
                        ? "bg-gradient-to-r from-red-600 to-rose-600"
                        : "bg-gradient-to-r from-rose-600 to-pink-600"
                    }`}
                  >
                    {item.badge}
                  </div>
                )}

                {/* Favorite */}
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

                {/* Image */}
                <div className="relative overflow-hidden h-64 sm:h-80">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Details */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-semibold text-slate-700">
                      {item.rating}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-400">
                      ({item.reviews} reviews)
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-500 mb-4">
                    {item.subtitle}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
                      {item.price}
                    </span>
                    <button
                      disabled={!item.inStock}
                      onClick={() => handleAddToCart(item)}
                      className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition-all text-sm sm:text-base ${
                        item.inStock
                          ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:scale-105"
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

  // ---------- DETAILS PAGE ----------
  if (page === "details" && selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 p-4 sm:p-10">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 sm:mb-8 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 bg-white/80 rounded-3xl shadow-xl border border-white/60 p-4 sm:p-6 backdrop-blur-xl">
          <img
            src={selectedItem.img}
            alt={selectedItem.name}
            className="rounded-2xl w-full h-64 sm:h-full object-cover"
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
              Make every moment unforgettable with this curated gift designed to
              impress and delight. Perfect for special occasions or luxury gifting.
            </p>

            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
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
                window.location.href = "cart";
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
            >
              Add to Cart
            </button>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex items-center gap-2 bg-rose-100 p-3 sm:p-4 rounded-xl shadow-md">
                <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-rose-700" />
                <span className="text-sm sm:text-base">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 bg-pink-100 p-3 sm:p-4 rounded-xl shadow-md">
                <Truck className="w-5 sm:w-6 h-5 sm:h-6 text-pink-700" />
                <span className="text-sm sm:text-base">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-red-100 p-3 sm:p-4 rounded-xl shadow-md">
                <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-red-700" />
                <span className="text-sm sm:text-base">Luxury Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default GiftsPage;
