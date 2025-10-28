import React, { useState, useEffect } from "react";
import { ArrowLeft, Target, Eye, Heart, Shield, Lightbulb, Leaf, ShoppingBag, Star, Users, Sparkles, TrendingUp, Zap } from "lucide-react";

function AboutPage() {
  const [visibleSections, setVisibleSections] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [countUpValues, setCountUpValues] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (visibleSections.length < 10) {
        setVisibleSections(prev => [...prev, prev.length]);
      }
    }, 200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const targets = [10000, 5000, 50, 99];
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setCountUpValues(targets.map(target => 
          Math.floor((target / steps) * currentStep)
        ));
        currentStep++;
      } else {
        setCountUpValues(targets);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Customer Satisfaction",
      description: "We put our customers first in every decision we make",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Quality",
      description: "We only offer products that meet our high standards",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Integrity",
      description: "We operate honestly and transparently with everyone",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovation",
      description: "We strive to improve and offer better experiences",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Responsibility",
      description: "We care deeply about our community and environment",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { number: countUpValues[0], label: "Happy Customers", suffix: "K+", color: "from-purple-600 to-pink-600" },
    { number: countUpValues[1], label: "Products", suffix: "K+", color: "from-blue-600 to-cyan-600" },
    { number: countUpValues[2], label: "Categories", suffix: "+", color: "from-green-600 to-emerald-600" },
    { number: countUpValues[3], label: "Satisfaction Rate", suffix: "%", color: "from-orange-600 to-red-600" }
  ];

  const handleBackClick = () => {
    window.location.href = '/products1';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.3
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 animate-slideDown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleBackClick}
            className="group flex items-center gap-2 text-white hover:text-purple-400 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
            <span className="font-medium">Back to Products</span>
           
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl mb-6 shadow-2xl shadow-purple-500/50 animate-bounce-slow relative">
            <ShoppingBag className="w-12 h-12 text-white animate-pulse" />
            <div className="absolute inset-0 rounded-3xl border-4 border-purple-400 animate-ping opacity-50"></div>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 animate-gradient">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x">
              About RK Stores
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slideUp">
            Your trusted online destination for quality products delivered right to your door
          </p>

          <div className="flex justify-center gap-3 mt-8">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 text-purple-400 animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        {/* Stats Section with Counter Animation */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 ${visibleSections.includes(0) ? 'animate-scaleIn' : 'opacity-0'}`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500 p-6 text-center hover:scale-110 hover:shadow-2xl relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className={`text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-2 relative z-10 group-hover:scale-125 transition-transform duration-500`}>
                {stat.number >= 1000 ? `${(stat.number / 1000).toFixed(1)}${stat.suffix}` : `${stat.number}${stat.suffix}`}
              </div>
              <div className="text-gray-300 font-medium relative z-10 group-hover:text-white transition-colors duration-300">{stat.label}</div>
              
              <TrendingUp className="absolute top-2 right-2 w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce" />
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className={`grid lg:grid-cols-2 gap-8 mb-16 ${visibleSections.includes(1) ? 'animate-slideUp' : 'opacity-0'}`}>
          <div className="group bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:border-purple-400/50 transition-all duration-500 p-8 sm:p-10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                Our Story
              </h2>
            
            </div>
            <p className="text-gray-300 leading-relaxed mb-4 group-hover:text-white transition-colors duration-300">
              Welcome to RK Stores, where shopping meets convenience and quality. Our mission is to make shopping easy, convenient, and enjoyable for everyone.
            </p>
            <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
              We offer a wide range of products to meet your daily needs, from groceries to household essentials. Each item is carefully selected to ensure the highest quality and best value for our customers.
            </p>
          </div>

          <div className="space-y-8">
            <div className={`bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-3xl shadow-2xl p-8 sm:p-10 text-white relative overflow-hidden group hover:scale-105 transition-all duration-500 ${visibleSections.includes(2) ? 'animate-slideRight' : 'opacity-0'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <Eye className="w-7 h-7 animate-pulse" />
                  </div>
                  <h2 className="text-3xl font-bold">Our Vision</h2>
                  <Zap className="w-6 h-6 animate-bounce" />
                </div>
                <p className="text-purple-50 leading-relaxed">
                  To become the most reliable online store where customers can shop confidently and find everything they need in one place.
                </p>
              </div>
            </div>

            <div className={`bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 hover:border-pink-400/50 shadow-lg hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-500 p-8 sm:p-10 group hover:scale-105 ${visibleSections.includes(3) ? 'animate-slideLeft' : 'opacity-0'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-orange-400 transition-all duration-300">
                  Our Mission
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                To provide exceptional service, quality products, and a seamless shopping experience that exceeds customer expectations every single time.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className={`mb-16 ${visibleSections.includes(4) ? 'animate-fadeIn' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            
              Our Core Values
             
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              These principles guide everything we do and shape our commitment to you
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-500 p-8 hover:scale-105 hover:shadow-2xl relative overflow-hidden ${visibleSections.includes(5 + index) ? 'animate-scaleIn' : 'opacity-0'}`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  transform: `translateY(${mousePosition.y * 0.01}px) translateX(${mousePosition.x * 0.01}px)`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg relative z-10`}>
                  {value.icon}
                  <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 animate-ping"></div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 relative z-10">
                  {value.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300 relative z-10">
                  {value.description}
                </p>
                
             
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className={`bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-3xl shadow-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden group hover:scale-105 transition-all duration-500 ${visibleSections.includes(9) ? 'animate-zoomIn' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              {[...Array(3)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-8 h-8 text-yellow-300 animate-bounce fill-current" 
                  style={{ animationDelay: `${i * 0.2}s` }} 
                />
              ))}
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 animate-pulse">
              Thank You for Choosing RK Stores
            </h2>
            
            <p className="text-purple-50 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              We are committed to providing you with the best online shopping experience. Your trust and satisfaction drive us to continuously improve and serve you better every day.
            </p>
            
            <button
              onClick={() => { window.location.href = '/products1'; }}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-110 inline-flex items-center gap-2 group/btn"
            >
              <ShoppingBag className="w-5 h-5 group-hover/btn:animate-bounce" />
              Start Shopping
              <Sparkles className="w-5 h-5 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-spin transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/5 backdrop-blur-md border-t border-white/10 mt-12 animate-slideUp">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            © 2025 RK Stores. All rights reserved.
            <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-slideDown { animation: slideDown 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; }
        .animate-slideRight { animation: slideRight 0.8s ease-out; }
        .animate-slideLeft { animation: slideLeft 0.8s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.6s ease-out; }
        .animate-zoomIn { animation: zoomIn 0.8s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-gradient-x { 
          background-size: 200% 200%; 
          animation: gradient-x 3s ease infinite; 
        }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
      `}</style>
    </div>
  );
}

export default AboutPage;