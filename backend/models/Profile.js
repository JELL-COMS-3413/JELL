const mongoose = require("mongoose");
// User model schema
const profileSchema = new mongoose.Schema({
  profile: { type: String },
  bio: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
