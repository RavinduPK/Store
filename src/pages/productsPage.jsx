import React from "react";
import Navbar from "../components/Navbar.jsx";
import { IoCartOutline } from "react-icons/io5";


function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "High quality sound with noise cancellation.",
      price: "$99.99",
      image: "https://via.placeholder.com/250x200",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Track your fitness and notifications on the go.",
      price: "$149.99",
      image: "https://via.placeholder.com/250x200",
    },
    {
      id: 3,
      name: "Laptop Backpack",
      description: "Durable and stylish backpack for all laptops.",
      price: "$59.99",
      image: "https://via.placeholder.com/250x200",
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      description: "Portable speaker with deep bass.",
      price: "$39.99",
      image: "https://via.placeholder.com/250x200",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      <div className="fixed top-25 right-9 z-10 flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-2">
        <IoCartOutline className="text-4xl  text-purple-600" />
        <span className="font-semibold text-gray-700">Cart</span>
      </div>

      {/* Products Section */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-10 drop-shadow-lg">
          Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center p-6"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
                {product.name}
              </h2>
              <p className="text-gray-500 text-center mb-4">{product.description}</p>
              <span className="price text-lg font-semibold text-purple-600 mb-4">
                {product.price}
              </span>
              <button className="add-to-cart flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-6 rounded-full shadow-md transition-colors duration-200">
                <IoCartOutline className="text-lg" /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
