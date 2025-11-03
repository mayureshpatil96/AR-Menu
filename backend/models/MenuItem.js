import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  image: String,
  category: String,

  // ✅ use lowercase modelUrl for consistency
  modelUrl: {
    type: String,
  },
});

export default mongoose.model("MenuItem", menuItemSchema);
