const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Update User
router.put("/update/:id", async (req, res) => {
  if (req.body._id !== req.params.id && !req.body.isAdmin)
    return res.status(403).json("Not Allowed To Update !!");

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User Not Found !!" });

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ msg: "Account Updated !!", updatedUser });
  } catch (err) {
    console.log("Error in Updating", err);
    res.status(403).json({ msg: "Error Aii" });
  }
});

// Delete User
router.delete("/delete/:id", async (req, res) => {
  if (req.body._id !== req.params.id && !req.body.isAdmin)
    return res.status(403).json("Not Allowed To delete !!");

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User Not Found !!" });

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Account Deleted !!" });
  } catch (err) {
    console.log("Error in Deleting", err);
    res.status(403).json({ msg: "Error Aii" });
  }
});

// Get User

// Follow User

// Unfollow User

module.exports = router;
