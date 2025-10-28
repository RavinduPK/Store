import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Sparkles, MessageCircle, Zap, ArrowLeft, Store } from 'lucide-react';

function CallPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [typingAnimation, setTypingAnimation] = useState('');

  const fullText = "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypingAnimation(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.subject && formData.message) {
      setIsSubmitted(true);
      createConfetti();
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 4000);
    }
  };

  const createConfetti = () => {
    const confettiCount = 50;
    const newConfetti = Array.from({ length: confettiCount }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.5
    }));
    setParticles(prev => [...prev, ...newConfetti]);
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone', detail: ' (+94) 772211681', subdetail: 'Mon-Fri 9AM-6PM', color: 'from-blue-500 to-cyan-500' },
    { icon: Mail, title: 'Email', detail: 'ravindukalhara22520@gmail.com', subdetail: 'We reply within 24hrs', color: 'from-purple-500 to-pink-500' },
    { icon: MapPin, title: 'Office', detail: '576/C , Bataduwa , Galle', subdetail: 'New York, NY 10001', color: 'from-green-500 to-emerald-500' },
    { icon: Clock, title: 'Hours', detail: 'Monday - Friday', subdetail: '9:00 AM - 6:00 PM EST', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
              opacity: 0.3
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <div className="mb-8 animate-slideRight">
          <button
            onClick={() => window.history.back()}
            className="group flex items-center space-x-3 px-6 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-white font-medium group-hover:text-purple-300 transition-colors duration-300">Back to Store</span>
            <Store className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Header with typing animation */}
        <div className="text-center mb-16 animate-slideDown">
          <div className="inline-flex items-center justify-center mb-6 animate-bounce-slow">
            
            <MessageCircle className="w-10 h-10 text-pink-400 mx-4 animate-pulse" />
           
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight animate-gradient">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x">Touch</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto min-h-[3.5rem]">
            {typingAnimation}
            <span className="animate-blink">|</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards with stagger animation */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, idx) => (
              <div
                key={idx}
                className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-purple-400/50 cursor-pointer animate-slideRight shadow-lg hover:shadow-2xl hover:shadow-purple-500/20"
                style={{ 
                  animationDelay: `${idx * 150}ms`,
                  transform: `translateX(${mousePosition.x * 0.01 - 5}px) translateY(${mousePosition.y * 0.01 - 5}px)`
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 bg-gradient-to-br ${info.color} rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 animate-float`}>
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">{info.title}</h3>
                    <p className="text-gray-300 font-medium group-hover:translate-x-1 transition-transform duration-300">{info.detail}</p>
                    <p className="text-gray-400 text-sm mt-1">{info.subdetail}</p>
                  </div>
                  <Zap className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form with enhanced animations */}
          <div className="lg:col-span-2 animate-slideLeft">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl hover:shadow-purple-500/20 transition-shadow duration-500">
              {!isSubmitted ? (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-purple-300 transition-colors duration-300">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField('')}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 focus:scale-105"
                        placeholder="John Doe"
                      />
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 transition-all duration-500 animate-gradient-x ${focusedField === 'name' ? 'w-full' : 'w-0'}`}></div>
                      {focusedField === 'name' && <Sparkles className="absolute right-3 top-10 w-4 h-4 text-purple-400 animate-pulse" />}
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-purple-300 transition-colors duration-300">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 focus:scale-105"
                        placeholder="john@example.com"
                      />
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 transition-all duration-500 animate-gradient-x ${focusedField === 'email' ? 'w-full' : 'w-0'}`}></div>
                      {focusedField === 'email' && <Sparkles className="absolute right-3 top-10 w-4 h-4 text-purple-400 animate-pulse" />}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-purple-300 transition-colors duration-300">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField('')}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 focus:scale-105"
                        placeholder="+1 (555) 000-0000"
                      />
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 transition-all duration-500 animate-gradient-x ${focusedField === 'phone' ? 'w-full' : 'w-0'}`}></div>
                      {focusedField === 'phone' && <Sparkles className="absolute right-3 top-10 w-4 h-4 text-purple-400 animate-pulse" />}
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-purple-300 transition-colors duration-300">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField('')}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 focus:scale-105"
                        placeholder="How can we help?"
                      />
                      <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 transition-all duration-500 animate-gradient-x ${focusedField === 'subject' ? 'w-full' : 'w-0'}`}></div>
                      {focusedField === 'subject' && <Sparkles className="absolute right-3 top-10 w-4 h-4 text-purple-400 animate-pulse" />}
                    </div>
                  </div>

                  <div className="relative group">
                    <label className="block text-sm font-medium text-gray-300 mb-2 group-hover:text-purple-300 transition-colors duration-300">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField('')}
                      rows="5"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 resize-none focus:scale-105"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 transition-all duration-500 animate-gradient-x ${focusedField === 'message' ? 'w-full' : 'w-0'}`}></div>
                    {focusedField === 'message' && <Sparkles className="absolute right-3 top-10 w-4 h-4 text-purple-400 animate-pulse" />}
                  </div>

                  <button
                    onClick={handleSubmit}
                    onMouseEnter={() => setIsHoveringButton(true)}
                    onMouseLeave={() => setIsHoveringButton(false)}
                    className="relative group w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white font-semibold rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center space-x-2 animate-gradient-x overflow-hidden"
                  >
                    <span className="relative z-10">Send Message</span>
                    <Send className={`w-5 h-5 relative z-10 transition-all duration-500 ${isHoveringButton ? 'translate-x-2 rotate-12' : ''}`} />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    {isHoveringButton && (
                      <>
                        <Sparkles className="absolute top-2 right-4 w-4 h-4 text-white animate-ping" />
                        <Sparkles className="absolute bottom-2 left-4 w-3 h-3 text-white animate-ping" style={{ animationDelay: '0.2s' }} />
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="py-16 text-center animate-zoomIn">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full mb-6 animate-bounce-big relative">
                    <CheckCircle className="w-12 h-12 text-green-400 animate-scale-pulse" />
                    <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping"></div>
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-3 animate-gradient">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Message Sent!</span>
                  </h3>
                  <p className="text-gray-300 text-lg animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                  <div className="mt-6 flex justify-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className="w-6 h-6 text-purple-400 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA with animation */}
        <div className="mt-16 text-center animate-slideUp">
          <div className="inline-block bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-8 py-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-purple-400/50 group">
            <p className="text-gray-300 text-lg mb-3 group-hover:text-purple-300 transition-colors duration-300">
              Prefer to talk directly? Give us a call!
            </p>
            <div className="inline-flex items-center space-x-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x hover:from-purple-300 hover:to-pink-300 transition-all duration-300 cursor-pointer group-hover:scale-110">
              <Phone className="w-8 h-8 text-purple-400 group-hover:animate-wiggle" />
              <span> (+94) 772211681</span>
            </div>
          </div>
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
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(5px); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-big {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes scale-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideDown { animation: slideDown 0.8s ease-out; }
        .animate-slideRight { animation: slideRight 0.6s ease-out; }
        .animate-slideLeft { animation: slideLeft 0.8s ease-out; }
        .animate-slideUp { animation: slideUp 0.8s ease-out; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 3s ease infinite; }
        .animate-blink { animation: blink 1s step-end infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-bounce-big { animation: bounce-big 2s ease-in-out infinite; }
        .animate-zoomIn { animation: zoomIn 0.5s ease-out; }
        .animate-scale-pulse { animation: scale-pulse 2s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 0.5s ease-in-out; }
      `}</style>
    </div>
  );
}

export default CallPage;