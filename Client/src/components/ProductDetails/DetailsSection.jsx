import React, { useState, useEffect } from "react";
import { ProductStore } from "../../store/ProductStore";
import { AuthStore } from "../../store/AuthStore";
import { MdOutlineMessage } from "react-icons/md";
import { MdShoppingBasket } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import DE from "../../assets/flags/DE.png";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import Loader from "../Loader";

const DetailsSection = ({ product }) => {
  const [fulldescription, setfulldescription] = useState(false);
  const { user } = AuthStore();
  const { addtoCart, addtoFavourites } = ProductStore();

  useEffect(() => {
    console.log("User : ", user);
  }, []);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex flex-col md:flex-row justify-center bg-white shadow-md rounded-lg p-4">
      <div className="md:w-1/3 flex flex-col justify-center h-full">
        <img
          className="border md:h-72 w-full md:w-96 object-contain"
          src={product.image}
          alt={product.name}
        />
        <div className="hidden md:flex flex-wrap items-center justify-center space-x-2 mt-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <img
              key={index}
              className="w-14 h-14 border"
              src={product.image}
              alt={product.name}
            />
          ))}
        </div>
      </div>

      <div className="md:w-1/3 flex flex-col items-start justify-center p-4">
        <p
          className={`font-semibold hidden md:flex items-center mb-2 ${
            product.stock > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          <span className="mr-1">{product.stock > 0 ? "✔" : "✘"}</span>
          {product.stock > 0 ? "In stock" : "Out of stock"}
        </p>
        <div className="flex flex-col-reverse md:flex-col items-start justify-center w-full">
          <h1 className="text-nowrap md:text-wrap text-2xl font-semibold text-gray-800 text-left mb-2">
            {product.name}
          </h1>
          <div className="flex items-center space-x-2 mb-2">
            <span className="flex items-center space-x-1 text-yellow-500">
              <span>
                {"★".repeat(Math.floor(product.rating / 2))}
                {"☆".repeat(5 - Math.floor(product.rating / 2))}
              </span>
              <span>{(product.rating / 2).toFixed(1)}</span>
            </span>
            <GoDotFill className="text-gray-300" />

            <span className="flex items-center space-x-2 text-md text-gray-600">
              <MdOutlineMessage />
              <span className="text-nowrap">32 reviews</span>
            </span>
            <GoDotFill className="text-gray-300" />

            <span className="flex items-center space-x-2 text-md text-gray-600">
              <MdShoppingBasket />
              <span className="text-nowrap">158 sold</span>
            </span>
          </div>
        </div>

        {/* Price and Bulk Pricing */}
        <div className="flex items-center justify-start md:space-x-8 w-full md:bg-orange-100 p-4 rounded-md mb-4">
          <span className="flex md:flex-col items-center space-x-2 md:space-x-0 md:items-start justify-center text-xl text-orange-600">
            <span className="text-2xl font-bold">
              $
              {(product.discount > 0
                ? product.price - (product.price * product.discount) / 100
                : product.price
              ).toFixed(2)}
            </span>
            <span className="text-base md:text-sm text-gray-600 text-nowrap">
              50-100 pcs
            </span>
          </span>

          <span className="hidden md:flex flex-col items-start border-l pl-1 border-gray-400 justify-center text-xl text-black">
            <span className="font-bold">
              $
              {(product.discount > 0
                ? product.price - (product.price * product.discount) / 100
                : product.price
              ).toFixed(2) - 8}
            </span>
            <span className="text-sm text-gray-600">100-700 pcs</span>
          </span>

          <span className="hidden md:flex flex-col items-start border-l border-gray-400 pl-1 justify-center text-xl text-black">
            <span className="font-bold">
              $
              {(product.discount > 0
                ? product.price - (product.price * product.discount) / 100
                : product.price
              ).toFixed(2) - 20}
            </span>
            <span className="text-sm text-gray-600">700+ pcs</span>
          </span>
        </div>

        <div className="md:hidden flex items-center justify-center w-full space-x-2 mb-2">
          <button
            onClick={() => {
              addtoCart(user.id, product._id);
            }}
            className="bg-blue-500 text-white w-[90%] rounded-lg py-2 hover:bg-blue-700 font-semibold"
          >
            Send Inquiry
          </button>
          <button
            onClick={() => {
              addtoFavourites(user.id, product._id);
            }}
            className="shadow-lg text-blue-500 rounded-lg p-2"
          >
            <CiHeart className="w-7 h-7" />
          </button>
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-2 text-sm text-left w-full">
          <div className="hidden md:grid grid-cols-3 w-full">
            <span className="col-span-1 font-semibold">Price:</span>
            <span className="col-span-2">Negotiable</span>
          </div>

          <div className="hidden md:block w-full h-px bg-gray-400"></div>

          <div className="hidden md:grid grid-cols-3 w-full">
            <div className="col-span-1 flex flex-col space-y-2">
              <span className="font-semibold">Type:</span>
              <span className="font-semibold">Material:</span>
              <span className="font-semibold">Design:</span>
            </div>
            <div className="col-span-2 flex flex-col space-y-2">
              <span>{product.category}</span>
              <span>Plastic material</span>
              <span>Modern nice</span>
            </div>
          </div>

          <div className="hidden md:block w-full h-px bg-gray-400"></div>

          <div className="hidden md:grid grid-cols-3 w-full">
            <div className="col-span-1 flex flex-col space-y-5">
              <span className="font-semibold">Customization:</span>
              <span className="font-semibold">Protection:</span>
              <span className="font-semibold">Warranty:</span>
            </div>
            <div className="col-span-2 flex flex-col space-y-2">
              <span>Customized logo and design custom packages</span>
              <span>Refund</span>
              <span>2 years full warranty</span>
            </div>
          </div>

          <div className="md:hidden grid grid-cols-3 w-full">
            <div className="col-span-1 flex flex-col space-y-5">
              <span className="font-semibold">Condition:</span>
              <span className="font-semibold">Material:</span>
              <span className="font-semibold">Category:</span>
              <span className="font-semibold">Item num:</span>
            </div>
            <div className="col-span-2 flex flex-col space-y-5">
              <span>Brand New</span>
              <span>Pastic</span>
              <span>{product.category}</span>
              <span>{product._id}</span>
            </div>
          </div>

          <div className="md:hidden w-full">
            <div className="">
              <p
                className={`text-sm text-gray-700 ${
                  fulldescription ? "" : "line-clamp-2"
                }`}
              >
                {product.description}
              </p>
              <button
                className="text-blue-500 font-bold uppercase text-sm mt-2"
                onClick={() => setfulldescription(!fulldescription)}
              >
                {fulldescription ? "Read less" : "Read more"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:w-1/3 flex flex-col items-center md:px-10 py-4">
        <div className="flex flex-col items-start border border-gray-200 p-2 space-y-4 w-full">
          <div className="flex space-x-3 items-center px-1">
            <span className="w-14 h-14 bg-blue-100 text-2xl rounded-lg flex items-center font-bold justify-center text-blue-400">
              {product.name.charAt(0)}
            </span>
            <span className="text-xl  text-gray-800">
              Seller <span className="md:text-nowrap">Guanji Trading LLC</span>
            </span>
          </div>
          <div className="w-full bg-gray-300 h-px"></div>
          <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 w-full md:px-1 text-sm text-gray-600">
            <div className="flex items-center space-x-1 md:space-x-3">
              <img className="w-5 h-5" src={DE} alt="GB" />
              <span className="flex items-center space-x-1">
                Germany<span className="hidden md:block">, Berlin</span>{" "}
              </span>
            </div>
            <div className="flex items-center space-x-1 md:space-x-3">
              <MdOutlineVerifiedUser className="w-5 h-5 " />
              <span className="text-nowrap">Verified Seller</span>
            </div>
            <div className="flex items-center space-x-1 md:space-x-3">
              <CiGlobe className="w-5 h-5 " />
              <span className="text-nowrap">Worldwide shipping</span>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-center justify-center w-full space-y-2">
            <button
              onClick={() => {
                addtoCart(user.id, product._id);
              }}
              className="bg-blue-500 text-white w-[95%] rounded-lg py-2 hover:bg-blue-700 font-semibold"
            >
              Send Inquiry
            </button>
            <button className="text-blue-600 border-2 w-[95%] rounded-lg py-2 border-blue-500 hover:border-blue-700 font-semibold">
              Seller's Profile
            </button>
          </div>
        </div>

        <div className="hidden md:block w-full bg-gray-300 h-px"></div>
        <div className="hidden md:flex items-center justify-center text-blue-500 hover:text-blue-700 space-x-3 mt-4">
          <button
            className="flex space-x-2"
            onClick={() => {
              addtoFavourites(user.id, product._id);
            }}
          >
            <CiHeart className="w-7 h-7" />
            <span className="text-md font-semibold">Save for Later</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
