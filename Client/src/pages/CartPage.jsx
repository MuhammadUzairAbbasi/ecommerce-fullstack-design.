import React, { useEffect } from "react";
import Carts from "../components/CartPageSections/Carts";
import SavedProducts from "../components/CartPageSections/SavedProducts";
import OurServices from "../components/CartPageSections/OurServices";
import AdvertisementBanner from "../components/ProductDetails/AdvertisementBanner";
import Footer from "../components/Footer";

const CartPage = () => {
  return (
    <div className="bg-gray-100 ">
      <div className="container mx-auto">
        <div className="flex flex-col md:px-14">
          <Carts />
          <OurServices />
          <SavedProducts />
          <AdvertisementBanner />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
