const mongoose = require("mongoose");
// User model schema
const profileSchema = new mongoose.Schema({
  profile: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Profile", profileSchema);
