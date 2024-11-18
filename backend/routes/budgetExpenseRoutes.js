const express = require("express");
const router = express.Router();
const budgetExpense = require("../models/BudgetExpense");
const authMiddleware = require("../middleware/authMiddleware");

// POST /items - Add a new item
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { category, title, date, value } = req.body;

    const newBudgetExpense = new budgetExpense({
      category,
      title,
      date,
      value,
      user: req.user.id, // req.user is set by authMiddleware
    });

    const savedBudgetExpense = await newBudgetExpense.save();
    res.status(201).json(savedBudgetExpense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ error: "Failed to add expense" });
  }
});

// GET /items - Get all items for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await budgetExpense.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(expenses);
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    res.status(500).json({ error: "Failed to retrieve expenses" });
  }
});

// Update an item
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, value } = req.body;

    // Find the item by ID and ensure it belongs to the authenticated user
    const foundBudgetExpense = await budgetExpense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!foundBudgetExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Update the item's fields
    foundBudgetExpense.title = title || foundBudgetExpense.title;
    foundBudgetExpense.value = value || foundBudgetExpense.value;

    const updatedBudgetExpense = await foundBudgetExpense.save();
    res.json(updatedBudgetExpense);
  } catch (error) {
    console.error("Error updating budget expense:", error);
    res.status(500).json({ error: "Failed to update budget expense" });
  }
});

// Delete an item
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // Find the item by ID and ensure it belongs to the authenticated user
    const foundBudgetExpense = await budgetExpense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!foundBudgetExpense) {
      return res.status(404).json({ message: "Budget expense not found" });
    }

    await foundBudgetExpense.deleteOne({
      _id: req.params.id,
      user: req.user.id,
    });
    res.json({ message: "Budget expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

module.exports = router;
