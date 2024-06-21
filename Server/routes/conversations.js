const userAuth = require("../middlewares/userAuth");
const Conversation = require("../models/Conversation");
const User = require("../models/User");

const router = require("express").Router();

// New Conversation

router.post("/create", userAuth, async (req, res) => {
  try {
    const recieverId = req.body.senderId;
    const senderId = req.body.recieverId;

    if (!recieverId || !senderId)
      return res.status(403).json({ msg: "Wrong Inputs!!" });

    const savedConvo = await Conversation.create({
      members: [senderId, recieverId],
    });

    const convo = await savedConvo.select("-__v");

    res.status(200).json(convo);
  } catch (err) {
    console.log("Error in creating Convo !!", err);
    res.status(403).json({ msg: "Error in creating Convo !!" });
  }
});

// Get Converstion

module.exports = router;
