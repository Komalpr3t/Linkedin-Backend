//mongoose
const mongoose = require("mongoose");


//schema

const profileSchema = new mongoose.Schema({
    //fields

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    headline: {
        type: String,

    },

    summary: {
        type: String,

    },

    experience: [{
        companyName: String,
        joiningDate: String,
        lastDate: String,
        description: String
    }],

    skills: {
        type: [String] //array of skills for e.g. ["JavaScript", "React", "Node.js"]
    },

    education: [{
        schoolName: String,
        session: String
    }]
}, {
    timestamps: true
}
)


//model
const Profile = mongoose.model("Profile", profileSchema);

//export the model so it can be used in other files
module.exports = Profile;