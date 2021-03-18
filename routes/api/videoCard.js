const express = require("express");
const UserPost = require("../../models/VideoCardModel");
const auth = require("../../middleware/auth");
const User = require("../../models/UserModel");

const router = express.Router();

const validURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

// @route  GET api/videoCard
// @desc   Get all the video card
// @access Public
router.get("/videoCard", async (req, res) => {
  try {
    const userPost = await UserPost.find().sort({ createdAt: -1 });

    res.status(200).json(userPost);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

// @route  POST api/videoCard
// @desc   Get all the video card
// @access Protected
router.post("/videoCard", auth, async (req, res) => {
  try {
    const { title, link, description } = req.body;

    //validation

    if (!title || !link) {
      return res.status(400).json({
        errorMessage: "Please enter title and a video link",
      });
    }

    if (!validURL(link)) {
      return res.status(400).json({
        errorMessage: "Please enter a valid URL",
      });
    }

    const getUser = await User.findById(req.user);

    const videoCardData = {
      title,
      link,
      description,
      user: req.user,
      userName: getUser.userName,
    };

    const userPost = new UserPost(videoCardData);

    const savedPost = await userPost.save();

    res.json(savedPost);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

// @route  DELETE api/videoCard/:id
// @desc   Get all the video card
router.delete("/videoCard/:id", async (req, res) => {
  try {
    const userPost = await UserPost.findById(req.params.id);

    if (!userPost) {
      return res.status(400).json({
        errorMessage: "Not Found!",
      });
    }

    await userPost.remove();

    res.status(200).json("Post Removed!!");
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

// @route  GET api/videoCard/me
// @desc   Get all the video card of a user
// @access Protected
router.get("/videoCard/me", auth, async (req, res) => {
  try {
    const userPost = await UserPost.find({ user: req.user }).sort({
      createdAt: -1,
    });

    if (!userPost) {
      return res.status(400).json({
        errorMessage: "No Posts Found!",
      });
    }

    res.status(200).json(userPost);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

// @route  PUT api/videoCard/like/:id
// @desc   Like a post
// @access Protected
router.put("/videoCard/like/:id", auth, async (req, res) => {
  try {
    const userPost = await UserPost.findById(req.params.id);

    if (!userPost) {
      return res.status(400).json({
        errorMessage: "Not Found!",
      });
    }

    if (
      userPost.likes.filter((like) => like.user.toString() === req.user)
        .length > 0
    ) {
      return res.status(400).json({
        errorMessage: "Post already liked!",
      });
    }

    userPost.likes.unshift({ user: req.user });
    await userPost.save();

    res.json(userPost.likes);
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
