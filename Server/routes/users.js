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
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User Not Found !!" });
    const { password, __v, updatedAt, createdAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.log("Error in Fetching User", err);
    res.status(403).json({ msg: "Error Aii" });
  }
});

// Follow User
router.put("/follow/:id", async (req, res) => {
  const currentUserId = req.body._id;
  const toFollowUserId = req.params.id;

  if (currentUserId === toFollowUserId)
    return res.status(403).json({ msg: "You can not Follow Yourself !!" });

  try {
    const toFollowUser = await User.findById(toFollowUserId);
    const currentUser = await User.findById(currentUserId);

    if (!toFollowUser || !currentUser)
      return res.status(404).json({ msg: "User Not Found !!" });

    if (currentUser.following.includes(toFollowUserId)) {
      return res.status(403).json({ msg: "Already Following !!" });
    }

    await currentUser.updateOne({ $push: { following: toFollowUserId } });
    await toFollowUser.updateOne({ $push: { followers: currentUserId } });

    res.status(200).json({ msg: "User has been followed successfully !!" });
  } catch (err) {
    console.log("Error in Following User", err);
    res.status(403).json({ msg: "Error Aii" });
  }
});

// Unfollow User
router.put("/unfollow/:id", async (req, res) => {
  const currentUserId = req.body._id;
  const toUnfollowUserId = req.params.id;

  if (currentUserId === toUnfollowUserId)
    return res.status(403).json({ msg: "You can not Unfollow Yourself !!" });

  try {
    const toUnfollowUser = await User.findById(toUnfollowUserId);
    const currentUser = await User.findById(currentUserId);

    if (!toUnfollowUser || !currentUser)
      return res.status(404).json({ msg: "User Not Found !!" });

    if (!currentUser.following.includes(toUnfollowUserId)) {
      return res.status(403).json({ msg: "You do not follow the User !!" });
    }

    await currentUser.updateOne({ $pull: { following: toUnfollowUserId } });
    await toUnfollowUser.updateOne({ $pull: { followers: currentUserId } });

    res.status(200).json({ msg: "User has been unfollowed successfully !!" });
  } catch (err) {
    console.log("Error in Following User", err);
    res.status(403).json({ msg: "Error Aii" });
  }
});

module.exports = router;
