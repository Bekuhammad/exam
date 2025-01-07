
const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "leader", "manager", "employee"],
  },
});

const Auth = mongoose.model("Auth", authSchema);

module.exports = { Auth };
