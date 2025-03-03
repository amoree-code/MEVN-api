const router = require("express").Router();
const { Products, validateProduct } = require("../models/Product");
const { verifytoken } = require("../middlewares/verifyToken");

// CREATE
router.post("/", async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const newProducts = new Products({
      title: req.body.title,
      img: req.body.img,
      price: req.body.price,
    });
    const savedProduct = await newProducts.save();
    res.status(201).json(savedProduct);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

// GET All PRODUCTS
router.get("/", async (req, res) => {
  try {
    const prosucts = await Products.find();
    res.status(200).json(prosucts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const prosuct = await Products.findById(req.params.id);
    res.status(200).json(prosuct);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// DELETE PRODUCT
router.delete("/:id", verifytoken, async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted successfully");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
