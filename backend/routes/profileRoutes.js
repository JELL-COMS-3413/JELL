const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { profile } = req.body;

    const newProfile = new Profile({
      profile,
      user: req.user.id, // req.user is set by authMiddleware
    });

    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "Failed to add item" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.find({ user: req.user.id });
    res.json(profile);
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).json({ error: "Failed to retrieve items" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { profile } = req.body;

    // Find the profile by ID and ensure it belongs to the authenticated user
    const foundProfile = await Profile.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!foundProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Update the profile's fields
    foundProfile.profile = profile || foundProfile.profile;

    const updatedProfile = await foundProfile.save();
    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
