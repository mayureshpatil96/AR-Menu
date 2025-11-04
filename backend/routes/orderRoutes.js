import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

export default (io) => {
  // ✅ Place new order
  router.post("/", async (req, res) => {
    try {
      const { customerName, items, total } = req.body;

      const newOrder = new Order({
        customerName,
        items,
        total,
        status: "Pending",
      });

      const savedOrder = await newOrder.save();

      // 🔥 Emit new order to all connected clients (admin/cook dashboard)
      io.emit("new_order", savedOrder);

      res.status(201).json(savedOrder);
    } catch (err) {
      console.error("Error placing order:", err);
      res.status(500).json({ message: "Server Error" });
    }
  });

  // ✅ Get all orders
  router.get("/", async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  });

  // ✅ Update order status
  router.put("/:id/status", async (req, res) => {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

    // Notify clients about status update
    io.emit("order_updated", order);

    res.json(order);
  });

  return router;
};
