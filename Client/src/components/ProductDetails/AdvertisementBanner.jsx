import React from "react";

const AdvertisementBanner = () => {
  return (
    <div className="hidden md:flex items-center justify-between w-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md p-4">
      <div>
        <p className="font-bold text-white">
          Super discount on more than 100 USD
        </p>
        <p className="text-sm text-white">
          Have you ever finally just write dummy info
        </p>
      </div>
      <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
        Shop now
      </button>
    </div>
  );
};

export default AdvertisementBanner;
