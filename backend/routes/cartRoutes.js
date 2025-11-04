import express from "express";
const router = express.Router();

let cart = []; // temporary in-memory storage

// ✅ Get all cart items
router.get("/", (req, res) => {
  res.json(cart);
});

// ✅ Add to cart
router.post("/", (req, res) => {
  const { name, price, quantity, image } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "Missing name or price" });
  }

  const newItem = {
    _id: Date.now().toString(),
    name,
    price,
    quantity: quantity || 1,
    image,
  };

  cart.push(newItem);
  res.status(201).json(newItem);
});

// ✅ Delete from cart
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  cart = cart.filter((item) => item._id !== id);
  res.json({ message: "Item removed successfully", cart });
});

export default router;
