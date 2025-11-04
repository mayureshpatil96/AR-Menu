import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // we’ll keep userId as simple string for now
  items: [
    {
      dishId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
      name: String,
      price: Number,
      image: String,
      quantity: { type: Number, default: 1 },
    },
  ],
});

export default mongoose.model("Cart", cartSchema);
