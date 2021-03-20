const mongoose = require("mongoose");

const videoCardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    userName: {
      type: String,
    },
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
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
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
