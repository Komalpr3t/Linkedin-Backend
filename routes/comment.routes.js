const express = require("express");
const { createComment } = require("../controllers/comment.controller");
const router = express.Router();

router.post("/create-comment", createComment);

module.exports = router;