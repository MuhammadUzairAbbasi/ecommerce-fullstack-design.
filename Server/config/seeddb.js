import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import dbconnection from "./db.js";
import cloudinary from "./cloudinary.js";
import path from "path";
import fs from "fs";

dotenv.config();
dbconnection();

// Product data with images from the exported Figma folders
const techItems = [
  {
    name: "Smartphone Red",
    image: "assets/tech/1.jpg",
    price: 998.0,
    discount: 0,
    rating: 7.5,
  },
  {
    name: "Smartphone Multicolor",
    image: "assets/tech/2.jpg",
    price: 998.0,
    discount: 0,
    rating: 7.5,
  },
  {
    name: "Smartphone Black",
    image: "assets/tech/3.jpg",
    price: 998.0,
    discount: 0,
    rating: 7.5,
  },
  {
    name: "Smartphone Blue",
    image: "assets/tech/4.jpg",
    price: 998.0,
    discount: 0,
    rating: 7.5,
  },
  {
    name: "Gaming Headphones",
    image: "assets/tech/5.jpg",
    price: 199.0,
    discount: 10,
    rating: 7.0,
  },
  {
    name: "GoPro HERO6 4K Action Camera",
    image: "assets/tech/6.jpg",
    price: 998.0,
    discount: 25,
    rating: 7.5,
  },
  {
    name: "Laptop",
    image: "assets/tech/7.jpg",
    price: 1299.0,
    discount: 29,
    rating: 8.0,
  },
  {
    name: "Smart Watch",
    image: "assets/tech/8.jpg",
    price: 299.0,
    discount: 20,
    rating: 7.5,
  },
  {
    name: "Wireless Earbuds",
    image: "assets/tech/9.jpg",
    price: 149.0,
    discount: 5,
    rating: 7.0,
  },
  {
    name: "Electric Kettle",
    image: "assets/tech/10.jpg",
    price: 49.0,
    discount: 0,
    rating: 6.5,
  },
];

const interiorItems = [
  {
    name: "Armchair",
    image: "assets/interior/1.jpg",
    price: 199.0,
    discount: 0,
    rating: 7.0,
  },
  {
    name: "Modern Chair",
    image: "assets/interior/2.jpg",
    price: 149.0,
    discount: 0,
    rating: 7.0,
  },
  {
    name: "Decorative Pot",
    image: "assets/interior/3.jpg",
    price: 29.0,
    discount: 0,
    rating: 6.5,
  },
  {
    name: "Potted Plant",
    image: "assets/interior/4.jpg",
    price: 39.0,
    discount: 0,
    rating: 6.8,
  },
  {
    name: "Inflatable Mattress",
    image: "assets/interior/5.jpg",
    price: 89.0,
    discount: 10,
    rating: 7.0,
  },
  {
    name: "Table Lamp",
    image: "assets/interior/6.jpg",
    price: 35.0,
    discount: 5,
    rating: 6.8,
  },
  {
    name: "Magazine Rack",
    image: "assets/interior/7.jpg",
    price: 59.0,
    discount: 0,
    rating: 6.5,
  },
  {
    name: "Coffee Maker",
    image: "assets/interior/8.jpg",
    price: 99.0,
    discount: 0,
    rating: 7.2,
  },
  {
    name: "Juicer",
    image: "assets/interior/9.jpg",
    price: 69.0,
    discount: 0,
    rating: 7.0,
  },
  {
    name: "Washing Machine",
    image: "assets/interior/10.jpg",
    price: 499.0,
    discount: 15,
    rating: 7.5,
  },
];

const clothItems = [
  {
    name: "Mens Short Sleeve Polo Shirt Blue",
    image: "assets/cloth/1.jpg",
    price: 98.0,
    discount: 0,
    rating: 9.3,
  },
  {
    name: "Mens Short Sleeve Polo Shirt Light Blue",
    image: "assets/cloth/2.jpg",
    price: 98.0,
    discount: 0,
    rating: 8.5,
  },
  {
    name: "Denim Jacket",
    image: "assets/cloth/3.jpg",
    price: 120.0,
    discount: 10,
    rating: 8.0,
  },
  {
    name: "Denim Shorts",
    image: "assets/cloth/4.jpg",
    price: 65.0,
    discount: 0,
    rating: 7.5,
  },
  {
    name: "Backpack",
    image: "assets/cloth/5.jpg",
    price: 45.0,
    discount: 5,
    rating: 7.0,
  },
  {
    name: "Wallet",
    image: "assets/cloth/6.jpg",
    price: 25.0,
    discount: 0,
    rating: 6.8,
  },
  {
    name: "Formal Blazer",
    image: "assets/cloth/7.jpg",
    price: 150.0,
    discount: 0,
    rating: 7.5,
  },
];

const techImage = [
  { name: "Smart Watch", discount: 20 },
  { name: "GoPro HERO6 4K Action Camera", discount: 25 },
  { name: "Laptop", discount: 29 },
  { name: "Gaming Headphones", discount: 10 },
];

// Combine products into a single array
const products = [
  ...techItems.map((item) => ({
    name: item.name,
    price: item.price,
    image: item.image,
    description: `High-quality ${item.name.toLowerCase()} for your needs.`,
    category: "Consumer Electronics",
    stock: 50,
    featured: techImage.some((tech) => tech.name === item.name),
    discount: item.discount,
    rating: item.rating, // updated here
  })),
  ...interiorItems.map((item) => ({
    name: item.name,
    price: item.price,
    image: item.image,
    description: `Premium ${item.name.toLowerCase()} for your home.`,
    category: "Home and Outdoor",
    stock: 50,
    featured: false,
    discount: item.discount,
    rating: item.rating, // updated here
  })),
  ...clothItems.map((item) => ({
    name: item.name,
    price: item.price,
    image: item.image,
    description: `Stylish ${item.name.toLowerCase()} for all occasions.`,
    category: "Clothing",
    stock: 50,
    featured: false,
    discount: item.discount,
    rating: item.rating, // updated here
  })),
];

const seedDatabase = async () => {
  try {
    const forceReseed = process.argv.includes("--force");
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0 && !forceReseed) {
      console.log(
        "Products collection already populated. Use --force to reseed."
      );
      process.exit();
      return;
    }

    if (forceReseed) {
      await Product.deleteMany({});
      console.log("Cleared existing products due to --force flag.");
    }

    for (const product of products) {
      const imagePath = path.join(process.cwd(), product.image);
      if (fs.existsSync(imagePath)) {
        const result = await cloudinary.uploader.upload(imagePath, {
          folder: "ecommerce_products",
          public_id: product.name.toLowerCase().replace(/\s+/g, "_"),
        });
        product.image = result.secure_url;
        console.log(`Uploaded ${product.name}: ${product.image}`);
      } else {
        console.log(`Image not found: ${imagePath}, using default`);
        product.image = "/assets/default.png";
      }
    }

    await Product.insertMany(products);
    console.log("Database seeded with categorized product data!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

export default seedDatabase;
