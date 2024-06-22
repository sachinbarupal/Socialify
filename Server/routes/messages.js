const userAuth = require("../middlewares/userAuth");
const Message = require("../models/Message");
const User = require("../models/User");

const router = require("express").Router();

// create
router.post("/create", userAuth, async (req, res) => {
  try {
    const _id = req._id;
    // const { _id } = await User.findOne({ email });
    const conversationId = req.body.conversationId;
    const text = req.body.text;

    const savedMessage = await Message.create({
      sender: _id,
      conversationId,
      text,
    });
    // const { sender } = savedMessage._doc;
    res
      .status(200)
      .json({
        _id: savedMessage._id,
        text,
        sender: _id,
        createdAt: savedMessage.createdAt,
      });
  } catch (err) {
    console.log("Error in Message Creation", err);
    res.status(403).json({ msg: "Error in Message Creation" });
  }
});

// get
router.get("/:conversationId", userAuth, async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const messages = await Message.find({ conversationId }).select(
      "text sender createdAt"
    );

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in Fetching Messages", err);
    res.status(403).json({ msg: "Error in fetching messages" });
  }
});

module.exports = router;
