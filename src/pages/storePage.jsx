import React, { useEffect, useState } from 'react';
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // ✅ Navigation

const categories = [
  { 
    name: "Foods", 
    image: "https://www.precisionorthomd.com/wp-content/uploads/2023/10/percision-blog-header-junk-food-102323.jpg", 
    link: "/foods",
    description: "Fresh & delicious",
    color: "from-orange-500 to-red-500",
    path : "/foods"
  },
  { 
    name: "Drinks", 
    image: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-802667754.jpg?c=original", 
    link: "/drinks",
    description: "Refreshing beverages",
    color: "from-blue-500 to-cyan-500",
    path : "/drinks"
  },
  { 
    name: "Clothes", 
    image: "https://www.shutterstock.com/image-photo/fashionable-clothes-boutique-store-london-600nw-589577570.jpg", 
    link: "/clothes",
    description: "Latest fashion trends",
    color: "from-pink-500 to-purple-500",
    path : "/clothes"
  },
  { 
    name: "Electronics", 
    image: "https://media.istockphoto.com/id/1174598609/photo/set-of-contemporary-house-appliances-isolated-on-white.jpg?s=612x612&w=0&k=20&c=bBMILbCpLkhIxbL7sAAXaFOaFaSXFCt80ccHgl7iiWM=", 
    link: "/electronics",
    description: "Smart technology",
    color: "from-indigo-200 to-blue-500",
    path : "/electronics"
  },
  { 
    name: "Books", 
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794", 
    link: "/books",
    description: "Knowledge & stories",
    color: "from-green-500 to-emerald-600",
    path : "/books"
  },
  { 
    name: "Mobiles", 
    image: "https://www.dennemeyer.com/fileadmin/a/blog/Everyday_IP_Spreading_the_word_about_mobile_phones/Everyday-IP_Spreading-the-word-about-mobile-phones_12.jpg", 
    link: "/mobiles",
    description: "Latest smartphones",
    color: "from-purple-300 to-purple-500",
    path : "/mobiles"
  },
  { 
    name: "Kitchen Items", 
    image: "https://t3.ftcdn.net/jpg/00/63/25/12/360_F_63251258_XMxdxQWrRiv3eY4VatQY5iDwV7lrOiPm.jpg", 
    link: "/kitchen-items",
    description: "Cooking essentials",
    color: "from-yellow-500 to-orange-500",
    path : "/kitchen-items"
  },
  { 
    name: "Toys", 
    image: "https://www.yorwaste.co.uk/wp-content/uploads/2024/08/shutterstock_436617280-scaled-optimised.jpg", 
    link: "/toys",
    description: "Fun for all ages",
    color: "from-purple-500 to-pink-500",
    path : "/toys"
  },
  { 
    name: "Furniture", 
    image: "https://i.pinimg.com/564x/5f/c7/6d/5fc76df6bda7762fe219ed48a724e69d.jpg", 
    link: "/furniture",
    description: "Comfort & style",
    color: "from-amber-600 to-orange-600",
    path : "/furniture"
  },
  { 
    name: "Tool Kit", 
    image: "https://hi-spec.com/cdn/shop/articles/aeqkmval_800x800.png?v=1719995369", 
    link: "/tool-kit",
    description: "DIY essentials",
     color: "from-purple-200 to-purple-400",
      path : "/tool-kit"
  },
  { 
    name: "Gift Items", 
    image: "https://images.squarespace-cdn.com/content/v1/6100ae408f395b33971e81aa/1732746095209-H6CXXFLL7W7AZKZDUAWI/Cordner+Advisory+Img+3+%27When+a+Gift+is+Not+a+Gift%27.jpg", 
    link: "/gift-item",
    description: "Perfect presents",
    color: "from-rose-500 to-pink-600",
    path : "/gift-item"
  },
  { 
    name: "Flowers", 
    image: "https://www.madlen.pl/wp-content/uploads/IMG_2618-scaled.jpeg", 
    link: "/flowers",
    description: "Fresh blooms",
    color: "from-emerald-500 to-green-600",
    path : "/flowers"
  }
];

function StorePage() {
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); //  React Router navigation

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("/cart")) || [];
    setCartCount(cart.length);
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Header */}
     <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 animate-slide-down">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Animated Logo */}
      <div className="flex items-center space-x-3 group cursor-pointer animate-fade-in">
        <div className="relative">
          {/* Rotating gradient border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl opacity-75 group-hover:opacity-100 blur animate-spin-slow"></div>
          
          {/* Logo container */}
          <div className="relative w-12 h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 animate-float">
            <span className="text-white font-black text-lg group-hover:scale-110 transition-transform duration-300">
              RK
            </span>
          </div>
          
          {/* Pulse effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity blur-md animate-pulse-slow"></div>
        </div>
        
        <div className="animate-fade-in animation-delay-100">
          <span className="text-2xl font-black bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_100%]">
            RK Stores
          </span>
          <div
            onClick={() => navigate("/dashboard")}
            className="text-xs text-blue-600 font-medium hover:text-indigo-600 transition-colors cursor-pointer group-hover:translate-x-1 transform duration-300"
          >
            Premium Collection 
          </div>
        </div>
      </div>

      {/* Animated Search Bar */}
      <div className="hidden md:flex flex-1 max-w-lg mx-8 animate-fade-in animation-delay-200">
        <div className="relative w-full group">
          {/* Animated gradient border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-500"></div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-100/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all duration-300 focus:scale-[1.02] hover:border-indigo-300"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 group-focus-within:scale-110 group-focus-within:rotate-12 transition-transform duration-300">
                🔍
              </span>
            </div>
            
            {/* Typing indicator */}
            {searchTerm && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center animate-fade-in">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce-dot"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce-dot animation-delay-100"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce-dot animation-delay-200"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animated Cart Button */}
      <button
        className="relative group p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 overflow-hidden animate-fade-in animation-delay-300"
        onClick={() => navigate("/cart")}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        
        {/* Icon with bounce on hover */}
        <IoCartOutline className="w-6 h-6 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
        
        {/* Badge with animations */}
        {cartCount.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-bounce-in group-hover:scale-125 transition-transform duration-300">
            <span className="animate-number-pop">{cartCount}</span>
          </span>
        )}
        
        {/* Ripple effect on hover */}
        <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500"></span>
      </button>
    </div>
  </div>

  <style jsx>{`
    @keyframes slide-down {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-5px);
      }
    }

    @keyframes spin-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes pulse-slow {
      0%, 100% {
        opacity: 0.3;
      }
      50% {
        opacity: 0.1;
      }
    }

    @keyframes text-shimmer {
      0% {
        background-position: -200% center;
      }
      100% {
        background-position: 200% center;
      }
    }

    @keyframes bounce-in {
      0% {
        transform: scale(0) rotate(-180deg);
        opacity: 0;
      }
      50% {
        transform: scale(1.2) rotate(10deg);
      }
      100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
    }

    @keyframes number-pop {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
    }

    @keyframes bounce-dot {
      0%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-8px);
      }
    }

    .animate-slide-down {
      animation: slide-down 0.5s ease-out;
    }

    .animate-fade-in {
      animation: fade-in 0.6s ease-out forwards;
      opacity: 0;
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    .animate-spin-slow {
      animation: spin-slow 3s linear infinite;
    }

    .animate-pulse-slow {
      animation: pulse-slow 2s ease-in-out infinite;
    }

    .animate-text-shimmer {
      animation: text-shimmer 3s linear infinite;
      background-size: 200% 100%;
    }

    .animate-bounce-in {
      animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .animate-number-pop {
      animation: number-pop 0.3s ease-in-out infinite;
    }

    .animate-bounce-dot {
      animation: bounce-dot 1.4s infinite ease-in-out;
    }

    .animation-delay-100 {
      animation-delay: 0.1s;
    }

    .animation-delay-200 {
      animation-delay: 0.2s;
    }

    .animation-delay-300 {
      animation-delay: 0.3s;
    }
  `}</style>
</header>
      {/* Hero Section */}
 <section className="relative py-16 lg:py-24 overflow-hidden">
  {/* Animated background elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
    <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
    <div className="space-y-6">
      {/* Creative animated heading */}
      <h1 className="text-4xl lg:text-6xl font-black leading-tight">
        <span className="inline-block text-gray-900 animate-bounce-in-rotate">
          Explore
        </span>
        {' '}
        <span className="inline-block text-gray-900 animate-bounce-in-rotate animation-delay-100">
          Our
        </span>
        <span className="block mt-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_100%]">
          Store Categories
        </span>
      </h1>
      
      {/* Animated description with typing effect */}
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-slide-in animation-delay-400">
        Discover everything you need in one place. From daily essentials
        to special treats, we've got you covered with premium quality and
        unbeatable prices.
      </p>

      {/* Animated Stats with pulse and glow effects */}
      <div className="flex justify-center items-center space-x-8 pt-8">
        <div className="text-center group cursor-pointer animate-pop-in animation-delay-600">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-400 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative text-3xl font-bold text-indigo-600 transform group-hover:scale-125 transition-transform duration-300">
              12
            </div>
          </div>
          <div className="text-sm text-gray-600 mt-2">Categories</div>
        </div>
        
        <div className="text-center group cursor-pointer animate-pop-in animation-delay-700">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative text-3xl font-bold text-purple-600 transform group-hover:scale-125 transition-transform duration-300">
              1000+
            </div>
          </div>
          <div className="text-sm text-gray-600 mt-2">Products</div>
        </div>
        
        <div className="text-center group cursor-pointer animate-pop-in animation-delay-800">
          <div className="relative">
            <div className="absolute inset-0 bg-pink-400 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative text-3xl font-bold text-pink-600 transform group-hover:scale-125 transition-transform duration-300">
              24/7
            </div>
          </div>
          <div className="text-sm text-gray-600 mt-2">Support</div>
        </div>
      </div>
    </div>
  </div>

  <style jsx>{`
    @keyframes bounce-in-rotate {
      0% {
        opacity: 0;
        transform: scale(0) rotate(-180deg);
      }
      50% {
        transform: scale(1.2) rotate(10deg);
      }
      100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
    }

    @keyframes text-shimmer {
      0% {
        background-position: -200% center;
      }
      100% {
        background-position: 200% center;
      }
    }

    @keyframes fade-slide-in {
      0% {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes pop-in {
      0% {
        opacity: 0;
        transform: scale(0) rotate(-45deg);
      }
      70% {
        transform: scale(1.1) rotate(5deg);
      }
      100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
    }

    @keyframes blob {
      0%, 100% {
        transform: translate(0, 0) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
    }

    .animate-bounce-in-rotate {
      animation: bounce-in-rotate 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
      opacity: 0;
    }

    .animate-text-shimmer {
      animation: text-shimmer 3s linear infinite;
      background-size: 200% 100%;
    }

    .animate-fade-slide-in {
      animation: fade-slide-in 0.8s ease-out forwards;
      opacity: 0;
    }

    .animate-pop-in {
      animation: pop-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
      opacity: 0;
    }

    .animate-blob {
      animation: blob 7s infinite;
    }

    .animation-delay-100 {
      animation-delay: 0.1s;
    }

    .animation-delay-400 {
      animation-delay: 0.4s;
    }

    .animation-delay-600 {
      animation-delay: 0.6s;
    }

    .animation-delay-700 {
      animation-delay: 0.7s;
    }

    .animation-delay-800 {
      animation-delay: 0.8s;
    }

    .animation-delay-2000 {
      animation-delay: 2s;
    }

    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `}</style>
</section>
      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredCategories.map((category, index) => (
              <div key={index} className="group relative cursor-pointer">
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1">
                  {/* Image */}
                  <div className="relative h-48 lg:h-56 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-500"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="space-y-2 bg-gradient-to-r from-black/10 via-gray-800/40 to-black/50 backdrop-blur-md rounded-xl p-1 shadow-lg">
                      <h3
                        className={`text-xl lg:text-2xl font-bold text-white group-hover:bg-gradient-to-r ${category.color} group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300`}
                      >
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
                        {category.description}
                      </p>
                    </div>

                    {/* Browse Now Button */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <button
                        onClick={() => navigate(category.path)} //  Navigates to category page
                        className={`px-4 py-2 bg-gradient-to-r ${category.color} text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105`}
                      >
                        Browse Now →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No categories found
              </h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">RK</span>
                </div>
                <span className="text-2xl font-bold">RK Stores</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your one-stop destination for quality products and exceptional
                service. We bring you the best from every category.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    window.location.href = "/aboutUs1";
                  }}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>

                <button
                  onClick={() => {window.location.href = "/call";}}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </button>

                <button
                  onClick={() => {
                    window.location.href = "/privacy";
                  }}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Get in Touch</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 ravindukalhara22520@gmail.com</p>
                <p>📞 (+94) 772211681</p>
                <p>📍 576/C Bataduwa, Galle, SriLanka </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400">
              &copy; 2025 RK Stores (Pvt) Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StorePage;
