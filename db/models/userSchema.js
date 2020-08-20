const mongoose = require("mongoose");

const userSchema = mongoose.model(
  "users",
  mongoose.Schema({
    email: { type: String, unique: true, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
  })
);

module.exports = userSchema;
