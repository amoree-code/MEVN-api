const mongoose = require("mongoose");
const joi = require("joi");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8, max: 20 },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Validation
function validateUser(user) {
  const schema = joi.object({
    username: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).max(20).required(),
    isAdmin: joi.boolean(),
  });
  return schema.validate(user);
}

const User = mongoose.model("User", UserSchema);
module.exports = {
  User,
  validateUser,
};
