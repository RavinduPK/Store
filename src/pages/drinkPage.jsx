import React, { useState, useEffect } from "react";
import Image from "../assets/juice.jpeg";
import Image2 from "../assets/coffee.jpeg";
import Image3 from "../assets/cola.jpeg";
import Image4 from "../assets/green.jpeg";
import Image5 from "../assets/energy.jpeg";
import Image6 from "../assets/lemonade.jpeg";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Heart,
  Star,
  Zap,
  Truck,
} from "lucide-react";

const filters = [
  "All",
  "Soft Drinks",
  "Juices",
  "Energy Drinks",
  "Alcoholic",
  "Hot Beverages",
];

const drinks = [
  {
    id: 1,
    name: "Orange Juice",
    subtitle: "Freshly Squeezed",
    price: "$4.99",
    rating: 4.7,
    reviews: 543,
    img: Image,
    badge: "Fresh",
    inStock: true,
  },
  {
    id: 2,
    name: "Coffee Latte",
    subtitle: "Hot Beverage",
    price: "$3.50",
    rating: 4.8,
    reviews: 1234,
    img: Image2,
    badge: "Popular",
    inStock: true,
  },
  {
    id: 3,
    name: "Cola",
    subtitle: "Soft Drink",
    price: "$2.50",
    rating: 4.5,
    reviews: 876,
    img: Image3,
    inStock: true,
  },
  {
    id: 4,
    name: "Green Tea",
    subtitle: "Hot Beverage",
    price: "$3.00",
    rating: 4.6,
    reviews: 432,
    img: Image4,
    badge: "Healthy",
    inStock: true,
  },
  {
    id: 5,
    name: "Energy Drink",
    subtitle: "Boost Your Day",
    price: "$5.00",
    rating: 4.7,
    reviews: 765,
    img: Image5,
    badge: "Energy",
    inStock: true,
  },
  {
    id: 6,
    name: "Lemonade",
    subtitle: "Refreshing Drink",
    price: "$3.75",
    rating: 4.8,
    reviews: 654,
    img: Image6,
    inStock: true,
  },
];

function DrinkPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState("main");
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("drinksCart")) || [];
    setCartItems(storedCart);
  }, []);

  const toggleFavorite = (id) => {
    const newFav = new Set(favorites);
    newFav.has(id) ? newFav.delete(id) : newFav.add(id);
    setFavorites(newFav);
  };

  const handleAddToCartClick = (drink) => {
    setSelectedDrink(drink);
    setPage("details");
  };

  const handleBack = () => setPage("main");

  const filteredDrinks = drinks
    .filter((d) =>
      selectedFilter === "All"
        ? true
        : d.subtitle.toLowerCase().includes(selectedFilter.toLowerCase())
    )
    .filter((d) =>
      searchQuery.trim() === ""
        ? true
        : d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // ---------------- MAIN PAGE ----------------
  if (page === "main") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
        {/* Header */}
        <nav className="bg-white/40 backdrop-blur-lg shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition"
            >
              <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="flex gap-3 sm:gap-4">
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
                <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5 text-stone-700" />
                <span className="absolute -top-1 -right-1 w-4 sm:w-5 h-4 sm:h-5 bg-stone-700 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero & Filters */}
        <section className="text-center py-8 sm:py-10 px-4 sm:px-6">
          <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">
            Drinks Collection
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-2">
            Refreshing beverages for every moment 🍹
          </p>

          {/* Filters */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition ${
                  selectedFilter === f
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:shadow"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="mt-6 max-w-xl mx-auto flex items-center gap-2 sm:gap-3 bg-white p-2 sm:p-3 rounded-full shadow">
            <Search className="w-4 sm:w-5 h-4 sm:h-5 text-slate-400 ml-2 sm:ml-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drinks..."
              className="flex-1 outline-none bg-transparent text-slate-700 text-sm sm:text-base"
            />
          </div>
        </section>

        {/* Drinks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          {filteredDrinks.map((drink) => (
            <div
              key={drink.id}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition p-3 sm:p-4 relative"
            >
              {drink.badge && (
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full">
                  {drink.badge}
                </span>
              )}

              <button
                onClick={() => toggleFavorite(drink.id)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/80 rounded-full p-2 shadow hover:scale-110 transition"
              >
                <Heart
                  className={`w-4 sm:w-5 h-4 sm:h-5 ${
                    favorites.has(drink.id)
                      ? "fill-rose-500 text-rose-500"
                      : "text-slate-400"
                  }`}
                />
              </button>

              <img
                src={drink.img}
                alt={drink.name}
                className="w-full h-56 sm:h-72 object-cover rounded-2xl mt-4"
              />

              <div className="mt-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                  {drink.name}
                </h3>
                <p className="text-slate-500 text-sm">{drink.subtitle}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xl sm:text-2xl font-bold text-cyan-600">
                    {drink.price}
                  </span>
                  <button
                    disabled={!drink.inStock}
                    onClick={() => handleAddToCartClick(drink)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base text-white font-medium ${
                      drink.inStock
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 transition"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4 inline mr-1" /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------------- DETAILS PAGE ----------------
  if (page === "details" && selectedDrink) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 p-4 sm:p-10">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 sm:mb-8 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg hover:scale-105 transition"
        >
          <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" /> Back
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 bg-white/80 rounded-3xl shadow-xl p-4 sm:p-6">
          <img
            src={selectedDrink.img}
            alt={selectedDrink.name}
            className="w-full h-64 sm:h-full object-cover rounded-2xl"
          />
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-2">
              {selectedDrink.name}
            </h1>
            <p className="text-slate-500 mb-4 text-sm sm:text-base">
              {selectedDrink.subtitle}
            </p>
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-4 sm:w-5 h-4 sm:h-5 fill-amber-400 text-amber-400" />
              <span className="text-slate-700 font-semibold text-sm sm:text-base">
                {selectedDrink.rating} ({selectedDrink.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl sm:text-3xl font-bold text-cyan-600">
                {selectedDrink.price}
              </span>
            </div>
            <button
              onClick={() => {
                if (!selectedDrink.inStock) return;
                const storedCart =
                  JSON.parse(localStorage.getItem("/cart")) || [];
                const existingItemIndex = storedCart.findIndex(
                  (item) => item.id === selectedDrink.id
                );
                if (existingItemIndex !== -1) {
                  storedCart[existingItemIndex].quantity += 1;
                } else {
                  storedCart.push({ ...selectedDrink, quantity: 1 });
                }
                localStorage.setItem("/cart", JSON.stringify(storedCart));
                window.dispatchEvent(new Event("storage"));
                window.location.href = "cart";
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Add to Cart
            </button>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex items-center gap-2 bg-cyan-100 p-3 sm:p-4 rounded-xl shadow-md">
                <Truck className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-600" />
                <span className="text-slate-700 font-medium text-sm sm:text-base">
                  Secure Payment
                </span>
              </div>
              <div className="flex items-center gap-2 bg-blue-100 p-3 sm:p-4 rounded-xl shadow-md">
                <Truck className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                <span className="text-slate-700 font-medium text-sm sm:text-base">
                  Fast Delivery
                </span>
              </div>
              <div className="flex items-center gap-2 bg-purple-100 p-3 sm:p-4 rounded-xl shadow-md">
                <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600" />
                <span className="text-slate-700 font-medium text-sm sm:text-base">
                  Quality Guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- CART PAGE ----------------
  if (page === "cart") {
    return (
      <div className="min-h-screen p-4 sm:p-10 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 sm:mb-8 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg hover:scale-105 transition"
        >
          <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" /> Back
        </button>
        <h1 className="text-2xl sm:text-4xl font-bold mb-6">Your Cart</h1>
        <div className="space-y-4 sm:space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 bg-white/80 rounded-2xl shadow-lg gap-4 sm:gap-0"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl"
                />
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">{item.name}</h2>
                  <p className="text-slate-500 text-sm sm:text-base">
                    {item.subtitle}
                  </p>
                  <p className="text-slate-700 font-semibold text-sm sm:text-base">
                    {item.price} × {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default DrinkPage;
