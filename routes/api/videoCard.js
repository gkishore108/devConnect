const express = require("express");

const router = express.Router();

// @route  GET api/videoCard
// @desc   Get all the video card
// @access Public
router.get("/videoCard", (req, res) => {
  res.send("Video Card Router");
});

// @route  POST api/videoCard
// @desc   Get all the video card
// @access Public
router.post("/videoCard", (req, res) => {
  const { title, link, description } = req.body;

  const videoCardData = {
    title,
    link,
    description,
  };

  res.json(videoCardData);
});

module.exports = router;
