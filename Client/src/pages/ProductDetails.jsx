import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailsSection from "../components/ProductDetails/DetailsSection";
import ReviewSection from "../components/ProductDetails/ReviewSection";
import PagePath from "../components/PagePath";
import Footer from "../components/Footer";
import { ProductStore } from "../store/ProductStore";
import RelatedProducts from "../components/ProductDetails/RelatedProducts";
import AdvertisementBanner from "../components/ProductDetails/AdvertisementBanner";

const ProductDetails = () => {
  const { Id } = useParams();
  const { productwithId, fetchProductbyId } = ProductStore();

  useEffect(() => {
    fetchProductbyId(Id);
    console.log(Id);
  }, [Id]);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto md:px-14">
        <div className="flex flex-col mb-2 space-y-1 md:space-y-4">
          <PagePath />
          <DetailsSection product={productwithId} />
          <ReviewSection category={productwithId?.category} />
          <RelatedProducts Id={Id} />
          <AdvertisementBanner />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
