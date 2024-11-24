const mongoose = require("mongoose");

const inputOutput = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const calculationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  inputs: {
    type: [inputOutput],
    required: true,
  },
  outputs: {
    type: [inputOutput],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Calculation", calculationSchema);
