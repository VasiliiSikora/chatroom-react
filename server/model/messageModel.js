const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    to: {
        type: Number,
        required: true,
    },
    sender: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", messageSchema);