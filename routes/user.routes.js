//express
const express = require('express');
//controller
const { signup, signin } = require('../controllers/user.controllers');
//router
const router = express.Router();


//endpoints
// in http four types of methods are used
// get -> to get data
// post -> to create data
// put/patch -> to update data
// delete -> to delete data
router.post("/register", signup);
router.post("/signin", signin);

//export the router
module.exports = router;