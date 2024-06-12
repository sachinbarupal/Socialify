const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// Create Post
router.post("/create", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.log("Error In Creating Post", err);
    res.status(403).json({ msg: "Error Aii" });
  }
});

// Update Post
router.put("/update/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ msg: "Post Not Found !!" });

    if (post.userId !== req.body.userId)
      return res.status(403).json({ msg: "You can only update your post !" });

    await post.updateOne({ $set: req.body });
    res.status(200).json({ msg: "Post Updated Successfully!!" });
  } catch (err) {
    console.log("Error In Creating Post", err);
    res.status(403).json({ msg: "Error Aii" });
  }
});

// Delete Post
router.delete("/delete/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ msg: "Post Not Found !!" });

    if (post.userId !== req.body.userId)
      return res.status(403).json({ msg: "You can only delete your post !" });

    await post.deleteOne();
    res.status(200).json({ msg: "Post Deleted Successfully!!" });
  } catch (err) {
    console.log("Error In Deleting Post", err);
    res.status(403).json({ msg: "Error Aii" });
  }
});

// likeDislike post
router.put("/like/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ msg: "Post Not Found !!" });

    if (post.likes.includes(req.body.userId)) {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json({ msg: "Post unliked successfully !!" });
    }
    await post.updateOne({ $push: { likes: req.body.userId } });
    return res.status(200).json({ msg: "Post Liked Successfully" });
  } catch (err) {
    console.log("Error In Deleting Post", err);
    res.status(403).json({ msg: "Error Aii" });
  }
});

// Get Post
router.get("/post/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ msg: "Post Not Found !!" });

    res.status(200).json(post);
  } catch (err) {
    console.log("Error In Fetching Post", err);
    res.status(403).json({ msg: "Error Aii" });
  }
});

// Get Timeline Posts
router.get("/timeline", async (req, res) => {
  try {
    const currentUser = await User.findById(req.body._id);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => Post.find({ userId: friendId }))
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    console.log("Error In Fetching Timeline", err);
    res.status(403).json({ msg: "Error Aii" });
  }
});

module.exports = router;
