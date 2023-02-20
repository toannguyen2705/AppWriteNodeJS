const { timeLog } = require("console");
const { response } = require("express");
const express = require("express");
const { request } = require("http");
const router = express.Router();

const Post = require("../models/Post");

router.get("/", async (request, response) => {
  const posts = await Post.find().lean().sort({ date: -1 });
  response.render("posts/index", { posts: posts });
});

router.get("/add", (request, response) => {
  response.render("posts/add");
});
router.post("/", async (request, response) => {
  const { title, text } = request.body;

  let errors = [];

  if (!title) errors.push({ msg: "Title required" });
  if (!text) errors.push({ msg: "Text required" });
  if (errors.length > 0) response.render("posts/add", { title, text });
  else {
    const newPostData = { title: title, text: text };
    const newPost = new Post(newPostData);
    await Post.create(newPostData);
    response.redirect("/posts");
  }
});
router.get("/edit/:id", async (request, response) => {
  const post = await Post.findOne({ _id: request.params.id }).lean();
  response.render("posts/edit", { post });
});

router.put("/:id", async (request, response) => {
  const { title, text } = request.body;
  await Post.findOneAndUpdate({ _id: request.params.id }, { title, text });
  response.redirect("/posts");
});

router.delete("/:id", async (request, response) => {
  await Post.findOneAndRemove({ _id: request.params.id });
  response.redirect("/posts");
});
module.exports = router;
