const express = require("express");
const User = require("../../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();

// @route  POST auth/register
// @desc   Register a user
router.post("/register", async (req, res) => {
  const { userName, email, password, passwordVerify } = req.body;

  try {
    // validation
    if (!userName || !email || !password) {
      return res.status(400).json({
        errorMessage: "Please enter atleast a Username or Email and Passoword!",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        errorMessage: "Please enter a password more than 6 characters",
      });
    }

    if (password !== passwordVerify) {
      return res.status(400).json({
        errorMessage: "Password doesn't match!",
      });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        errorMessage: "User already exists!",
      });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save user in database

    const newUser = new User({
      userName,
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    // getting jwt token

    const payload = {
      id: savedUser.id,
    };

    jwt.sign(payload, config.get("JSEC"), (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
