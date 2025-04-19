import React from "react";
import Footer from "../components/Footer";
import Homebanner from "../assets/Home and Outdoor/banner.png";
import banner from "../assets/banner.png";
import Consumerbanner from "../assets/Consumer Electronics/banner.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import {
  techImage,
  homeOutdoorItems,
  consumerElectronicsItems,
} from "../data/data.js";
import CountdownTimer from "../components/CountdownTimer.jsx";

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
      <div className=" container mx-auto p-4 md:p-6 flex flex-col space-y-6">
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
          <div className="w-full md:col-span-3">
            <div
              className="p-4 sm:p-6 rounded-lg flex flex-col items-start h-[80vh] md:h-full bg-green-200"
              style={{
                backgroundImage: `url(${banner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex flex-col space-y-3  md:p-8">
                <p className="text-lg sm:text-xl text-gray-800">
                  Latest trending
                </p>
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-800">
                  Electronic items
                </h2>
                <button className="inline-block bg-white text-gray-800 py-2  rounded-lg border border-gray-300 hover:bg-gray-100">
                  Learn more
                </button>
              </div>
            </div>
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
        <div className="flex flex-col md:flex-row bg-white p-5 rounded-lg shadow">
          <div className="flex  md:flex-col md:justify-start justify-between space-y-2 mb-4 p-1 border-r">
            <span>
              <h3 className="text-lg font-semibold">Deals and offers</h3>
              <p className="text-lg text-gray-500">Hygeine Equipments</p>
            </span>
            {/* <Countdown date={countdownDate} renderer={renderer} /> */}
            <CountdownTimer />
          </div>
          {/* Product Grid: Scrollable on Mobile, Grid on Desktop */}
          <div className="flex overflow-x-auto md:grid md:grid-cols-5 md:gap-4 space-x-4 md:space-x-0 hide-scrollbar">
            {techImage.map((product, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow text-center space-y-1 flex-shrink-0 w-40 "
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-24 md:h-32 object-contain mb-2"
                />
                <h4 className="text-sm font-medium">{product.name}</h4>
                <p className="inline-block text-red-500 text-sm font-semibold  px-4 bg-red-200 rounded-xl">
                  -{product.discount}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Home and Outdoor */}

        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow">
          {/* Banner Section */}
          <h4 className="text-xl py-2 px-4 font-bold text-gray-800 mb-2 md:hidden">
            Home and Outdoor
          </h4>
          <div
            className="hidden md:flex flex-col justify-start items-start py-8 px-6 w-full md:w-1/3 "
            style={{
              backgroundImage: `url(${Homebanner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
              Home and Outdoor
            </h2>
            <button className="bg-white font-semibold text-gray-800 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100">
              Source now
            </button>
          </div>
          {/* Product Grid */}
          <div className="flex overflow-x-auto md:grid md:grid-cols-4 ">
            {homeOutdoorItems.map((product, index) => (
              <div
                key={index}
                className="flex flex-col-reverse md:flex-row md:items-start justify-between bg-white p-4 text-center border "
              >
                <div className="flex flex-col ">
                  <h4 className="text-lg font-medium text-nowrap text-gray-800">
                    {product.name}
                  </h4>
                  <span className="flex md:flex-col text-nowrap md:text-wrap items-start space-x-1">
                    <p className="text-md text-gray-600">From</p>
                    <p className="text-md text-gray-600">USD {product.price}</p>
                  </span>
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="md:relative h-32 w-32 md:h-14 md:w-14 top-6 mr-2 mb-2"
                />
              </div>
            ))}
          </div>
          <button className="md:hidden inline-block text-xl font-bold text-start text-blue-400 py-2 px-4 rounded-lg  hover:text-blue-800">
            Source now
          </button>
        </div>

        {/* Consumer Electronics and Gadgets */}
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow">
          {/* Banner Section */}
          <h4 className="text-xl py-2 px-4 font-bold text-gray-800 mb-2 md:hidden">
            Consumer Electronics and Gadgets
          </h4>
          <div
            className="hidden md:flex flex-col justify-start items-start py-8 px-6 w-full md:w-1/3 "
            style={{
              backgroundImage: `url(${Consumerbanner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <span className="flex flex-col">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                Consumer
              </h2>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                Electronics and
              </h2>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                Gadgets
              </h2>
            </span>
            <button className="bg-white font-semibold text-gray-800 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100">
              Source now
            </button>
          </div>
          {/* Product Grid */}
          <div className="flex overflow-x-auto md:grid md:grid-cols-4 ">
            {consumerElectronicsItems.map((product, index) => (
              <div
                key={index}
                className="flex flex-col-reverse md:flex-row md:items-start justify-between bg-white p-4 text-center border "
              >
                <div className="flex flex-col ">
                  <h4 className="text-lg font-medium text-nowrap text-gray-800">
                    {product.name}
                  </h4>
                  <span className="flex md:flex-col text-nowrap md:text-wrap items-start space-x-1">
                    <p className="text-md text-gray-600">From</p>
                    <p className="text-md text-gray-600">USD {product.price}</p>
                  </span>
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="md:relative h-32 w-32 md:h-14 md:w-14 top-6 mr-2 mb-2"
                />
              </div>
            ))}
          </div>
          <button className="md:hidden inline-block text-xl font-bold text-start text-blue-400 py-2 px-4 rounded-lg  hover:text-blue-800">
            Source now
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
