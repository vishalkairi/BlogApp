const express = require("express");
const authRouter = express.Router();
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
authRouter.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPwd = await bcryptjs.hash(password, salt);
    const userDoc = await User.create({ username, password: hashedPwd });
    console.log(userDoc);
    return res.status(201).json(userDoc);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    return res.status(404).json({ msg: "Please provide all the details" });
  }
  try {
    const user = await User.findOne({ username: username });
    if (!user) return res.status(404).json({ msg: "User does not exists" });
    console.log(user);
    const isPwdMatched = await bcryptjs.compare(password, user.password);
    console.log(isPwdMatched);
    if (!isPwdMatched)
      return res
        .status(404)
        .json({ msg: "Username or password does not match" });
    const token = await jwt.sign(
      { username, id: user._id },
      process.env.SECRET_KEY
    );

    return res
      .cookie("token", token)
      .json({ id: user._id, username: user.username });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

authRouter.post("/logout", (req, res) => {
  //console.log(req.headers);
  return res.cookie("cookie", "").json("ok");
});
module.exports = authRouter;
