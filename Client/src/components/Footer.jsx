import React from "react";
import logo from "../assets/logo-symbol.svg";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { TbBrandLinkedinFilled } from "react-icons/tb";
import { TiSocialInstagram } from "react-icons/ti";
import { FaYoutube } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { languages } from "../data/data";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-6 p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="E Commerce Platform logo" className="h-6" />
              <h1 className="font-bold text-xl text-blue-500">Brand</h1>
            </div>
            <p className="text-sm">
              Best Information about the Company gies here but now lorem ipsum
              is
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" aria-label="Facebook">
                <FaFacebook
                  size={25}
                  className="opacity-70 hover:text-blue-500"
                />
              </a>
              <a href="https://twitter.com" aria-label="Twitter">
                <AiFillTwitterCircle
                  size={25}
                  className="opacity-70 hover:text-blue-500"
                />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn">
                <TbBrandLinkedinFilled
                  size={25}
                  className="opacity-70 hover:text-blue-500"
                />
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <TiSocialInstagram
                  size={25}
                  className="opacity-70 hover:text-blue-500"
                />
              </a>
              <a href="https://youtube.com" aria-label="YouTube">
                <FaYoutube
                  size={25}
                  className="opacity-70 hover:text-blue-500"
                />
              </a>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-semibold">About</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/about" className="hover:text-blue-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-blue-500">
                  Find store
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-blue-500">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-blue-500">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Partnership Section */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-semibold">Partnership</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/about" className="hover:text-blue-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/store" className="hover:text-blue-500">
                  Find store
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-blue-500">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-blue-500">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Section */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-semibold ">Information</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/help" className="hover:text-blue-500">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-blue-500">
                  Money Refund
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-blue-500">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-500">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users Section */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-semibold">For users</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/login" className="hover:text-blue-500">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-500">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-blue-500">
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-blue-500">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Get App Section */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-sm font-semibold">Get app</h4>
            <div className="space-y-2">
              <a
                href="https://www.apple.com/app-store/"
                className="flex items-center justify-center gap-2 bg-black text-white text-center py-2 rounded-lg hover:bg-gray-800"
                aria-label="Download on the App Store"
              >
                <FaApple size={35} />{" "}
                <span className="flex flex-col text-xl">
                  {" "}
                  <p className="text-xs">Download on the </p> App Store
                </span>
              </a>
              <a
                href="https://play.google.com"
                className="flex items-center justify-center gap-2 bg-black text-white text-center p-2 rounded-lg hover:bg-gray-800"
                aria-label="Get it on Google Play"
              >
                <IoLogoGooglePlaystore size={35} />{" "}
                <span className="flex flex-col text-xl">
                  {" "}
                  <p className="text-xs">Get it on</p> Google Play
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Language Selector */}
        <div className="flex justify-between items-center border-t bg-gray-100 border-gray-300 p-4">
          <p className="text-sm">© 2023 Ecommerce.</p>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <select
              name="language"
              id="language"
              className="border-none bg-transparent text-sm focus:outline-none"
              aria-label="Select language"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {`${lang.language}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
