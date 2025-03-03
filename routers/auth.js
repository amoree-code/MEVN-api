const router = require("express").Router();
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const { User, validateUser } = require("../models/User");

//REGISTER
router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  try {
    const findUser = await User.findOne({
      email: req.body.email,
    });
    if (findUser) return res.status(404).json("email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    !user && res.status(401).json("Wrong credentials");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    !validPassword && res.status(401).json("Wrong credentials");
    const token = Jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, token });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
