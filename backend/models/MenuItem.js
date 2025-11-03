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

  // 👇 new field for 3D model URL
  modelURL: {
    type: String,
    required: false, // optional
  },
});

export default mongoose.model("MenuItem", menuItemSchema);
