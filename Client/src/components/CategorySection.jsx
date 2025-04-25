import React from "react";
import { Link } from "react-router-dom";

const CategorySection = ({ title, bannerImage, products }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow">
      {/* Banner Section */}
      <h4 className="text-xl py-2 px-4 font-bold text-gray-800 mb-2 md:hidden">
        {title}
      </h4>
      <div
        className="hidden md:flex flex-col justify-start items-start py-8 px-6 w-72"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="text-lg text-wrap md:text-xl font-bold text-gray-800 mb-2">
          {title}
        </h2>
        <button className="bg-white font-semibold text-gray-800 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100">
          Source now
        </button>
      </div>

      {/* Product Grid */}
      <div className="flex overflow-x-auto md:grid md:grid-cols-4 w-full">
        {products.map((product, index) => (
          <Link
            key={index}
            to={`/products/${product._id}`} // Assuming each product has an _id for routing
            className="flex flex-col-reverse md:flex-row md:items-start justify-between bg-white p-4 hover:bg-gray-100 text-center border"
          >
            <div className="flex flex-col">
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
          </Link>
        ))}
      </div>

      {/* Mobile Source Now Button */}
      <button className="md:hidden inline-block text-xl font-bold text-start text-blue-400 py-2 px-4 rounded-lg hover:text-blue-800">
        Source now
      </button>
    </div>
  );
};

export default CategorySection;



