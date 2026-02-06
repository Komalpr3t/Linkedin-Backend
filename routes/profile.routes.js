// apis for profile 
const express = require("express");
const { createProfile } = require("../controllers/profile.controller");
const router = express.Router();

router.post("/create-profile", createProfile);

module.exports = router;