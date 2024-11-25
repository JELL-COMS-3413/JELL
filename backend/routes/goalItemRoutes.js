const express = require("express");
const router = express.Router();
const goalItem = require("../models/GoalItem");
const authMiddleware = require("../middleware/authMiddleware");

// POST /items - Add a new item
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, amount, goal } = req.body;

    const newGoalItem = new goalItem({
      title,
      amount,
      goal,
      user: req.user.id, // req.user is set by authMiddleware
    });

    const savedGoalItem = await newGoalItem.save();
    res.status(201).json(savedGoalItem);
  } catch (error) {
    console.error("Error adding goal item:", error);
    res.status(500).json({ error: "Failed to add goal item" });
  }
});

// GET /items - Get all items for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const items = await goalItem.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(items);
  } catch (error) {
    console.error("Error retrieving goal items:", error);
    res.status(500).json({ error: "Failed to retrieve goal items" });
  }
});

// Update an item
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, amount, goal } = req.body;

    // Find the item by ID and ensure it belongs to the authenticated user
    const foundGoalItem = await goalItem.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!foundGoalItem) {
      return res.status(404).json({ message: "Goal item not found" });
    }

    // Update the item's fields
    foundGoalItem.title = title || foundGoalItem.title;
    foundGoalItem.value = value || foundGoalItem.value;

    const updatedGoalItem = await foundGoalItem.save();
    res.json(updatedGoalItem);
  } catch (error) {
    console.error("Error updating goal item:", error);
    res.status(500).json({ error: "Failed to update goal item" });
  }
});

// Delete an item
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // Find the item by ID and ensure it belongs to the authenticated user
    const foundGoalItem = await goalItem.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!foundGoalItem) {
      return res.status(404).json({ message: "Goal item not found" });
    }

    await foundGoalItem.deleteOne({
      _id: req.params.id,
      user: req.user.id,
    });
    res.json({ message: "Goal item deleted successfully" });
  } catch (error) {
    console.error("Error deleting goal item:", error);
    res.status(500).json({ error: "Failed to delete goal item" });
  }
});

module.exports = router;
