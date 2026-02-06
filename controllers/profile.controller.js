// create controller for profile

const Profile = require("../models/Profile.model");

// create profile

const createProfile = async (req, res) => {
    try {
        //req.body
        const { userId, headline, summary, experience, skills = [], education } = req.body;

        // Create a new profile
        const profile = new Profile({
            userId,
            headline,
            summary,
            skills

        });

        //save profile to database
        await profile.save();

        profile.experience.push(experience);
        profile.education.push(education);

        await profile.save();

        res.status(201).json({ message: "Profile created successfully", profile });
    } catch (err) {
        console.log("err", err.message)
    }

}

//get profile by user id
// const getProfileByUserId = async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const profile = await Profile.findOne({ userId }).populate("userId", "name email"); //populate user details in profile response
//         if (!profile) {
//             return res.status(404).json({ message: "Profile not found" });
//         }
//         res.status(200).json({ profile });
//     } catch (err) {
//         console.log("err", err.message)
//     }
// }

module.exports = {
    createProfile
}