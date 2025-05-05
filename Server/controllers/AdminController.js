import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

// Utility to convert buffer to stream for Cloudinary
const bufferToStream = (buffer) => {
  const readable = new Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
};

// Utility for retrying Cloudinary operations
const retryOperation = async (operation, maxRetries = 3, delayMs = 2000) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (error.http_code === 499 && attempt < maxRetries) {
        console.log(
          `Attempt ${attempt} failed with timeout. Retrying in ${delayMs}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }
      throw error; // Rethrow if not a timeout or max retries reached
    }
  }
};

export const addProduct = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    const { name, description, price, category } = req.body;

    // Check if an image file is provided
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "Image file is required." });
    }

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Upload image to Cloudinary with retry
    const file = req.files.image;
    const uploadOperation = () =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "ecommerce_products" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        bufferToStream(file.data).pipe(uploadStream);
      });

    const result = await retryOperation(uploadOperation);
    console.log("Cloudinary Upload Success:", result);

    // Create new product with the Cloudinary image URL
    const newProduct = new Product({
      name,
      description,
      price: parseFloat(price),
      image: result.secure_url,
      category,
      stock: 0,
      featured: false,
      discount: 0,
      rating: 0,
    });

    newProduct
      .save()
      .then((savedProduct) => {
        console.log("Product Saved:", savedProduct);
        res.status(201).json(savedProduct);
      })
      .catch((err) => {
        console.error("Save Error:", err);
        res
          .status(500)
          .json({ message: "Failed to save product", error: err.message });
      });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Extract Cloudinary public_id from the image URL
    const imageUrl = product.image;
    const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];
    const fullPublicId = `ecommerce_products/${publicId}`;

    // Delete image from Cloudinary with retry
    const deleteOperation = () =>
      cloudinary.uploader.destroy(fullPublicId, { resource_type: "image" });

    await retryOperation(deleteOperation);
    console.log("Cloudinary Image Deleted:", fullPublicId);

    // Delete the product from the database
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
