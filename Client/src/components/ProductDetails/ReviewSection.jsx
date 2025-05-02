import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductStore } from "../../store/ProductStore";
import Loader from "../Loader";

const ReviewSection = ({ category }) => {
  const [showDescription, setShowDescription] = useState(true);
  const [showReview, setShowReview] = useState(false);
  const [showShipping, setshowShipping] = useState(false);
  const [showAbout, setAbout] = useState(false);
  const { productsbyCategory, fetchProductbyCategory } = ProductStore();

  useEffect(() => {
    fetchProductbyCategory(category);
    console.log("data", productsbyCategory);
  }, [category]);

  if (!productsbyCategory) {
    return <Loader />;
  }

  return (
    <div className="hidden md:flex  justify-center">
      <div className="w-4/5 flex flex-col justify-start items-start bg-white p-2">
        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            className={`pb-2 text-sm font-semibold ${
              showDescription
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => {
              setShowDescription(true);
              setShowReview(false);
              setshowShipping(false);
              setAbout(false);
            }}
          >
            Description
          </button>
          <button
            className={`pb-2 text-sm font-semibold ${
              showReview
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => {
              setShowDescription(false);
              setShowReview(true);
              setshowShipping(false);
              setAbout(false);
            }}
          >
            Reviews
          </button>
          <button
            className={`pb-2 text-sm font-semibold ${
              showShipping
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => {
              setShowDescription(false);
              setShowReview(false);
              setshowShipping(true);
              setAbout(false);
            }}
          >
            Shipping
          </button>
          <button
            className={`pb-2 text-sm font-semibold ${
              showAbout
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => {
              setShowDescription(false);
              setShowReview(false);
              setshowShipping(false);
              setAbout(true);
            }}
          >
            About Seller
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {showDescription && (
            <div>
              {/* Description Paragraph */}
              <p className="text-sm text-gray-700 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur.
              </p>

              {/* Table */}
              <div className=" rounded-md mb-4">
                <div className=" w-2/4 grid grid-cols-2 text-sm">
                  <div className="bg-gray-100 p-2 flex flex-col space-y-3">
                    <span className="font-semibold text-gray-800">Model</span>
                    <span className="font-semibold text-gray-800">Style</span>
                    <span className="font-semibold text-gray-800">
                      Certificate
                    </span>
                    <span className="font-semibold text-gray-800">Size</span>
                    <span className="font-semibold text-gray-800">Memory</span>
                  </div>
                  <div className="p-2 flex flex-col space-y-3">
                    <span className="text-gray-700">#878697</span>

                    <span className="text-gray-700">Classical</span>

                    <span className="text-gray-700">ISO 8899212</span>

                    <span className="text-gray-700">34m x 450mm x 10mm</span>

                    <span className="text-gray-700">36GB</span>
                  </div>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Some great feature name here
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Lorem ipsum dolor sit amet, consectetur
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Lorem ipsum dolor sit amet, consectetur
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Lorem ipsum dolor sit amet, consectetur
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✔</span>
                  Lorem ipsum dolor sit amet, consectetur
                </li>
              </ul>
            </div>
          )}
          {showReview && (
            <div>
              <p className="text-sm text-gray-700">
                Reviews content goes here...
              </p>
            </div>
          )}
          {showShipping && (
            <div>
              <p className="text-sm text-gray-700">
                Shipping content goes here...
              </p>
            </div>
          )}
          {showAbout && (
            <div>
              <p className="text-sm text-gray-700">
                About Seller content goes here...
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="w-1/5 flex flex-col justify-center bg-white shadow-lg rounded-lg p-4">
        <h2 className="font-bold uppercase text-gray-800 text-lg mb-4">
          You may like
        </h2>
        <div className="flex flex-col space-y-4 w-full">
          {productsbyCategory.slice(0, 5).map((product, index) => (
            <Link
              key={index}
              className="flex items-center space-x-3"
              to={`/ProductDetail/${product._id}`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-md"
              />
              <div className="flex flex-col">
                <p className="font-semibold text-gray-800">{product.name}</p>
                <div className="flex space-x-2 text-sm">
                  <span className="line-through text-gray-500">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-orange-500">
                    $
                    {product.price.toFixed(2) -
                      ((product.price.toFixed(2) * product.discount.toFixed(2)) /
                        100)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
