import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Trash2,
  ShoppingBag,
  CreditCard,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("/cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (id, amount) => {
    const updated = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, (item.quantity || 1) + amount);
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setCartItems(updated);
    localStorage.setItem("/cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("/cart", JSON.stringify(updated));
  };

  const parsePrice = (price) => {
    if (!price) return 0;
    return parseFloat(price.toString().replace(/[^0-9.]/g, "")) || 0;
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * (item.quantity || 1),
    0
  );
  const originalTotal = cartItems.reduce(
    (sum, item) =>
      sum +
      parsePrice(item.originalPrice || item.price) * (item.quantity || 1),
    0
  );
  const savings = originalTotal - subtotal;
  const shipping = subtotal > 500 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    window.checkoutData = {
      cartItems,
      subtotal,
      total,
      savings,
      shipping,
      tax,
    };
    navigate("/purchase");
  };

  const handleBack = () => navigate(-1);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 text-center p-6">
        <ShoppingBag className="w-20 h-20 text-violet-500 mb-6 animate-bounce" />
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
          Your Cart is Empty
        </h2>
        <p className="text-slate-500 mb-6 text-sm md:text-base">
          Add some products to your cart and return here to check out.
        </p>
        <button
          onClick={handleBack}
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 px-4 sm:px-6 lg:px-10 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
        <button
          onClick={()=>window.location.href = 'products1'}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 text-center">
          Your Cart
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 p-6 hover:shadow-xl transition-all"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-xl"
              />
              <div className="flex-1 w-full">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h3 className="text-xl font-semibold text-slate-800">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-all"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
                <p className="text-slate-500 text-sm">{item.subtitle}</p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                    ${parsePrice(item.price).toFixed(2)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-red-400 line-through">
                      ${parsePrice(item.originalPrice).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Quantity Controls */}
                <div className="mt-4 flex items-center gap-4">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-all"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">
                    {item.quantity || 1}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/60 sticky top-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Order Summary
          </h2>
          <div className="space-y-3 text-slate-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Savings</span>
                <span>- ${savings.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-slate-200 my-4"></div>
            <div className="flex justify-between text-lg font-bold text-slate-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            <CreditCard className="w-5 h-5" />
            Proceed to Checkout
          </button>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-violet-500" />
              Free shipping on orders above $500
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-violet-500" />
              Secure checkout guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
