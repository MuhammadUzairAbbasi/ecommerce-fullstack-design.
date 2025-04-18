import React from "react";
import Footer from "../components/Footer";
import banner from "../assets/banner.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";

// Placeholder images (replace with your actual assets)
const productImages = {
  jacket: "https://via.placeholder.com/150x150.png?text=Jacket",
  headphones: "https://via.placeholder.com/150x150.png?text=Headphones",
  laptop: "https://via.placeholder.com/150x150.png?text=Laptop",
};

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(
    "/categories/automobiles"
  ); // Default to first item

  const categories = [
    { name: "Automobiles", href: "/categories/automobiles" },
    { name: "Clothes and wear", href: "/categories/clothes" },
    { name: "Home interiors", href: "/categories/home-interiors" },
    { name: "Computer and tech", href: "/categories/computer-tech" },
    { name: "Tools, equipments", href: "/categories/tools" },
    { name: "Sports and outdoor", href: "/categories/sports" },
    { name: "Animal and pets", href: "/categories/pets" },
    { name: "Machinery tools", href: "/categories/tools" },
    { name: "More category", href: "/categories/more" },
  ];
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Main Content */}
      <div className=" container mx-auto md:p-6 flex flex-col space-y-6">
        {/* Grid Layout for Desktop, Hidden Sidebars on Mobile */}
        <div className="flex flex-col md:grid md:grid-cols-5 md:gap-3 bg-white p-5 rounded-lg">
          {/* Left Sidebar: Categories (Hidden on Mobile) */}
          <div className="hidden md:block md:col-span-1">
            <ul className="space-y-1 text-sm">
              {categories.map((category) => (
                <li
                  key={category.href}
                  className={`rounded-lg ${
                    selectedCategory === category.href ? "bg-blue-300" : ""
                  }`}
                >
                  <Link
                    to={category.href}
                    className={`block px-3 py-2 rounded-lg font-semibold ${
                      selectedCategory === category.href
                        ? "text-gray-800"
                        : "text-gray-800 hover:text-blue-500"
                    }`}
                    onClick={() => setSelectedCategory(category.href)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Banner */}
          <div className="md:col-span-3">
            <Link to={""}>
              <div
                className="p-4 md:p-6 rounded-lg text-center flex flex-col justify-center h-full "
                style={{
                  backgroundImage: `url(${banner})`,
                  backgroundSize: "contain",
                  backgroundPosition: "top ",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            </Link>
          </div>

          {/* Right Sidebar: User and Promos (Hidden on Mobile) */}
          <div className="hidden md:block md:col-span-1 space-y-4">
            <div className="flex flex-col bg-blue-100 p-4 rounded-lg shadow space-y-2">
              <div className="flex items-center p-1 space-x-2">
                <FaUser
                  color="white"
                  className="bg-blue-200 h-12 w-12 p-1 rounded-full"
                />
                <span className="font-semibold text-md text-gray-800">
                  <p>Hi, user</p> <p>let's get started</p>
                </span>
              </div>

              <Link
                to="/join"
                className="block bg-blue-500 text-white text-center py-2 rounded mb-2 hover:bg-blue-600"
              >
                Join now
              </Link>
              <Link
                to="/login"
                className="block bg-gray-100 text-gray-800 text-center py-2 rounded hover:bg-gray-200"
              >
                Log in
              </Link>
            </div>

            <div className="bg-orange-500 p-4 rounded-lg shadow">
              <p className="text-xl text-white">
                Get US $10 off with a new supplier
              </p>
            </div>

            <div className="bg-teal-400 p-4 rounded-lg shadow">
              <p className="text-xl text-white">
                Send quotes with supplier preferences
              </p>
            </div>
          </div>
        </div>

        {/* Deals and Offers Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Deals and offers</h3>
            <div className="flex space-x-2 text-sm bg-gray-200 px-3 py-1 rounded">
              <span>04</span>
              <span>13</span>
              <span>34</span>
              <span>56</span>
            </div>
          </div>
          {/* Product Grid: Scrollable on Mobile, Grid on Desktop */}
          <div className="flex overflow-x-auto md:grid md:grid-cols-5 md:gap-4 space-x-4 md:space-x-0">
            {[
              { name: "Jacket", discount: "25%", image: productImages.jacket },
              {
                name: "Headphones",
                discount: "25%",
                image: productImages.headphones,
              },
              { name: "Laptop", discount: "25%", image: productImages.laptop },
            ].map((product, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow text-center flex-shrink-0 w-40 md:w-auto"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-24 md:h-32 object-contain mb-2"
                />
                <h4 className="text-sm font-medium">{product.name}</h4>
                <p className="text-red-500 text-sm">-{product.discount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
