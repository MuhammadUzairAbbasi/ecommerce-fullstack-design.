import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Range } from "react-range";
import { ProductStore } from "../../store/ProductStore";

const SidebarFilter = () => {
  const { ConditionSelected, addCondition, removeCondition } = ProductStore();
  const [priceRange, setPriceRange] = useState({ min: 0, max: 999999 });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openSections, setOpenSections] = useState({
    category: true,
    brands: true,
    features: true,
    price: true,
    condition: true,
    ratings: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (values) => {
    setPriceRange({ min: values[0], max: values[1] });
  };

  const handleManualPriceChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    const name = e.target.name;
    setPriceRange((prev) => {
      if (name === "min" && value <= prev.max) {
        return { ...prev, min: value };
      }
      if (name === "max" && value >= prev.min) {
        return { ...prev, max: value };
      }
      return prev;
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="hidden md:flex flex-col w-1/5 p-4 bg-gray-100 text-gray-800">
      {/* Category Section */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("category")}
        >
          <h3 className="font-semibold text-lg mb-2">Category</h3>
          {openSections.category ? (
            <FaChevronUp className="w-4 h-4" />
          ) : (
            <FaChevronDown className="w-4 h-4" />
          )}
        </div>
        {openSections.category && (
          <div className="space-y-1">
            <button
              className={`w-full text-left py-1 px-2 hover:underline ${
                selectedCategory === "mobile-accessory" ? "text-blue-500" : ""
              }`}
              onClick={() => handleCategorySelect("mobile-accessory")}
            >
              Mobile accessory
            </button>
            <button
              className={`w-full text-left py-1 px-2 hover:underline ${
                selectedCategory === "electronics" ? "text-blue-500" : ""
              }`}
              onClick={() => handleCategorySelect("electronics")}
            >
              Electronics
            </button>
            <button
              className={`w-full text-left py-1 px-2 hover:underline ${
                selectedCategory === "smartphones" ? "text-blue-500" : ""
              }`}
              onClick={() => handleCategorySelect("smartphones")}
            >
              Smartphones
            </button>
            <button
              className={`w-full text-left py-1 px-2 hover:underline ${
                selectedCategory === "modern-tech" ? "text-blue-500" : ""
              }`}
              onClick={() => handleCategorySelect("modern-tech")}
            >
              Modern tech
            </button>
            <div>
              <a href="#" className="text-blue-500 hover:underline">
                See all
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Brands Section */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("brands")}
        >
          <h3 className="font-semibold text-lg mb-2">Brands</h3>
          {openSections.brands ? (
            <FaChevronUp className="w-4 h-4" />
          ) : (
            <FaChevronDown className="w-4 h-4" />
          )}
        </div>
        {openSections.brands && (
          <ul className="space-y-1">
            <li>
              <input
                type="checkbox"
                id="samsung"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="samsung">Samsung</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="apple"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="apple">Apple</label>
            </li>
            <li>
              <input type="checkbox" id="huawei" className="mr-2" />
              <label htmlFor="huawei">Huawei</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="pocco"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="pocco">Pocco</label>
            </li>
            <li>
              <input type="checkbox" id="lenovo" className="mr-2" />
              <label htmlFor="lenovo">Lenovo</label>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                See all
              </a>
            </li>
          </ul>
        )}
      </div>

      {/* Features Section */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("features")}
        >
          <h3 className="font-semibold text-lg mb-2">Features</h3>
          {openSections.features ? (
            <FaChevronUp className="w-4 h-4" />
          ) : (
            <FaChevronDown className="w-4 h-4" />
          )}
        </div>
        {openSections.features && (
          <ul className="space-y-1">
            <li>
              <input
                type="checkbox"
                id="metallic"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="metallic">Metallic</label>
            </li>
            <li>
              <input type="checkbox" id="plastic-cover" className="mr-2" />
              <label htmlFor="plastic-cover">Plastic cover</label>
            </li>
            <li>
              <input type="checkbox" id="8gb-ram" className="mr-2" />
              <label htmlFor="8gb-ram">8GB Ram</label>
            </li>
            <li>
              <input type="checkbox" id="super-power" className="mr-2" />
              <label htmlFor="super-power">Super power</label>
            </li>
            <li>
              <input type="checkbox" id="large-memory" className="mr-2" />
              <label htmlFor="large-memory">Large Memory</label>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:underline">
                See all
              </a>
            </li>
          </ul>
        )}
      </div>

      {/* Price Range Section */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("price")}
        >
          <h3 className="font-semibold text-lg mb-2">Price range</h3>
          {openSections.price ? (
            <FaChevronUp className="w-4 h-4" />
          ) : (
            <FaChevronDown className="w-4 h-4" />
          )}
        </div>
        {openSections.price && (
          <div className="relative">
            <div className="mb-4">
              <Range
                step={1}
                min={0}
                max={999999}
                values={[priceRange.min, priceRange.max]}
                onChange={handlePriceChange}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="h-1 bg-gray-300 rounded-full"
                    style={{ ...props.style }}
                  >
                    <div
                      className="absolute h-1 bg-blue-500 rounded-full"
                      style={{
                        left: `${(priceRange.min / 999999) * 100}%`,
                        width: `${
                          ((priceRange.max - priceRange.min) / 999999) * 100
                        }%`,
                      }}
                    />
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="h-4 w-4 bg-white border border-gray-300 rounded-full focus:outline-none"
                    style={{ ...props.style }}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <span className="flex flex-col space-y-1">
                <p>Min</p>
                <input
                  type="text"
                  name="min"
                  value={priceRange.min}
                  onChange={handleManualPriceChange}
                  className="p-2 bg-white border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </span>
              <span className="flex flex-col space-y-1">
                <p>Max</p>
                <input
                  type="text"
                  name="max"
                  value={priceRange.max}
                  onChange={handleManualPriceChange}
                  className="p-2 bg-white border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </span>
            </div>
            <button className="w-full bg-white text-blue-500 border border-gray-300 py-2 rounded-md hover:bg-gray-50">
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Condition Section */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("condition")}
        >
          <h3 className="font-semibold text-lg mb-2">Condition</h3>
          {openSections.condition ? (
            <FaChevronUp className="w-4 h-4" />
          ) : (
            <FaChevronDown className="w-4 h-4" />
          )}
        </div>
        {openSections.condition && (
          <ul className="space-y-1">
            <li>
              <input
                type="radio"
                id="any"
                name="condition"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="any">Any</label>
            </li>
            <li>
              <input
                type="radio"
                id="refurbished"
                name="condition"
                className="mr-2"
              />
              <label htmlFor="refurbished">Refurbished</label>
            </li>
            <li>
              <input
                type="radio"
                id="brand-new"
                name="condition"
                className="mr-2"
              />
              <label htmlFor="brand-new">Brand new</label>
            </li>
            <li>
              <input
                type="radio"
                id="old-items"
                name="condition"
                className="mr-2"
              />
              <label htmlFor="old-items">Old items</label>
            </li>
          </ul>
        )}
      </div>

      {/* Ratings Section */}
      <div className="mb-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("ratings")}
        >
          <h3 className="font-semibold text-lg mb-2">Ratings</h3>
          {openSections.ratings ? (
            <FaChevronUp className="w-4 h-4" />
          ) : (
            <FaChevronDown className="w-4 h-4" />
          )}
        </div>
        {openSections.ratings && (
          <ul className="space-y-1">
            <li>
              <input type="checkbox" id="5-stars" className="mr-2" />
              <label htmlFor="5-stars">
                <span className="text-yellow-500">★★★★★</span>
              </label>
            </li>
            <li>
              <input type="checkbox" id="4-stars" className="mr-2" />
              <label htmlFor="4-stars">
                <span className="text-yellow-500">★★★★☆</span>
              </label>
            </li>
            <li>
              <input type="checkbox" id="3-stars" className="mr-2" />
              <label htmlFor="3-stars">
                <span className="text-yellow-500">★★★☆☆</span>
              </label>
            </li>
            <li>
              <input type="checkbox" id="3-stars" className="mr-2" />
              <label htmlFor="3-stars">
                <span className="text-yellow-500">★★☆☆☆</span>
              </label>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SidebarFilter;
