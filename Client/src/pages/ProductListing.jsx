import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PagePath from "../components/PagePath";
import Footer from "../components/Footer";
import SidebarFilter from "../components/ProductListing Page/SidebarFilter";
import { ProductStore } from "../store/ProductStore";
import { IoGrid } from "react-icons/io5";
import { ImMenu } from "react-icons/im";
import { CiHeart } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { MdOutlineSort } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const ProductListing = () => {
  const [categories, setCategories] = useState([
    "Huawei",
    "Samsung",
    "Apple",
    "Oppo",
    "Vivo",
    "Xiaomi",
  ]);
  const [listView, setListView] = useState(true);
  const { products, fetchProducts } = ProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800">
      <div className="container mx-auto md:p-6 space-y-4">
        <PagePath />
        <div className="flex flex-col md:flex-row md:p-4 rounded-lg mb-4">
          {/* Left Side */}
          <SidebarFilter />
          {/* Right Side */}
          <div className="w-full md:w-3/4 flex flex-col md:p-4">
            <div className="bg-white px-4 rounded-lg space-x-1 flex justify-center md:justify-between items-center mb-4">
              <p className="hidden lg:block text-gray-800">
                {products.length} items in{" "}
                <span className="font-semibold">Mobile Accersories</span>
              </p>

              <button className="md:hidden flex items-center space-x-2 bg-white border border-gray-300 py-1 px-4 rounded-md text-gray-800 hover:bg-gray-100">
                <span className="text-nowrap">Sort: Newest</span>
                <MdOutlineSort className="w-5 h-5" />
              </button>

              {/* Filter Button */}
              <button className="md:hidden flex items-center space-x-2 bg-white border border-gray-300 py-1 px-4 rounded-md text-gray-800 hover:bg-gray-100">
                <span className="text-nowrap">Filter (3)</span>
                <CiFilter className="w-5 h-5" />
              </button>

              <div className="flex items-center md:space-x-4">
                <label htmlFor="Verfied" className="hidden lg:block">
                  <input type="checkbox" name="Verified" id="" /> Verified only
                </label>
                {/* Sort Button */}

                <select
                  className="hidden md:block border border-gray-600 pr-14 py-2 px-4 rounded-md"
                  name="Type of Product"
                  id=""
                >
                  <option className="text-start" value="Featured">
                    Featured
                  </option>
                </select>

                <div className="flex items-center justify-center md:px-4 py-2 rounded-md ">
                  <button
                    className={`${
                      !listView ? "bg-gray-200" : ""
                    } flex items-center justify-center border p-2 pr-2`}
                    onClick={() => setListView(!listView)}
                  >
                    <IoGrid className="w-5 md:w-7" />
                  </button>
                  <button
                    className={`${
                      listView ? "bg-gray-200" : ""
                    } flex items-center justify-center border p-2 pl-2`}
                    onClick={() => setListView(!listView)}
                  >
                    <ImMenu className="w-5 md:w-7" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex overflow-x-auto [scrollbar-width:none]  space-x-2 px-2 mb-4 ">
              {categories.map((category, index) => (
                <div className="border border-blue-700 py-1 px-2 space-x-2 flex items-center rounded-md bg-blue-50 text-blue-700 font-semibold">
                  <span className="text-gray-500">{category}</span>
                  <button
                    onClick={() => {
                      setCategories((prev) =>
                        prev.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    <IoClose className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>

            <div
              className={`overflow-y-auto md:px-0 px-2 ${
                listView
                  ? "flex flex-col items-center justify-center "
                  : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              } h-full`}
            >
              {products.map((product) =>
                listView ? (
                  // Horizontal List View (like the first image)
                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    className="flex items-start bg-white shadow-md rounded-lg p-4 mb-4 w-full hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 md:w-36 md:h-36 object-contain mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        <span className="text-lg font-bold text-gray-800">
                          $
                          {product.discount > 0
                            ? (
                                product.price -
                                (product.price * product.discount) / 100
                              ).toFixed(2)
                            : product.price.toFixed(2)}
                        </span>
                        {product.discount > 0 && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-500">
                          {"★".repeat(Math.ceil(product.rating / 2))}
                          {"☆".repeat(5 - Math.ceil(product.rating / 2))}
                        </span>
                        <span className="text-sm text-gray-600 ml-1">
                          {product.rating.toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-600 ml-2">
                          • {product.stock} Orders
                        </span>
                        <span className="hidden md:block text-sm text-green-600 ml-2">
                          • Free Shipping
                        </span>
                      </div>
                      <span className="md:hidden block text-md font-semibold text-green-400 ml-2">
                        Free Shipping
                      </span>
                      <p className="hidden md:block text-sm text-gray-600 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                      <button className="hidden md:block text-blue-700 text-sm font-semibold mt-1 hover:underline">
                        View details
                      </button>
                    </div>
                    <button className="ml-4 border shadow-md rounded-lg p-2  text-blue-700">
                      <CiHeart className={`w-6 h-6`} />
                    </button>
                  </Link>
                ) : (
                  // Vertical Grid View (like the second image)
                  <Link
                    key={product._id}
                    to={`/products/${product._id}`}
                    className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-36 object-contain mb-2"
                    />
                    <div className="text-start ">
                      <div className="flex justify-start space-x-2 items-center mb-1">
                        <span className="text-md font-semibold text-gray-800">
                          $
                          {product.discount > 0
                            ? (
                                product.price -
                                (product.price * product.discount) / 100
                              ).toFixed(2)
                            : product.price.toFixed(2)}
                        </span>
                        {product.discount > 0 && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        )}

                        <button className="border shadow-md rounded-lg p-2 relative left-36  text-blue-700">
                          <CiHeart className={`w-5 h-5`} />
                        </button>
                      </div>
                      <span className="text-yellow-500">
                        {"★".repeat(Math.ceil(product.rating / 2))}
                        {"☆".repeat(5 - Math.ceil(product.rating / 2))}
                      </span>
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating.toFixed(1)}
                      </span>
                      <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
                        {product.name}
                      </h3>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListing;
