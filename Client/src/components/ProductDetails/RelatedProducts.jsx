import React, { useState, useEffect } from "react";
import { ProductStore } from "../../store/ProductStore";
import Loader from "../Loader";
import { Link } from "react-router-dom";

const RelatedProducts = ({ Id }) => {
  const { featuredProducts, fetchFeaturedProducts } = ProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [Id]);

  return (
    <div className="bg-white rounded-lg p-2 flex flex-col items-start justify-center space-y-2">
      <h4 className="font-bold text-xl">Related Products</h4>
      <div className="flex overflow-x-auto md:grid md:grid-cols-6 md:gap-3">
        {featuredProducts.length < 0 ? (
          <Loader />
        ) : (
          featuredProducts.slice(0, 6).map((product, index) => (
            <Link
              key={product._id}
              to={"/ProductDetail/" + product._id}
              className="bg-white hover:bg-gray-100 p-4 shadow border text-center space-x-3 space-y-1 flex-shrink-0  "
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-24 md:h-32 object-contain mb-2"
              />
              <div className="flex flex-col items-start justify-center space-y-1">
                <h4 className="text-sm font-medium">{product.name}</h4>
                <p className="inline-block text-gray-400 text-start text-sm font-semibold  px-4  rounded-xl">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
