const cors = require("cors");
const { application } = require("express");
const express = require("express");
const connectToDB = require("./config/ConnectToDB");

// Create an express instance.
const server = express();

//Allows us to use body json thing to create posts
server.use(express.json({ extended: false }));

// Prevent from cors policy warning.
server.use(cors());

// connect the app to database.
connectToDB();

server.use("/", require("./routes"));

// Port in which the application will listen.
let PORT = 7500;

// Launch the app.
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
