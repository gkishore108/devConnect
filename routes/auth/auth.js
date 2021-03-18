const express = require("express");
const auth = require("../../middleware/auth");
const User = require("../../models/UserModel");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @route  GET auth/
// @desc   Get authenticated user
router.get("/", auth, async (req, res) => {
  try {
    const getUser = await User.findById(req.user).select("-passwordHash");
    res.json(getUser);
  } catch (error) {
    return res.status(500).json({
      errorMessage: "Server Error!",
    });
  }
});

// @route  POST auth/
// @desc   Login a user
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).json({
        errorMessage: "Please enter valid credentials",
      });
    }

    const isUser = await User.findOne({ email });

    if (!isUser) {
      return res.status(400).json({
        errorMessage: "Please enter valid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, isUser.passwordHash);

    if (!isMatch) {
      return res.status(400).json({
        errorMessage: "Please enter a valid username or password",
      });
    }

    const payload = {
      id: isUser.id,
    };

    jwt.sign(payload, process.env.JSEC, (error, token) => {
      if (error) throw error;
      res.json(token);
    });
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
