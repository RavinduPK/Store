import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/shopping.jpg";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://rk-store-backend-3.onrender.com/login", form);
      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", form.email);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Toaster position="top-right" reverseOrder={false} />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      {/* Main Card */}
      <div
        className="relative w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] flex flex-col rounded-3xl overflow-hidden border border-white/20 shadow-2xl z-10 
                    bg-white/10 backdrop-blur-2xl backdrop-saturate-150
                    hover:backdrop-blur-3xl transition-all duration-500 ease-in-out"
      >
        {/* Login Form */}
        <div className="w-full flex flex-col justify-center p-4 sm:p-6 md:p-10 relative">
          {/* Glow */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 blur-3xl rounded-3xl"></div>

          <div className="max-w-md mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
                Welcome Back
              </h1>
              <p className="text-slate-200 text-sm sm:text-base md:text-lg mt-1 sm:mt-2">
                Sign in to continue your journey with <br />
                <span className="text-blue-800 font-semibold">RK Stores</span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Email */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none z-10">
                  <Mail
                    className={`h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 ${
                      focusedField === "email"
                        ? "text-blue-400 scale-110"
                        : "text-slate-400 group-hover:text-slate-300"
                    }`}
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  required
                  disabled={loading}
                  placeholder="Enter your email"
                  className={`w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white/10 text-white placeholder-slate-300 border 
                              rounded-2xl transition-all duration-300 
                              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 
                              ${
                                focusedField === "email"
                                  ? "border-blue-400"
                                  : "border-white/20 hover:border-white/30"
                              }`}
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none z-10">
                  <Lock
                    className={`h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 ${
                      focusedField === "password"
                        ? "text-blue-400 scale-110"
                        : "text-slate-400 group-hover:text-slate-300"
                    }`}
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  required
                  disabled={loading}
                  placeholder="Enter your password"
                  className={`w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 bg-white/10 text-white placeholder-slate-300 border 
                              rounded-2xl transition-all duration-300 
                              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 
                              ${
                                focusedField === "password"
                                  ? "border-blue-400"
                                  : "border-white/20 hover:border-white/30"
                              }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-slate-400 hover:text-blue-400 transition-colors z-10"
                >
                  {showPassword ? <EyeOff className="h-4 sm:h-5 w-4 sm:w-5" /> : <Eye className="h-4 sm:h-5 w-4 sm:w-5" />}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 
                          text-white font-semibold py-2.5 sm:py-3 rounded-2xl shadow-lg shadow-blue-500/30
                          transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]
                          disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 sm:mr-3"></div>
                    Logging in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Sign In
                    <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-5 sm:mt-6 text-center text-slate-200 text-sm sm:text-base">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                disabled={loading}
                className="text-blue-800 hover:text-blue-500 font-semibold hover:underline transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
