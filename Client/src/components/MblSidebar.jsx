import React from "react";
import {
  FaUser,
  FaHome,
  FaList,
  FaHeart,
  FaBox,
  FaGlobe,
  FaPhone,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import { AuthStore } from "../store/AuthStore";
import { Link } from "react-router-dom";

const MblSidebar = ({ isOpen, setIsOpen }) => {
  const { user } = AuthStore();
  const toggleSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 h-screen w-64 bg-gray-50 flex flex-col p-4 space-y-4 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2 border-b pb-4">
          <FaUser className="text-gray-600" size={20} />
          <Link
            to="/signin"
            className="text-gray-800 font-medium hover:text-blue-600"
          >
            {user ? user.name : "Sign in | Register"}
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2 border-b pb-4">
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <FaHome className="text-gray-600" size={20} />
            <span>Home</span>
          </Link>
          <Link
            to="/ProductsList"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <FaList className="text-gray-600" size={20} />
            <span>Categories</span>
          </Link>
          <Link
            to="/mycart"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <FaHeart className="text-gray-600" size={20} />
            <span>Favorites</span>
          </Link>
          <Link
            to="/mycart"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <FaBox className="text-gray-600" size={20} />
            <span>My orders</span>
          </Link>
        </div>

        {/* Language/Currency */}
        <div className="flex items-center space-x-2 border-b pb-4">
          <FaGlobe className="text-gray-600" size={20} />
          <span className="text-gray-800">English | USD</span>
        </div>

        {/* Additional Links */}
        <div className="flex flex-col space-y-2">
          <Link
            to="/contact"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <FaPhone className="text-gray-600" size={20} />
            <span>Contact us</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
          >
            <FaInfoCircle className="text-gray-600" size={20} />
            <span>About</span>
          </Link>
          <Link
            to="/user-agreement"
            className="text-gray-800 hover:text-blue-600"
          >
            User agreement
          </Link>
          <Link to="/partnership" className="text-gray-800 hover:text-blue-600">
            Partnership
          </Link>
          <Link
            to="/privacy-policy"
            className="text-gray-800 hover:text-blue-600"
          >
            Privacy policy
          </Link>
        </div>
      </div>

      {/* Overlay (Backdrop) */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default MblSidebar;
