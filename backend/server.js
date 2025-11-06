import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import menuRoutes from "./routes/menuRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();

// ✅ Create HTTP server (for socket.io)
const server = http.createServer(app);

// ✅ Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your frontend port
    methods: ["GET", "POST"],
  },
});

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ API routes
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Socket.IO connection event
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // Example: When admin updates order status
  socket.on("orderUpdated", (data) => {
    console.log("📦 Order updated:", data);
    io.emit("orderStatusChanged", data); // notify all clients
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
