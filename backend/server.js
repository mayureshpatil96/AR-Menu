import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import menuRoutes from "./routes/menuRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/menu", menuRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

  app.get("/api/test", (req, res) => {
    res.json({
      message: "✅ Backend & MongoDB are working perfectly!",
      time: new Date(),
    });
  });
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
