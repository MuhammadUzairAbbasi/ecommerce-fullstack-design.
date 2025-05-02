import React from "react";
import { Link } from "react-router-dom";

const PagePath = () => {
  return (
    <nav className="hidden md:flex items-center text-sm mt-2 text-gray-500">
      <span className="flex items-center">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
      </span>
      <span className="mx-2">{">"}</span>
      <span className="flex items-center">
        <Link to="/clothing" className="hover:text-blue-600">
          Clothing
        </Link>
      </span>
      <span className="mx-2">{">"}</span>
      <span className="flex items-center">
        <Link to="/clothing/mens-wear" className="hover:text-blue-600">
          Men’s wear
        </Link>
      </span>
      <span className="mx-2">{">"}</span>
      <span className="flex items-center">
        <span className="text-gray-700">Summer clothing</span>
      </span>
    </nav>
  );
};

export default PagePath;
