import { useState, useEffect, useCallback, useRef } from "react";
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
import MblSidebar from "./mblSidebar";
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

// Debounce function to limit API calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [localSearchText, setLocalSearchText] = useState("");
  const [localSelectCategory, setLocalSelectCategory] =
    useState("All Category");
  const [isSearchWindowOpen, setIsSearchWindowOpen] = useState(false); // State for sliding window
  const searchBarRef = useRef(null); // Ref to calculate search bar position
  const searchWindowRef = useRef(null); // Ref for the sliding window

  const {
    products,
    searchText,
    selectCategory,
    setSearchText,
    setSelectCategory,
    fetchProducts,
    loading,
    error,
  } = ProductStore();

  // Fetch products when searchText or selectCategory changes
  useEffect(() => {
    fetchProducts();
  }, [searchText, selectCategory, fetchProducts]);

  // Close search window when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchWindowRef.current &&
        !searchWindowRef.current.contains(event.target) &&
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setIsSearchWindowOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounced search handler to avoid excessive API calls
  const debouncedSearch = useCallback(
    debounce((text, category) => {
      setSearchText(text);
      setSelectCategory(category === "All Category" ? "" : category);
    }, 500),
    [setSearchText, setSelectCategory]
  );

  // Handle search input change for both desktop and mobile
  const handleSearchChange = (e) => {
    const newSearchText = e.target.value;
    setLocalSearchText(newSearchText);
    debouncedSearch(newSearchText, localSelectCategory);
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setLocalSelectCategory(newCategory);
    debouncedSearch(localSearchText, newCategory);
  };

  // Handle form submission (Enter key or Search button)
  const handleSearchSubmit = (e) => {
    if (e.type === "click" || e.key === "Enter") {
      e.preventDefault();
      setSearchText(localSearchText);
      setSelectCategory(
        localSelectCategory === "All Category" ? "" : localSelectCategory
      );
      if (localSearchText.trim()) {
        setIsSearchWindowOpen(true); // Open sliding window on search
      }
    }
  };

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
          {/* Search And Category */}
          <div className="hidden lg:flex items-center space-x-2">
            <form
              onSubmit={handleSearchSubmit}
              className="flex justify-center items-center rounded-md space-x-1 border-2 border-blue-500"
              ref={searchBarRef}
            >
              <input
                type="text"
                placeholder="Enter Product Name"
                className="w-96 p-2"
                value={localSearchText}
                onChange={handleSearchChange}
                onKeyPress={handleSearchSubmit}
              />
              <select
                name="Category"
                id="Category"
                className="border-l-2 border-blue-500 py-2 px-4"
                value={localSelectCategory}
                onChange={handleCategoryChange}
              >
                {searchCategories.map((item) => (
                  <option key={item.label} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="text-white bg-blue-600 py-2 px-3"
                onClick={handleSearchSubmit}
              >
                Search
              </button>
            </form>
          </div>
          {/* Icon Section */}
          <div className="flex item-center space-x-4">
            <Link
              to="/profile"
              className="hidden md:flex flex-col items-center justify-center"
            >
              <FaUser size={22} />
              <span className="text-gray-500 text-sm">Profile</span>
            </Link>
            <Link
              to="/messages"
              className="hidden md:flex flex-col items-center justify-center"
            >
              <MdOutlineMessage size={22} />
              <span className="text-gray-500 text-sm">Messages</span>
            </Link>
            <Link
              to="/favorites"
              className="hidden md:flex flex-col items-center justify-center"
            >
              <MdFavorite size={22} />
              <span className="text-gray-500 text-sm">Favorites</span>
            </Link>
            <Link
              to="/mycart"
              className="hidden md:flex flex-col items-center justify-center"
            >
              <FaShoppingCart size={22} />
              <span className="text-gray-500 text-sm">My Cart</span>
            </Link>
            <Link
              to="/mycart"
              className="md:hidden flex flex-col items-center justify-center"
            >
              <FaShoppingCart size={25} />
            </Link>
            <Link
              to="/profile"
              className="md:hidden flex flex-col items-center justify-center"
            >
              <FaUser size={25} />
            </Link>
          </div>
        </div>

        <div
          className="flex md:hidden items-center justify-center w-full relative"
          ref={searchBarRef}
        >
          <GoSearch size={22} className="absolute left-4 text-gray-500" />
          <input
            type="search"
            placeholder="Enter Product Name"
            className="w-full p-2 pl-10 border-[2px] border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search products on mobile"
            value={localSearchText}
            onChange={handleSearchChange}
            onKeyPress={handleSearchSubmit}
          />
        </div>

        {/* Sliding Search Results Window */}
        {isSearchWindowOpen && localSearchText.trim() && (
          <div
            ref={searchWindowRef}
            className="fixed md:left-0 right-6 md:right-[10%] bg-white border border-gray-300 shadow-lg z-50 max-h-96 overflow-y-auto transform transition-transform duration-300 ease-in-out lg:mx-auto w-[87%] md:w-[45%]"
            style={{
              top:
                searchBarRef.current?.getBoundingClientRect().bottom +
                window.scrollY +
                (window.innerWidth >= 768 ? 53 : 0) + // 53px for md and above, 20px for mobile
                "px",
            }}
          >
            <div className="p-4">
              {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
              ) : error ? (
                <div className="text-center text-red-500">Error: {error}</div>
              ) : products.length > 0 ? (
                <div className="space-y-2">
                  {products.map((product) => (
                    <Link
                      key={product._id}
                      to={`/ProductDetail/${product._id}`}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
                      onClick={() => setIsSearchWindowOpen(false)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-contain rounded"
                      />
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-green-600 font-semibold">
                          ${product.price?.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  No products found
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between space-x-3">
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

            <div className="flex overflow-x-auto md:overflow-visible [scrollbar-width:none] space-x-3 justify-start items-center font-semibold w-[calc(100vw-60px)]">
              {navCategories.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-nowrap whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
              <select name="Help" id="" className="whitespace-nowrap">
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

      {/* Mobile Sidebar */}
      <MblSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

export default Header;
