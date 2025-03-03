const mongoose = require("mongoose");
const joi = require("joi");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

// Validation
function validateProduct(product) {
  const schema = joi.object({
    title: joi.string().required(),
    img: joi.string().required(),
    price: joi.number().required(),
  });
  return schema.validate(product);
}

const Products = mongoose.model("Product", ProductSchema);
module.exports = {
  Products,
  validateProduct,
};
