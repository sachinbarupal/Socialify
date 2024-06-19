const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  userZodSchemaRegister,
  userZodSchemaLogin,
} = require("../zod validation/userValidation");

// Register
router.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const validate = userZodSchemaRegister.safeParse({
      username,
      email,
      password,
    });

    if (!validate.success)
      return res.status(403).json({ msg: "Invalid Inputs !!" });

    // Check if already registered
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (user) return res.status(403).json({ msg: "User Already Exists !!" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ msg: "Sign Up Successfull" });
  } catch (err) {
    console.log("Error in Register", err);
    res.status(403).json({ msg: "Error in Register" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const validate = userZodSchemaLogin.safeParse({ email, password });

    if (!validate.success)
      return res.status(403).json({ msg: "Invalid Inputs !!" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User Not Found!!" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(404).json({ msg: "Wrong Password !!" });

    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    const {
      password: p,
      email: e,
      __v,
      updatedAt,
      createdAt,
      ...other
    } = user._doc;

    res.status(200).json({ user: other, token });
  } catch (err) {
    console.log("Error in Login", err);
    res.status(403).json({ msg: "Error in Login" });
  }
});

module.exports = router;
