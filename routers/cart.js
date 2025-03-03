const router = require("express").Router();
const { verifytoken } = require("../middlewares/verifyToken");
const Cart = require("../models/Cart");

// GET ALL CART
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "userId"
    );
    res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
