import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Lock,
  CheckCircle,
  Sparkles,
  Truck,
  Package,
  Clock,
} from "lucide-react";

function PurchasePage() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [savings, setSavings] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const parsePrice = (price) => {
    if (!price) return 0;
    return parseFloat(price.toString().replace(/[^0-9.]/g, "")) || 0;
  };

  useEffect(() => {
    const data = window.checkoutData || {};
    const items = Array.isArray(data.cartItems) ? data.cartItems : [];

    setCartItems(items);

    const subtotalCalc = items.reduce(
      (sum, item) => sum + parsePrice(item.price) * (item.quantity || 1),
      0
    );
    const originalTotalCalc = items.reduce(
      (sum, item) => sum + parsePrice(item.originalPrice || item.price) * (item.quantity || 1),
      0
    );
    const savingsCalc = originalTotalCalc - subtotalCalc;
    const shippingCalc = subtotalCalc > 500 ? 0 : 15;
    const taxCalc = subtotalCalc * 0.08;
    const totalCalc = subtotalCalc + shippingCalc + taxCalc;

    setSubtotal(subtotalCalc);
    setSavings(savingsCalc);
    setShipping(shippingCalc);
    setTax(taxCalc);
    setTotal(totalCalc);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    return v.match(/.{1,4}/g)?.join(" ") || "";
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, "");
    return v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2, 4)}` : v;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardholderName.trim()) newErrors.cardholderName = "Name is required";
    if (formData.cardNumber.replace(/\s/g, "").length < 16) newErrors.cardNumber = "Invalid card number";
    if (!formData.expiry || formData.expiry.length < 5) newErrors.expiry = "Invalid expiry date";
    if (!formData.cvv || formData.cvv.length < 3) newErrors.cvv = "Invalid CVV";
    if (!formData.email || !formData.email.includes("@")) newErrors.email = "Invalid email";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validateForm()) return;
    setLoading(true);
    setCurrentStep(2);

    setTimeout(() => {
      setCurrentStep(3);
      setLoading(false);
    }, 2500);
  };

  // Payment Processing
  if (currentStep === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-fuchsia-400 blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-md border border-white/20">
            <div className="relative mb-6">
              <div
                className="animate-spin rounded-full h-24 w-24 border-4 border-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto"
                style={{ maskImage: "linear-gradient(transparent 50%, black 50%)", WebkitMaskImage: "linear-gradient(transparent 50%, black 50%)" }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-violet-600 animate-pulse" />
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-3">Processing Payment</h2>
            <p className="text-gray-600 text-sm">Securing your transaction with advanced encryption...</p>
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-fuchsia-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Payment Success
  if (currentStep === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="relative max-w-lg w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 blur-3xl opacity-20"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-white/20">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto transform hover:scale-110 transition-transform">
                <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-3">Payment Successful!</h2>
            <p className="text-gray-600 mb-8 text-sm">Your order has been confirmed and will be shipped soon.</p>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
              <p className="text-sm font-medium text-gray-500 mb-2">Order Total</p>
              <p className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">${total.toFixed(2)}</p>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Package className="w-4 h-4" /> <span>{cartItems.length} items</span></div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> <span>3-5 days</span></div>
              </div>
            </div>

            <button onClick={() => window.location.reload()} className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">Continue Shopping</button>
            <p className="text-xs text-gray-500 mt-4">A confirmation email has been sent to {formData.email || "your email"}</p>
          </div>
        </div>
      </div>
    );
  }

  // Payment Form + Order Summary
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate("/cart")} className="flex items-center text-gray-700 hover:text-gray-900 transition-all">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Cart
          </button>
          <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-bold text-emerald-700">Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Payment Form */}
          <div className="flex-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Details</h2>

              {/* Cardholder Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                  className={`p-3 rounded-xl border ${errors.cardholderName ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-violet-500`}
                />
                {errors.cardholderName && <p className="text-xs text-red-500 mt-1">{errors.cardholderName}</p>}
              </div>

              {/* Card Number */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                  maxLength={19}
                  className={`p-3 rounded-xl border ${errors.cardNumber ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-violet-500`}
                />
                {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
              </div>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={(e) => handleInputChange("expiry", formatExpiry(e.target.value))}
                    maxLength={5}
                    className={`p-3 rounded-xl border ${errors.expiry ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-violet-500`}
                  />
                  {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="password"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    maxLength={4}
                    className={`p-3 rounded-xl border ${errors.cvv ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-violet-500`}
                  />
                  {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`p-3 rounded-xl border ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-violet-500`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-4 rounded-xl font-bold text-lg hover:from-violet-700 hover:to-fuchsia-700 transition-all shadow-lg hover:shadow-xl"
              >
                Pay ${total.toFixed(2)}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="flex-1 lg:w-96">
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100 sticky lg:top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-sm font-normal text-gray-500">{cartItems.length} items</span>
              </h2>

              <div className="mb-6 max-h-80 overflow-y-auto pr-2 space-y-4">
                {cartItems.length === 0 && <p className="text-gray-500 text-sm">No items in cart.</p>}
                {cartItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                    <div className="relative flex-shrink-0 w-20 h-20 bg-gray-100 rounded-xl overflow-hidden">
                      <img src={item.image || item.img || ""} alt={item.name || "Item"} className="w-full h-full object-cover" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{item.quantity || 1}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{item.name || "Item"}</h3>
                      <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="font-bold text-gray-900 text-lg">${(parsePrice(item.price) * (item.quantity || 1)).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6 pt-6 border-t-2 border-gray-100">
                <div className="flex justify-between text-gray-700"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                {savings > 0 && <div className="flex justify-between text-emerald-600"><span>Savings</span><span>-${savings.toFixed(2)}</span></div>}
                <div className="flex justify-between text-gray-700"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between text-gray-700"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                <div className="border-t-2 border-gray-200 pt-4 flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-5 flex items-start">
                <Truck className="w-6 h-6 text-white bg-emerald-500 rounded-xl p-1 mr-4 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-emerald-900 mb-1">Free Express Shipping</p>
                  <p className="text-xs text-emerald-700 leading-relaxed">Your order will arrive in 3-5 business days</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PurchasePage;
