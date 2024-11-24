const express = require("express");
const router = express.Router();
const calculation = require("../models/Calculation");
const authMiddleware = require("../middleware/authMiddleware");

// POST /items - Add a new item
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { type, inputs, outputs } = req.body;

    const newCalculation = new calculation({
      type,
      inputs,
      outputs,
      user: req.user.id, // req.user is set by authMiddleware
    });

    const savedCalculation = await newCalculation.save();
    res.status(201).json(savedCalculation);
  } catch (error) {
    console.error("Error adding calculation:", error);
    res.status(500).json({ error: "Failed to add calculation" });
  }
});

// GET /items - Get all items for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const calculations = await calculation.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(calculations);
  } catch (error) {
    console.error("Error retrieving calculations:", error);
    res.status(500).json({ error: "Failed to retrieve calculations" });
  }
});

// Delete an item
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // Find the item by ID and ensure it belongs to the authenticated user
    const foundCalculation = await calculation.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!foundCalculation) {
      return res.status(404).json({ message: "Calculation not found" });
    }

    await foundCalculation.deleteOne({
      _id: req.params.id,
      user: req.user.id,
    });
    res.json({ message: "Calculation deleted successfully" });
  } catch (error) {
    console.error("Error deleting calculation:", error);
    res.status(500).json({ error: "Failed to delete calculation" });
  }
});

module.exports = router;
