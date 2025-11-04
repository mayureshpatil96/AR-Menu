import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  total: Number,
  status: {
    type: String,
    enum: ["Pending", "Preparing", "Completed"],
    default: "Pending",
  },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
