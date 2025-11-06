import express from "express";
const router = express.Router();
import Order from "../models/Order.js";



// Get all orders (for user - later filter by userId)
router.get("/user", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Update order status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let { items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    // 🧹 Remove _id fields from cart items
    const cleanItems = items.map(({ _id, ...rest }) => rest);

    const newOrder = new Order({
      items: cleanItems,
      totalAmount,
      status: "Pending",
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
});

export default router;
