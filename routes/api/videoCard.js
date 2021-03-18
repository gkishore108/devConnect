const express = require("express");
const UserPost = require("../../models/VideoCardModel");

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
router.post("/videoCard", async (req, res) => {
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

    const videoCardData = {
      title,
      link,
      description,
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

module.exports = router;
