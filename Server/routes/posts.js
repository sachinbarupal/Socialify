const router = require("express").Router();
const mongoose = require("mongoose");
const userAuth = require("../middlewares/userAuth");
const Post = require("../models/Post");
const User = require("../models/User");

router.use(userAuth);

// Create Post
router.post("/create", async (req, res) => {
  try {
    const email = req.email;

    const { _id: userId } = await User.findOne({ email });
    const description = req.body.description;
    const Image = req.body.Image;

    if (!description && !Image)
      return res.status(403).json({ msg: "Invalid Inputs" });

    await Post.create({
      userId,
      description,
      Image,
    });

    res.status(200).json({ msg: "Post Created Successfully !!" });
  } catch (err) {
    console.log("Error In Creating Post", err);
    res.status(403).json({ msg: "Error in Post Creation" });
  }
});

// Update Post
router.put("/update/:postId", async (req, res) => {
  try {
    const email = req.email;
    const postId = req.params.postId;

    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(403).json({ msg: "Invalid Post Id" });

    const Image = req.body.Image;
    const description = req.body.description;

    if (!description && !Image)
      return res.status(403).json({ msg: "Invalid Inputs" });

    const post = await Post.findOne({ _id: postId });
    if (!post) return res.status(404).json({ msg: "Post Not Found !!" });

    const { _id: userId } = await User.findOne({ email });

    if (post.userId !== userId.toString())
      return res.status(403).json({ msg: "You can only update your post !" });

    await post.updateOne({ Image, description });
    res.status(200).json({ msg: "Post Updated Successfully!!" });
  } catch (err) {
    console.log("Error In Updating Post", err);
    res.status(403).json({ msg: "Error in Updating Post" });
  }
});

// Delete Post
router.delete("/delete/:postId", async (req, res) => {
  try {
    const email = req.email;
    const postId = req.params.postId;

    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(403).json({ msg: "Invalid Post Id" });

    const post = await Post.findOne({ _id: postId });
    if (!post) return res.status(404).json({ msg: "Post Not Found !!" });

    const { _id: userId } = await User.findOne({ email });

    if (post.userId !== userId.toString())
      return res.status(403).json({ msg: "You can only delete your post !" });

    await post.deleteOne();
    res.status(200).json({ msg: "Post Deleted Successfully!!" });
  } catch (err) {
    console.log("Error In Deleting Post", err);
    res.status(403).json({ msg: "Error in Deleting Post" });
  }
});

// likeDislike post
router.put("/like/:postId", async (req, res) => {
  try {
    const email = req.email;
    const postId = req.params.postId;

    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(403).json({ msg: "Invalid Post Id" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ msg: "Post Not Found !!" });

    const { _id: userId } = await User.findOne({ email });

    if (post.likes.includes(userId.toString())) {
      await post.updateOne({ $pull: { likes: userId.toString() } });
      return res.status(200).json({ msg: "Post Disliked Successfully !!" });
    }

    await post.updateOne({ $push: { likes: userId.toString() } });
    return res.status(200).json({ msg: "Post Liked Successfully" });
  } catch (err) {
    console.log("Error In Liking/Disliking Post", err);
    res.status(403).json({ msg: "Error In Liking/Disliking Post" });
  }
});

// Get Post
router.get("/post/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(403).json({ msg: "Invalid Post Id" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ msg: "Post Not Found !!" });

    const { __v, updatedAt, ...others } = post._doc;

    res.status(200).json(others);
  } catch (err) {
    console.log("Error In Fetching Post", err);
    res.status(403).json({ msg: "Error In Fetching Post" });
  }
});

// Get Timeline Posts
router.get("/timeline", async (req, res) => {
  try {
    const email = req.email;
    const user = await User.findOne({ email });

    const userPosts = await Post.find(
      { userId: user._id },
      "Image description userId createdAt likes comments"
    );
    const friendPosts = await Post.find(
      { userId: { $in: user.following } },
      "Image description userId createdAt likes comments"
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    console.log("Error In Fetching Timeline", err);
    res.status(403).json({ msg: "Error in Fetching Timeline" });
  }
});

// Get Users Posts
router.get("/user/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const { _id: userId } = await User.findOne({ username });

    const posts = await Post.find(
      { userId },
      "Image description userId createdAt likes comments"
    );

    res.status(200).json(posts);
  } catch (err) {
    console.log("Error In Fetching User Posts", err);
    res.status(403).json({ msg: "Error in Fetching User Posts" });
  }
});

// Add Comment
router.put("/comment/:postId", async (req, res) => {
  try {
    const email = req.email;
    const postId = req.params.postId;
    const comment = req.body.comment;

    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(403).json({ msg: "Invalid Post Id" });

    if (!comment || comment.trim().length === 0)
      return res.status(403).json({ msg: "Invalid Comment" });

    const {
      _id: userId,
      username,
      profilePicture: userImage,
    } = await User.findOne({ email });

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: { userId, username, userImage, comment } } },
      { new: true }
    );
    if (!post) return res.status(404).json({ msg: "Post Not Found !!" });

    return res.status(200).json(post.comments);
  } catch (err) {
    console.log("Error In Commenting ", err);
    res.status(403).json({ msg: "Error in Commenting" });
  }
});

module.exports = router;
