const mongoose = require("mongoose");

const videoCardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    likes: [],
    comments: [
      {
        text: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserPost = mongoose.model("post", videoCardSchema);

module.exports = UserPost;
