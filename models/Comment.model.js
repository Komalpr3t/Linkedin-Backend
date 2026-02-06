//mongoose
const mongoose = require("mongoose");


//schema

const commentSchema = new mongoose.Schema({
    //fields

    textComment: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    // timestamps -> will tell the time user was stored and
    // also the last time user was last updated
}, {
    timestamps: true
})

//model
const Comment = mongoose.model("Comment", commentSchema);

//export the model so it can be used in other files
module.exports = Comment;