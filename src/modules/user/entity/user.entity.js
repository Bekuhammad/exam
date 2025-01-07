const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum:["admin","leader","manager","employee"],
  },
});

const UserModel = mongoose.model("User", userSchema, "users");

module.exports = { UserModel };
