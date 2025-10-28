import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/shopping.jpg";
import sidepic from "../assets/cart2.jpg";
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
      const res = await axios.post("http://localhost:3001/login", form);
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
        className="relative w-[90%] md:w-2/3 lg:w-md flex flex-col md:flex-row 
                    rounded-3xl overflow-hidden border border-white/20 shadow-2xl z-10 
                    bg-white/10 backdrop-blur-2xl backdrop-saturate-150
                    hover:backdrop-blur-3xl transition-all duration-500 ease-in-out"
      >
        

        {/* Right Side - Login Form */}
        <div className="w-full  flex flex-col justify-center p-2 sm:p-3 md:p-12 relative">
          {/* Glow accent */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 blur-3xl rounded-3xl"></div>

          <div className="max-w-md mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-lg">
                Welcome Back
              </h1>
              <p className="text-slate-200 text-sm sm:text-lg mt-2">
                Sign in to continue your journey with <br></br>{" "}
                <span className="text-blue-800 font-semibold">RK Stores</span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Email Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Mail
                    className={`h-5 w-5 transition-all duration-300 ${
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
                  className={`w-full pl-12 pr-4 py-3 bg-white/10 text-white placeholder-slate-300 border 
                              rounded-2xl transition-all duration-300 
                              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/20 
                              ${
                                focusedField === "email"
                                  ? "border-blue-400"
                                  : "border-white/20 hover:border-white/30"
                              }`}
                />
              </div>

              {/* Password Field */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Lock
                    className={`h-5 w-5 transition-all duration-300 ${
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
                  className={`w-full pl-12 pr-10 py-3 bg-white/10 text-white placeholder-slate-300 border 
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
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-400 transition-colors z-10"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 
                          text-white font-semibold py-3 rounded-2xl shadow-lg shadow-blue-500/30
                          transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98]
                          disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    Logging in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-slate-200">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                disabled={loading}
                className="text-blue-800 hover:text-black-500 font-semibold hover:underline transition-colors"
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
