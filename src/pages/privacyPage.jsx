import React, { useState, useEffect } from "react";
import { ArrowLeft, Shield, Lock, Eye, Users, Mail, Cookie, FileText, Sparkles, CheckCircle } from "lucide-react";

function PrivacyPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (visibleSections.length < sections.length + 3) {
        setVisibleSections(prev => [...prev, prev.length]);
      }
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Introduction",
      content: "Welcome to our store! Your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit or make purchases on our platform.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Information We Collect",
      items: [
        "Personal Information: Name, email, phone number, shipping address, payment details",
        "Order Information: Items purchased, quantity, prices, payment status",
        "Technical Information: IP address, browser type, device information, and cookies",
        "Communication: Messages, feedback, and customer service interactions"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Your Information",
      items: [
        "Order Processing: To deliver the items you purchase",
        "Payment Processing: To securely process payments",
        "Customer Support: To respond to inquiries or issues",
        "Marketing (Optional): To send promotional emails, if you opted in",
        "Improvement: To enhance our website and services"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "How We Protect Your Information",
      content: "We take security seriously and use measures such as secure servers, encrypted payment gateways (SSL/HTTPS), restricted access to personal information, and regular security monitoring.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Sharing Your Information",
      content: "We do not sell your personal data. We may share information with:",
      items: [
        "Payment processors to complete transactions",
        "Delivery services to ship your orders",
        "Legal authorities if required by law"
      ],
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      title: "Cookies & Tracking",
      content: "We use cookies and similar technologies to improve your shopping experience, remember your cart items and preferences, and analyze website traffic. You can disable cookies in your browser, but some features may not work properly.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const handleBackClick = () => {
    window.location.href = '/products1';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleBackClick}
            className="group flex items-center gap-2 text-white hover:text-indigo-400 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
            <span className="font-medium">Back to Products</span>
            <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-6 animate-bounce-slow shadow-lg shadow-indigo-500/50">
            <Shield className="w-10 h-10 text-white animate-pulse" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 animate-gradient">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x">
              Privacy Policy
            </span>
          </h1>
          <div className="inline-flex items-center gap-2 text-gray-300 text-lg bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
            <CheckCircle className="w-5 h-5 text-green-400 animate-pulse" />
            <span>Effective Date: January 1, 2024</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 mb-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 p-6 sm:p-8 hover:scale-105 hover:shadow-2xl group ${
                visibleSections.includes(index) ? 'animate-slideUp' : 'opacity-0'
              }`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: `perspective(1000px) rotateX(${scrollY * 0.01}deg)`
              }}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-float`}>
                  {section.icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                    {section.title}
                  </h2>
                  {section.content && (
                    <p className="text-gray-300 leading-relaxed mb-3 group-hover:text-white transition-colors duration-300">
                      {section.content}
                    </p>
                  )}
                  {section.items && (
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li 
                          key={i} 
                          className="flex items-start gap-3 text-gray-300 group-hover:text-white transition-all duration-300 hover:translate-x-2"
                          style={{ animationDelay: `${i * 50}ms` }}
                        >
                          <span className={`w-2 h-2 bg-gradient-to-r ${section.color} rounded-full mt-2 flex-shrink-0 animate-pulse`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Sparkles className="w-5 h-5 text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-all duration-300" />
              </div>
            </div>
          ))}

          {/* Your Rights */}
          <div className={`bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 p-6 sm:p-8 hover:scale-105 hover:shadow-2xl group ${
            visibleSections.includes(sections.length) ? 'animate-slideUp' : 'opacity-0'
          }`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-cyan-400 transition-all duration-300">
                  Your Rights
                </h2>
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  You can request access to your personal data, request correction or deletion of your data, and opt-out of marketing emails at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className={`bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 p-6 sm:p-8 hover:scale-105 hover:shadow-2xl group ${
            visibleSections.includes(sections.length + 1) ? 'animate-slideUp' : 'opacity-0'
          }`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Shield className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-400 group-hover:to-pink-400 transition-all duration-300">
                  Children's Privacy
                </h2>
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  Our store is not directed at children under 13, and we do not knowingly collect personal information from children.
                </p>
              </div>
            </div>
          </div>

          {/* Changes to Policy */}
          <div className={`bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 p-6 sm:p-8 hover:scale-105 hover:shadow-2xl group ${
            visibleSections.includes(sections.length + 2) ? 'animate-slideUp' : 'opacity-0'
          }`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-purple-400 transition-all duration-300">
                  Changes to This Policy
                </h2>
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  We may update this Privacy Policy from time to time. The latest version will be posted on our platform with an updated effective date.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 sm:p-10 text-white relative overflow-hidden group hover:scale-105 transition-all duration-500 animate-slideUp">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <Mail className="w-7 h-7 animate-bounce-slow" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  Contact Us
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </h2>
                <p className="text-indigo-100 mb-4">
                  If you have questions about your privacy, we're here to help.
                </p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg group/card">
                <p className="text-sm text-indigo-200 mb-1">Email</p>
                <p className="font-medium group-hover/card:text-white transition-colors">ravindukalhara22520@gmail.com</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg group/card">
                <p className="text-sm text-indigo-200 mb-1">Phone</p>
                <p className="font-medium group-hover/card:text-white transition-colors">(+94) 772211681</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg group/card">
                <p className="text-sm text-indigo-200 mb-1">Address</p>
                <p className="font-medium group-hover/card:text-white transition-colors">576/C, Bataduwa, Galle</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/5 backdrop-blur-md border-t border-white/10 mt-12 animate-slideUp">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
            © 2025 Your Store. All rights reserved.
            <Shield className="w-4 h-4 text-indigo-400 animate-pulse" />
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
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
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-slideDown { animation: slideDown 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-gradient-x { 
          background-size: 200% 200%; 
          animation: gradient-x 3s ease infinite; 
        }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default PrivacyPage;