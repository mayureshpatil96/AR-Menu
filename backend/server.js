import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import menuRoutes from "./routes/menuRoutes.js";

dotenv.config();

const app = express();

// ✅ Enable CORS before routes
app.use(cors({
  origin: "http://localhost:5173", // your React frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/menu", menuRoutes);

// ✅ Test route
app.get("/api/test", (req, res) => {
  res.json({
    message: "✅ Backend & MongoDB are working perfectly!",
    time: new Date(),
  });
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
