import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Homebanner from "../assets/Home&Outdoor_banner.png";
import banner from "../assets/banner.png";
import Consumerbanner from "../assets/Consumer_Electronic_banner.png";
import CategorySection from "../components/HomPageSections/CategorySection.jsx";
import QuerySection from "../components/HomPageSections/QuerySection";
import RecommendItems from "../components/HomPageSections/RecommendItems";
import NewsletterSubscription from "../components/SubscribeNewsletter.jsx";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import {
  techImage,
  homeOutdoorItems,
  consumerElectronicsItems,
  services,
  countryData,
} from "../data/data.js";
import CountdownTimer from "../components/HomPageSections/CountdownTimer.jsx";
import { ProductStore } from "../store/ProductStore.js";

// Placeholder images (replace with your actual assets)
const productImages = {
  jacket: "https://via.placeholder.com/150x150.png?text=Jacket",
  headphones: "https://via.placeholder.com/150x150.png?text=Headphones",
  laptop: "https://via.placeholder.com/150x150.png?text=Laptop",
};

const HomePage = () => {
  const {
    DealsProducts,
    HomeProducts,
    ConsumerGadetsProducts,
    featuredProducts,
    fetchDealProducts,
    fetchHomeProducts,
    fetchConsumerGadetsProducts,
    fetchFeaturedProducts,
  } = ProductStore();

  useEffect(() => {
    fetchDealProducts();
    fetchHomeProducts();
    fetchConsumerGadetsProducts();
    fetchFeaturedProducts();
  }, []);

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
      <div className=" container mx-auto md:p-6 flex flex-col space-y-4">
        {/* Grid Layout for Desktop, Hidden Sidebars on Mobile */}
        <div className="flex flex-col md:grid md:grid-cols-5 md:gap-3 bg-white md:p-5 rounded-lg">
          {/* Left Sidebar: Categories (Hidden on Mobile) */}
          <div className="hidden md:block md:col-span-1">
            <ul className="space-y-1 text-sm">
              {categories.map((category) => (
                <li
                  key={category.name}
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
              className="p-4 md:rounded-lg h-[30vh] flex flex-col items-start md:h-full "
              style={{
                backgroundImage: `url(${banner})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex flex-col space-y-3 md:p-8">
                <p className="md:text-lg text-xl text-gray-800">
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
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow ">
          <div className="flex md:w-1/5  md:flex-col md:justify-start justify-between space-y-2 mb-4 p-3 border-r">
            <span>
              <h3 className="text-lg font-semibold">Deals and offers</h3>
              <p className="text-lg text-gray-500">Hygeine Equipments</p>
            </span>
            {/* <Countdown date={countdownDate} renderer={renderer} /> */}
            <CountdownTimer />
          </div>
          {/* Product Grid: Scrollable on Mobile, Grid on Desktop */}
          <div className="flex overflow-x-auto md:grid md:grid-cols-5 md:w-4/5  hide-scrollbar">
            {DealsProducts.slice(0, 5).map((product, index) => (
              <Link
                key={product._id}
                to={""}
                className="bg-white hover:bg-gray-100 p-4 shadow border text-center space-y-1 flex-shrink-0  "
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-24 md:h-32 object-contain mb-2"
                />
                <h4 className="text-sm font-medium">{product.name}</h4>
                <p className="inline-block text-red-500 text-sm font-semibold  px-4 bg-red-200 rounded-xl">
                  -{product.discount} %
                </p>
              </Link>
            ))}
          </div>
        </div>

        <CategorySection
          title={"Home and Outdoor"}
          bannerImage={Homebanner}
          products={HomeProducts}
        />
        {/* Consumer Electronics and Gadgets */}
        <CategorySection
          title={"Consumer Electronics and Gadgets"}
          bannerImage={Consumerbanner}
          products={ConsumerGadetsProducts}
        />
        {/* Quote and Query Section */}
        <QuerySection />
        {/* Recommend Items */}
        <RecommendItems data={featuredProducts} />
        {/* Extra Services Section */}
        <div className="mb-4">
          <h2 className="px-4 text-xl md:text-2xl font-semibold text-gray-800 mb-4">
            Our Extra Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4 flex items-center justify-between">
                  <p className="text-sm text-wrap font-medium text-gray-800">
                    {service.name}
                  </p>
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full relative flex items-center justify-center bottom-10">
                    <service.icon color={"black"} className="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Services Providing Country */}
        <div className="">
          <h2 className="text-xl px-4 md:text-2xl font-semibold text-gray-800 mb-4">
            Suppliers by Region
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-6 md:px-0">
            {countryData.map((country) => (
              <div key={country.code} className="flex items-center">
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="w-8 h-6 mr-2 object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {country.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    shopname.{country.code.toLowerCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* newsletter Section */}
        <NewsletterSubscription />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
