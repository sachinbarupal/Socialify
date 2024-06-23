const userAuth = require("../middlewares/userAuth");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");

const router = require("express").Router();

// create
router.post("/create/:recieverId", userAuth, async (req, res) => {
  try {
    const _id = req._id;
    const recieverId = req.params.recieverId;
    // const { _id } = await User.findOne({ email });
    const { _id: conversationId } = await Conversation.findOne({
      members: { $all: [recieverId, _id] },
    });
    const text = req.body.text;

    const savedMessage = await Message.create({
      sender: _id,
      conversationId,
      text,
    });
    // const { sender } = savedMessage._doc;
    res.status(200).json({
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
router.get("/:recieverId", userAuth, async (req, res) => {
  try {
    const recieverId = req.params.recieverId;
    const _id = req._id.toString();

    const conversation = await Conversation.findOne({
      members: { $all: [recieverId, _id] },
    });

    if (!conversation) {
      await Conversation.create({
        members: [_id, recieverId],
      });

      return res.status(200).json([]);
    }

    const messages = await Message.find({
      conversationId: conversation._id,
    }).select("text sender createdAt");

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in Fetching Messages", err);
    res.status(403).json({ msg: "Error in fetching messages" });
  }
});

module.exports = router;
