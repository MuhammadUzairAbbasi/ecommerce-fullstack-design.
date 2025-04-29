import React from "react";
import { Link } from "react-router-dom";


const RecommendItems = ({ data }) => {
  return (
    <div className="">
      <h2 className="text-xl px-3  md:text-2xl font-semibold text-gray-800 mb-4">
        Recommended Items
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item) => (
          <Link
            key={item._id}
            to={`/products/${item.id}`} // Adjust route as needed
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-contain p-4"
            />
            <div className="p-4">
              <p className="text-sm text-gray-600">${item.price}</p>
              <h3 className="text-sm font-medium text-gray-800 truncate">
                {item.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendItems;
