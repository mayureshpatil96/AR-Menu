import express from "express";
import {
  getMenuItems,
  addMenuItem,
  deleteMenuItem
} from "../controllers/menuController.js";

const router = express.Router();

// Fetch all menu items
router.get("/", getMenuItems);

// Add a new menu item
router.post("/", addMenuItem);

// Delete a menu item by ID
router.delete("/:id", deleteMenuItem);

export default router;
