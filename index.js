//setup the server
const express = require("express")  //import express module
const dotenv = require("dotenv").config() //will allow you to read environment variables from .env file
const mongoose = require("mongoose") //import mongoose to interact with mongodb
const userRoutes = require("./routes/user.routes") //import user routes
const cors = require("cors");
const postRoutes = require("./routes/post.routes");
const profileRoutes = require("./routes/profile.routes");
const commentRoutes = require("./routes/comment.routes");
const cookieParser = require("cookie-parser");

//create an express instance
const app = express();

//application level middleware
app.use(cookieParser());
app.use(express.json()); //to parse json data in request body
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
})); //to enable CORS

//connect to mongodb 
//mongodb -> connection string
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB: ", err);
    });

//api
app.use("/api", profileRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);

app.get("/", (req, res) => {
    return res.send("<h1>Welcome to LinkedIn Backend!</h1>");
});

//register -> (POST) http://localhost:4000/api/register

//start the server and make it listen to the port specified in .env file
//backend is now accessible at http://localhost:4000
// app.listen(process.env.PORT, () => {
//     console.log("Server is running on port ", process.env.PORT); //callback runs once the server starts successfully
// })

module.exports = app