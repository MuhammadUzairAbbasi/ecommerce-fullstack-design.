import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

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
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(products);
  } catch (error) {
    console.log("Error in getAllProduct controller");
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
    const product = await Product.findMany({ category: req.params.category });
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

const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    if (name || price | description || category || image) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    let imageUrl = "";
    if (image) {
      // Handle image upload to Cloudinary
      let result;
      if (image.startsWith("data:image")) {
        // Base64-encoded image
        result = await cloudinary.uploader.upload(image, {
          folder: "ecommerce_products",
          resource_type: "image",
        });
      } else if (image.startsWith("http")) {
        // URL of an image
        result = await cloudinary.uploader.upload(image, {
          folder: "ecommerce_products",
          resource_type: "image",
        });
      } else {
        return res.status(400).json({
          message: "Invalid image format. Provide a URL or base64 string.",
        });
      }
      imageUrl = result.secure_url;
    }

    const product = await Product.create({
      name,
      price,
      description,
      category,
      image: imageUrl || image,
      featured: featured || false,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log("Error in createProduct controller");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, image },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log("Error in updateProduct controller");
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Optionally delete the image from Cloudinary
    if (product.image && product.image.includes("cloudinary")) {
      const publicId = product.image.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(`ecommerce_products/${publicId}`);
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  getAllProducts,
  getProductbyId,
  getProductbyCategory,
  featuredProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
