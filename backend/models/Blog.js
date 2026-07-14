const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    likes: {
        type: Number,
        default: 0
    },

    author: {
      type: String,
      default: "Sarah",
    },
  },
  {
    timestamps: true,
  }
  
);

module.exports = mongoose.model("Blog", blogSchema);