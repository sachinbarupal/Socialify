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

    await Conversation.create({
      members: [senderId, recieverId],
    });

    res.status(200).json({ msg: "Convo Creation Successfull" });
  } catch (err) {
    console.log("Error in creating Convo !!", err);
    res.status(403).json({ msg: "Error in creating Convo !!" });
  }
});

// Get Converstion
router.get("/", userAuth, async (req, res) => {
  try {
    const email = req.email;
    const { _id } = await User.findOne({ email });

    const conversations = await Conversation.find({
      members: { $in: [_id] },
    })
      .select("-__v -updatedAt")
      .populate({ path: "members", select: "username profilePicture" });

    const resConvo = conversations.map((conversation) => {
      return {
        _id: conversation._id,

        user:
          conversation.members[0]._id.toString() === _id.toString()
            ? conversation.members[1]
            : conversation.members[0],
        createdAt: conversation.createdAt,
      };
    });

    res.status(200).json(resConvo);
  } catch (err) {
    console.log("Error in Fetching Convo", err);
    res.status(403).json({ msg: "Error in Fetching Convo" });
  }
});

module.exports = router;
