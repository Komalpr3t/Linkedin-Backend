const Post = require("../models/Post.model");

// create post controller

const createPost = async (req, res) => {
    try {
        // req.body
        const { content, author } = req.body;

        // create post

        const post = new Post({
            content, author
        })

        // save post

        await post.save();

        return res.status(201).json({ message: "post created successfully", post })

    } catch (err) {
        console.log("err", err.message)
    }
}

// controller to get all posts

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username email")
        return res.status(200).json({ message: "Posts fetched successfully!", posts })
    } catch (err) {
        console.log("err", err.message)
    }
}

// controller to like a post

const likePost = async (req, res) => {
    try {

        const { postId, userId } = req.body;
        // postId = 87y4732t6732t478t326
        //  userIdObj = {
        //   _id : 873264732874632874
        //  }
        const post = await Post.findById(postId);

        post.likes = [...post.likes, ...userId];

        await post.save();

        //  post.likes.push(userId);

        return res.status(200).json({ message: "Post liked successfully!", post })

    } catch (err) {
        console.log("err", err.message)
    }
}

module.exports = { createPost, getAllPosts, likePost }