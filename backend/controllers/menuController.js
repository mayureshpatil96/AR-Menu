import MenuItem from "../models/MenuItem.js";

// 🟢 Get all menu items
export const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Failed to fetch menu items" });
  }
};

// 🟢 Add new menu item
export const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, image, category, modelUrl } = req.body; // ✅ lowercase
    const newItem = new MenuItem({ name, description, price, image, category, modelUrl });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ message: "Failed to add menu item" });
  }
};

// 🔴 Delete a menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    await MenuItem.findByIdAndDelete(id);
    res.json({ message: "Menu item deleted" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Failed to delete menu item" });
  }
};
