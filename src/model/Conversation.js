const mongoose = require("mongoose");

const groupInfoSchema = new mongoose.Schema({
  name: String,
  owner: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: { maxDepth: 1, select: "name email createdAt updatedAt" },
    },
  ],
});

const schema = new mongoose.Schema(
  {
    groupInfo: {
      type: groupInfoSchema,
      default: null,
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", schema);

module.exports = Conversation;
