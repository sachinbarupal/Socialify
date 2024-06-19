const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const userAuth = require("../middlewares/userAuth");
const mongoose = require("mongoose");

router.use(userAuth);

// Update User
router.put("/update", async (req, res) => {
  try {
    const email = req.email;
    const {
      password,
      description,
      profilePicture,
      coverPicture,
      city,
      relationship,
    } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }

    await User.findOneAndUpdate(
      { email },
      {
        password,
        description,
        profilePicture,
        coverPicture,
        city,
        relationship,
      }
    );
    res.status(200).json({ msg: "Account Updated !!" });
  } catch (err) {
    console.log("Error in Updating User", err);
    res.status(403).json({ msg: "Error in Updating User" });
  }
});

// Delete User
router.delete("/delete", async (req, res) => {
  try {
    const email = req.email;

    await User.findOneAndDelete({ email });
    res.status(200).json({ msg: "Account Deleted !!" });
  } catch (err) {
    console.log("Error in Deleting User", err);
    res.status(403).json({ msg: "Error in Deleting User" });
  }
});

// Get User
router.get("/user/:username", async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ msg: "User Not Found !!" });

    const { password, email, __v, updatedAt, createdAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.log("Error in Fetching User", err);
    res.status(403).json({ msg: "Error in Fetching User" });
  }
});

// Get All Users
router.get("/all", async (req, res) => {
  try {
    const email = req.email;
    const users = await User.find({ email: { $ne: email } });

    res.status(200).json(
      users.map(({ _id, username, profilePicture }) => {
        return { _id, username, profilePicture };
      })
    );
  } catch (err) {
    console.log("Error in Fetching All Users", err);
    res.status(403).json({ msg: "Error in Fetching All Users" });
  }
});

router.get("/friends/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });

    if (!user) return res.status(403).json({ msg: "User Not Found !!" });

    const friends = await Promise.all(
      user.following.map((followingId) => User.findById(followingId))
    );

    let friendList = friends.map(({ _id, username, profilePicture }) => {
      return { _id, username, profilePicture };
    });
    res.status(200).json(friendList);
  } catch (err) {
    console.log("Error in Fetching Friends", err);
    res.status(500).json({ msg: "Error in Fetching Friends" });
  }
});

// Follow Unfollow User
router.put("/follow/:_id", async (req, res) => {
  try {
    const email = req.email;
    const user = await User.findOne({ email });
    const toFollowId = req.params._id;

    if (!mongoose.Types.ObjectId.isValid(toFollowId))
      return res.status(403).json({ msg: "Invalid User Id" });

    if (user._id.toString() === toFollowId)
      return res.status(403).json({ msg: "You can not Follow Yourself !!" });

    const nextUser = await User.findById(toFollowId);
    console.log("Here");

    if (!nextUser) return res.status(404).json({ msg: "User Not Found !!" });

    if (user.following.includes(toFollowId)) {
      await user.updateOne({ $pull: { following: toFollowId } });
      await nextUser.updateOne({ $pull: { followers: user._id } });

      return res
        .status(403)
        .json({ msg: "User has been unfollowed successfully !!" });
    }

    await user.updateOne({ $push: { following: toFollowId } });
    await nextUser.updateOne({ $push: { followers: user._id } });

    res.status(200).json({ msg: "User has been followed successfully !!" });
  } catch (err) {
    console.log("Error in Following User", err);
    res.status(403).json({ msg: "Error in Following User" });
  }
});

module.exports = router;
