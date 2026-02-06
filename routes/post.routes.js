const express = require("express");
const { createPost, getAllPosts, likePost } = require("../controllers/post.controller")
const router = express.Router();

router.post("/create-post", createPost)
router.get("/get-posts", getAllPosts)
router.post("/like", likePost)
module.exports = router