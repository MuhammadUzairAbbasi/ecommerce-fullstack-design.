import express from "express";
import {
  getAllProducts,
  getProductbyId,
  featuredProducts,
  getProductbyCategory,
  DiscountProducts,
  getConsumerGadetsProducts,
  HomeProducts,
  sendInquiry,
  subscribeNewsletter,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.get("/getProductsbyId/:id", getProductbyId);
router.get("/getProductsbyCategory/:category", getProductbyCategory);
router.get("/getDealProducts", DiscountProducts);
router.get("/featuredProducts", featuredProducts);
router.get("/getHomeProducts", HomeProducts);
router.get("/getConsumerGadetsProducts", getConsumerGadetsProducts);
router.post("/inquiries/send", sendInquiry);
router.post("/subscribe", subscribeNewsletter);

export default router;
