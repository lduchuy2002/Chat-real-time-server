const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: { maxDepth: 1, select: "name email createdAt updatedAt" },
  },
});

schema.plugin(require("mongoose-autopopulate"));

const Invitation = mongoose.model("Invitation", schema);
module.exports = Invitation;
