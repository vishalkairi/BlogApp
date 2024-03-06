const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    min: 4,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
