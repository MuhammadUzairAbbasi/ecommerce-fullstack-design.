import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  cart: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
      image: { type: String },
    },
  ],
  favorites: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  orders: [
    {
      orderId: { type: String, required: true, unique: true },
      products: [
        {
          productId: { type: String, required: true },
          name: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true },
          image: { type: String },
        },
      ],
      total: { type: Number, required: true },
      status: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
        default: "pending",
      },
      date: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("User", userSchema);
