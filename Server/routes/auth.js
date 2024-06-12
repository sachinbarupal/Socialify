const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {
    // Check if already registered
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(403).json({ msg: "User Already Exists !!" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create New User
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save user
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    console.log("Error in Register", err);
    res.status(403).json({ msg: "Error Aai" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(404).json({ msg: "User Not Found!!" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(404).json({ msg: "Invalid Credentials !!" });

    res.status(200).json(user);
  } catch (err) {
    console.log("Error in Login", err);
    res.status(403).json({ msg: "Error Aai" });
  }
});

module.exports = router;
