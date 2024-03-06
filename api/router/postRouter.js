const express = require("express");
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs/promises");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

postRouter.post("/createPost", upload.single("files"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const { title, summary, content } = req.body;
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const { token } = req.cookies;

  try {
    const tokenInfo = await jwt.verify(token, process.env.SECRET_KEY);
    fs.rename(path, path + "." + ext);
    const newPost = {
      title,
      summary,
      content,
      cover: path + "." + ext,
      author: tokenInfo.id,
    };
    const postDoc = await Post.create(newPost);
    res.json(postDoc);
  } catch (error) {
    console.log(error);
  }
});

postRouter.get("/getAllPosts", async (req, res) => {
  try {
    const data = await Post.find({})
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

postRouter.post("/getPostById/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await Post.findById(id).populate("author", ["username"]);

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

postRouter.put("/updatePost", upload.single("files"), async (req, res) => {
  let newPath = null;
  const { id, title, summary, content } = req.body;
  const { token } = req.cookies;
  if (req.file) {
    const { title, summary, content } = req.body;
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.rename(path, path + "." + ext);
  }
  try {
    const tokenInfo = await jwt.verify(token, process.env.SECRET_KEY);
    console.log(id);
    const postDoc = await Post.findById(id);
    const isAuthor =
      JSON.stringify(postDoc.author) === JSON.stringify(tokenInfo.id);
    const updatedPostDoc = await Post.findOneAndUpdate(
      { _id: id },
      {
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      }
    );
    return res.json(updatedPostDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});
module.exports = postRouter;
