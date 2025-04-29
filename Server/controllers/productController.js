import Product from "../models/Product.js";
import Inquiry from "../models/Inquiry.js";
import Subscriber from "../models/Subscriber.js";
import cloudinary from "../config/cloudinary.js";
import { set } from "mongoose";

const getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    const products = await Product.find(query);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(products);
  } catch (error) {
    console.error("Error in getAllProducts controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getProductbyId = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log("Error in getProductbyId controller");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getProductbyCategory = async (req, res) => {
  try {
    const product = await Product.find({ category: req.params.category });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log("Error in getProductbyCategory Controller");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const featuredProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ featured: true });
    res.json(featuredProducts);
  } catch (error) {
    console.log("Error in featuredProducts controller");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const DiscountProducts = async (req, res) => {
  try {
    const discountProducts = await Product.find({ discount: { $gt: 0 } });
    res.json(discountProducts);
  } catch (error) {
    console.log("Error in DiscountProducts controller");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const HomeProducts = async (req, res) => {
  try {
    const homeProducts = await Product.find({ category: "Home and Outdoor" });
    res.json(homeProducts);
  } catch (error) {
    console.log("Error in HomeProducts controller");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const getConsumerGadetsProducts = async (req, res) => {
  try {
    const consumerGadetsProducts = await Product.find({
      category: "Consumer Electronics",
    });
    res.json(consumerGadetsProducts);
  } catch (error) {
    console.log("Error in getConsumerGadetsProducts controller");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const sendInquiry = async (req, res) => {
  try {
    const { item, details, quantity, unit } = req.body;
    if (!item || !quantity || !unit) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const inquiry = new Inquiry({
      item,
      details,
      quantity,
      unit,
    });

    await inquiry.save();
    res.status(201).json({ message: "Inquiry sent successfully" });
  } catch (error) {
    console.error("Error in sendInquiry controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    console.error("Error in subscribeNewsletter controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export {
  getAllProducts,
  getProductbyId,
  getProductbyCategory,
  featuredProducts,
  DiscountProducts,
  HomeProducts,
  getConsumerGadetsProducts,
  sendInquiry,
  subscribeNewsletter,
};
