const express = require("express");
const router = express.Router();
const budgetItem = require("../models/BudgetItem");
const authMiddleware = require("../middleware/authMiddleware");

// POST /items - Add a new item
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, value } = req.body;

    const newBudgetItem = new budgetItem({
      title,
      value,
      user: req.user.id, // req.user is set by authMiddleware
    });

    const savedBudgetItem = await newBudgetItem.save();
    res.status(201).json(savedBudgetItem);
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Failed to add item" });
  }
});

// GET /items - Get all items for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const items = await budgetItem.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(items);
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Failed to retrieve items" });
  }
});

// Update an item
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, value } = req.body;

    // Find the item by ID and ensure it belongs to the authenticated user
    const foundBudgetItem = await budgetItem.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!foundBudgetItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update the item's fields
    foundBudgetItem.title = title || foundBudgetItem.title;
    foundBudgetItem.value = value || foundBudgetItem.value;

    const updatedBudgetItem = await foundBudgetItem.save();
    res.json(updatedBudgetItem);
  } catch (error) {
    console.error("Error updating budget item:", error);
    res.status(500).json({ error: "Failed to update budget item" });
  }
});

// Delete an item
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // Find the item by ID and ensure it belongs to the authenticated user
    const foundBudgetItem = await budgetItem.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!foundBudgetItem) {
      return res.status(404).json({ message: "Budget item not found" });
    }

    await foundBudgetItem.deleteOne({
      _id: req.params.id,
      user: req.user.id,
    });
    res.json({ message: "Budget item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

module.exports = router;
