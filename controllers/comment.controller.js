const Comment = require("../models/Comment.model");

// create comment controller

const createComment = async (req, res) => {
    try {
        // req.body -> content, postId, author
        const { textComment, userId, postId } = req.body;
        // create Comment

        const comment = new Comment({
            textComment,
            userId,
            postId
        });

        // save comment to database
        await comment.save();

        res.status(201).json({ message: "Comment created successfully", comment });
    } catch (err) {
        console.log("err", err.message)
    }
}

module.exports = {
    createComment
};