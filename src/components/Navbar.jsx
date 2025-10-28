import React, { useState } from 'react';
import logo from '../assets/logoRK1.png';
import { useNavigate, Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg px-4 sm:px-6 py-3 flex items-center justify-between relative">
      
      {/* Logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link to="/dashboard">
          <img
            src={logo}
            alt="App Logo"
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <span className="hidden sm:block text-white font-extrabold text-lg drop-shadow">
          RK Stores
        </span>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 items-center font-medium text-white">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center gap-1 hover:text-yellow-300 text-xl transition-colors duration-200"
          >
            <IoHomeOutline />
          </Link>
        </li>
        <li>
          <Link to="/products1" className="hover:text-yellow-300 transition-colors duration-200">
            Products
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-yellow-300 transition-colors duration-200">
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/aboutus" className="hover:text-yellow-300 transition-colors duration-200">
            About Us
          </Link>
        </li>
      </ul>

      {/* Search + Logout (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <form
          role="search"
          className="flex items-center bg-white rounded-full px-3 py-1 shadow-md"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none bg-transparent px-2 py-1 text-gray-700 w-28 focus:w-44 transition-all duration-300"
          />
          <button
            type="submit"
            className="text-blue-500 hover:text-pink-500 text-xl ml-2"
          >
            <IoMdSearch />
          </button>
        </form>

        <button
          className="bg-white text-pink-600 font-semibold px-4 py-2 rounded-full shadow hover:bg-pink-600 hover:text-white transition duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white text-3xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg rounded-b-xl z-50 animate-slideDown">
          <ul className="flex flex-col items-center gap-4 py-4 text-white font-medium">
            <li>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">Home</Link>
            </li>
            <li>
              <Link to="/products1" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">Products</Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">Contact Us</Link>
            </li>
            <li>
              <Link to="/aboutus" onClick={() => setMenuOpen(false)} className="hover:text-yellow-300">About Us</Link>
            </li>

            {/* Search in Mobile */}
            <form
              role="search"
              onSubmit={handleSearch}
              className="flex items-center bg-white rounded-full px-3 py-1 shadow-md w-4/5"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="outline-none bg-transparent px-2 py-1 text-gray-700 flex-1"
              />
              <button type="submit" className="text-blue-500 hover:text-pink-500 text-xl ml-2">
                <IoMdSearch />
              </button>
            </form>

            {/* Logout in Mobile */}
            <button
              className="bg-white text-pink-600 font-semibold px-6 py-2 rounded-full shadow hover:bg-pink-600 hover:text-white transition duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
