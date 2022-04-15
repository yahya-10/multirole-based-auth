const cors = require("cors");
const express = require("express");
const connectToDB = require("./config/ConnectToDB");

// Create an express instance.
const server = express();

// Use cors for cross origin resource sharing errors.
server.use(cors());

// connect the app to database.
connectToDB();

// Port in which the application will listen.
let PORT = 7500;

// Launch the app.
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
