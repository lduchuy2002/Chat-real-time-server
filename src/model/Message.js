const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    image: String,
    owner: mongoose.Schema.Types.ObjectId,
    seenBy: [mongoose.Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", schema);

module.exports = Message;
