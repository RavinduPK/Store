import React, { useState, useEffect } from "react";
import Image from "../assets/pizza.jpeg";
import Image1 from "../assets/ice2.jpeg";
import Image2 from "../assets/pazta.jpeg";
import Image3 from "../assets/noodles1.jpeg";
import {
  ArrowLeft,
  Search,
  ShoppingCart,
  Heart,
  Star,
  Flame,
  TrendingUp,
  Zap,
} from "lucide-react";

const filters = ["All", "Fast Food", "Snacks", "Healthy", "Desserts", "Drinks"];

const foods = [
  {
    id: 1,
    name: "Cheese Burger",
    subtitle: "Fast Food",
    price: "$5.99",
    rating: 4.8,
    reviews: 342,
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: 2,
    name: "Pizza Slice",
    subtitle: "Fast Food",
    price: "$3.50",
    rating: 4.7,
    reviews: 289,
    img: Image,
    badge: "Popular",
    inStock: true,
  },
  {
    id: 3,
    name: "Fruit Bowl",
    subtitle: "Healthy",
    price: "$4.25",
    rating: 4.9,
    reviews: 456,
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: 4,
    name: "Chocolate Cake",
    subtitle: "Dessert",
    price: "$6.50",
    rating: 4.8,
    reviews: 521,
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop",
    badge: "Premium",
    inStock: true,
  },
  {
    id: 5,
    name: "Pasta",
    subtitle: "Fast Food",
    price: "$2.75",
    rating: 4.6,
    reviews: 198,
    img: Image2,
    inStock: true,
  },
  {
    id: 6,
    name: "Noodle Soup",
    subtitle: "Snacks",
    price: "$3.20",
    rating: 4.7,
    reviews: 267,
    img: Image3,
    inStock: true,
  },
];

function FoodsPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState("main");
  const [selectedFood, setSelectedFood] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("foodsCart")) || [];
    setCartItems(storedCart);
  }, []);

  const toggleFavorite = (id) => {
    const newFav = new Set(favorites);
    newFav.has(id) ? newFav.delete(id) : newFav.add(id);
    setFavorites(newFav);
  };

  const handleAddToCartClick = (food) => {
    setSelectedFood(food);
    setPage("details");
  };

  const handleAddToCartFromDetails = () => {
    const storedCart = JSON.parse(localStorage.getItem("foodsCart")) || [];
    const existingIndex = storedCart.findIndex((i) => i.id === selectedFood.id);
    if (existingIndex !== -1) {
      storedCart[existingIndex].quantity += 1;
    } else {
      storedCart.push({ ...selectedFood, quantity: 1 });
    }
    localStorage.setItem("foodsCart", JSON.stringify(storedCart));
    setCartItems(storedCart);
    setPage("cart");
  };

  const handleBack = () => setPage("main");

  const filteredFoods = foods
    .filter((f) =>
      selectedFilter === "All"
        ? true
        : f.subtitle.toLowerCase().includes(selectedFilter.toLowerCase())
    )
    .filter((f) =>
      searchQuery.trim() === ""
        ? true
        : f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // ---------------- MAIN PAGE ----------------
  if (page === "main") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
        {/* Header */}
        <nav className="bg-white/40 backdrop-blur-lg shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-rose-600 to-orange-600 text-white font-semibold shadow-lg hover:scale-105 transition text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" /> Back
            </button>
            <div className="flex gap-3 sm:gap-4">
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
        </nav>

        {/* Hero Section */}
        <section className="text-center py-8 sm:py-10 px-4 sm:px-6">
          <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-600">
            Delicious Foods
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-2">
            Tasty, fresh, and irresistible meals for every mood 🍔
          </p>

          {/* Search */}
          <div className="mt-6 max-w-xl mx-auto flex items-center gap-3 bg-white p-2 sm:p-3 rounded-full shadow">
            <Search className="w-4 sm:w-5 h-4 sm:h-5 text-slate-400 ml-2 sm:ml-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search foods..."
              className="flex-1 outline-none bg-transparent text-slate-700 text-sm sm:text-base"
            />
          </div>

          {/* Filters */}
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold transition text-sm sm:text-base ${
                  selectedFilter === f
                    ? "bg-gradient-to-r from-rose-600 to-orange-600 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:shadow"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          {filteredFoods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition p-3 sm:p-4 relative"
            >
              {food.badge && (
                <span className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gradient-to-r from-rose-600 to-orange-600 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
                  {food.badge}
                </span>
              )}
              <button
                onClick={() => toggleFavorite(food.id)}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/80 rounded-full p-1.5 sm:p-2 shadow hover:scale-110 transition"
              >
                <Heart
                  className={`w-4 sm:w-5 h-4 sm:h-5 ${
                    favorites.has(food.id)
                      ? "fill-rose-500 text-rose-500"
                      : "text-slate-400"
                  }`}
                />
              </button>

              <img
                src={food.img}
                alt={food.name}
                className="w-full h-56 sm:h-72 object-cover rounded-xl sm:rounded-2xl"
              />

              <div className="mt-3 sm:mt-4">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                  {food.name}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm">
                  {food.subtitle}
                </p>
                <div className="flex justify-between items-center mt-2 sm:mt-3">
                  <span className="text-xl sm:text-2xl font-bold text-rose-600">
                    {food.price}
                  </span>
                  <button
                    onClick={() => handleAddToCartClick(food)}
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white font-medium bg-gradient-to-r from-rose-600 to-orange-600 hover:scale-105 transition text-sm sm:text-base"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add
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
  if (page === "details" && selectedFood) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 p-4 sm:p-10">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 sm:mb-8 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-rose-600 to-orange-600 text-white shadow-lg hover:scale-105 transition text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6">
          <img
            src={selectedFood.img}
            alt={selectedFood.name}
            className="rounded-xl sm:rounded-2xl w-full h-64 sm:h-full object-cover"
          />
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-800">
              {selectedFood.name}
            </h1>
            <p className="text-slate-500 mb-2 sm:mb-4 text-sm sm:text-base">
              {selectedFood.subtitle}
            </p>
            <p className="text-sm sm:text-lg text-slate-600 mb-4 sm:mb-6 leading-relaxed">
              Delicious and fresh, perfect to satisfy your cravings. Enjoy our
              premium foods with quality ingredients.
            </p>
            <div className="flex gap-2 sm:gap-3 items-center mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl font-bold text-rose-600">
                {selectedFood.price}
              </span>
            </div>
            <button
              onClick={() => {
                if (!selectedFood.inStock) return;
                const storedCart =
                  JSON.parse(localStorage.getItem("/cart")) || [];
                const existingItemIndex = storedCart.findIndex(
                  (item) => item.id === selectedFood.id
                );
                if (existingItemIndex !== -1) {
                  storedCart[existingItemIndex].quantity += 1;
                } else {
                  storedCart.push({ ...selectedFood, quantity: 1 });
                }
                localStorage.setItem("/cart", JSON.stringify(storedCart));
                window.dispatchEvent(new Event("storage"));
                window.location.href = "/cart";
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all text-sm sm:text-base"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- CART PAGE ----------------
  if (page === "cart") {
    return (
      <div className="min-h-screen p-4 sm:p-10 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 mb-6 sm:mb-8 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-rose-600 to-orange-600 text-white shadow-lg hover:scale-105 transition text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" /> Back
        </button>
        <h1 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">
          Your Cart
        </h1>
        <div className="space-y-4 sm:space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg gap-4 sm:gap-0"
            >
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg sm:rounded-xl"
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

export default FoodsPage;
