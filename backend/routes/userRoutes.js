const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
require("dotenv").config();
// Registration route
router.post("/register", async (req, res) => {
  try {
    const { username, password, firstname, lastname } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      firstname,
      lastname,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});
// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("username in login route", username);
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Create and return JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, username });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
    console.error("Error:", error);
  }
});

router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).sort({
      createdAt: -1,
    });
    res.json({ firstname: user.firstname, lastname: user.lastname });
    console.log(user);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ error: "Failed to retrieve user data" });
  }
});

router.put("/:username", async (req, res) => {
  try {
    const { firstname, lastname } = req.body;
    const foundUser = await User.findOne({
      username: req.params.username,
    }).sort({
      createdAt: -1,
    });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    foundUser.firstname = firstname || foundUser.firstname;
    foundUser.lastname = lastname || foundUser.lastname;
    const updatedUser = await foundUser.save();
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating first and last name:", error);
    res.status(500).json({ error: "Failed to update first and last name" });
  }
});

module.exports = router;
