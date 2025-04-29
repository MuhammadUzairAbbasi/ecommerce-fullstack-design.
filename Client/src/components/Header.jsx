import { useState, useEffect, use } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-symbol.svg";
import { FaUser } from "react-icons/fa";
import { MdNavigateBefore, MdOutlineMessage } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { searchCategories, navCategories, countryFlags } from "../data/data";
import { GoSearch } from "react-icons/go";
import { ProductStore } from "../store/ProductStore";
import Select from "react-select";
import {
  US,
  GB,
  CA,
  AU,
  IN,
  PK,
  FR,
  DE,
  JP,
  CN,
  BR,
} from "country-flag-icons/react/3x2";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSearchText, setLocalSearchText] = useState("");
  const [localSelectCategory, setLocalSelectCategory] =
    useState("All Category");

  const {
    searchText,
    selectCategory,
    setSearchText,
    setSelectCategory,
    fetchProducts,
  } = ProductStore();

  useEffect(() => {
    fetchProducts();
  }, [searchText, selectCategory]);

  return (
    <header className="bg-white text-gray-800 p-4 sticky top-0 border-b border-base-200 w-full z-40 backdrop-blur-lg">
      <div className="container mx-auto px-3 space-y-3">
        <div className="flex items-center justify-between h-full">
          {/* Brand Logo Section */}
          <div className="flex items-center space-x-2">
            <button
              className="block md:hidden"
              aria-label="Toggle Navigation Menu"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <IoMenu size={30} />
            </button>
            <img src={logo} alt="E Commerce Platform logo" />
            <h1 className="font-bold text-xl text-blue-500">Brand</h1>
          </div>
          {/* Search And Category  */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="flex justify-center items-center rounded-md space-x-1 border-2 border-blue-500">
              <input
                type="text"
                placeholder="Enter Product Name"
                className="w-96 p-2"
                onChange={(e) => setLocalSearchText(e.target.value)}
              />
              <select
                name="Category"
                id="Category"
                className="border-l-2 border-blue-500 py-2 px-4"
              >
                {searchCategories.map((item, index) => (
                  <>
                    <option
                      key={item.label}
                      value="All Category"
                      onClick={() => setLocalSelectCategory(item.label)}
                    >
                      {item.label}
                    </option>
                  </>
                ))}
              </select>
              <button
                type="submit"
                className="text-white bg-blue-600 py-2 px-3"
                onClick={() => {
                  setSearchText(localSearchText);
                  setSelectCategory(localSelectCategory);
                }}
              >
                Search
              </button>
            </div>
          </div>
          {/* Icon Section */}
          <div className="flex item-center space-x-4">
            <Link
              to={""}
              className="hidden md:flex flex-col items-center justify-center"
            >
              <FaUser size={22} />
              <span className="text-gray-500 text-sm">Profile</span>
            </Link>
            <Link
              to={""}
              className="hidden md:flex flex-col items-center justify-center"
            >
              <MdOutlineMessage size={22} />
              <span className="text-gray-500 text-sm">Messages</span>
            </Link>
            <Link
              to={""}
              className="hidden md:flex flex-col items-center justify-center"
            >
              <MdFavorite size={22} />
              <span className="text-gray-500 text-sm">Orders</span>
            </Link>
            <Link
              to={""}
              className="hidden md:flex flex-col items-center justify-center"
            >
              <FaShoppingCart size={22} />
              <span className="text-gray-500 text-sm">My Cart</span>
            </Link>
            <Link
              to={""}
              className="md:hidden flex flex-col items-center justify-center"
            >
              <FaShoppingCart size={25} />
            </Link>
            <Link
              to={""}
              className="md:hidden flex flex-col items-center justify-center"
            >
              <FaUser size={25} />
            </Link>
          </div>
        </div>

        <div className="flex md:hidden items-center justify-center w-full relative">
          <GoSearch size={22} className="absolute left-4 text-gray-500" />
          <input
            type="search"
            placeholder="Enter Product Name"
            className="w-full p-2 pl-10 border-[2px] border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search products on mobile"
          />
        </div>

        <div className="flex items-center justify-between space-x-3 ">
          {/* Options */}
          <div className="flex items-center justify-center space-x-3">
            <button
              className="hidden md:block"
              aria-label="Toggle Navigation Menu"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <IoMenu size={30} />
            </button>

            <div className="flex overflow-x-auto md:overflow-visible [scrollbar-width:none] space-x-3 justify-center items-center font-semibold ">
              {navCategories.map((item, index) => (
                <>
                  <Link key={item.label} to={item.path} className="text-nowrap">
                    {item.label}
                  </Link>
                </>
              ))}
              <select name="Help" id="">
                <option value="Help">Help</option>
              </select>
            </div>
          </div>

          <div className="hidden md:flex space-x-4 items-center justify-center">
            <span className="space-x-1">
              English,
              <select name="Payment" id="Payment" className="space-x-1">
                <option value="USD">USD</option>
              </select>
            </span>
            <span className="space-x-1">
              Ship to
              <select name="Country" id="">
                {countryFlags.map((item, index) => (
                  <option key={index}>{item.code}</option>
                ))}
              </select>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
