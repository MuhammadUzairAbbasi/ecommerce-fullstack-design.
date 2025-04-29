import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    item: { type: String, required: true },
    details: { type: String },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;
