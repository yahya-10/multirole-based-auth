const cors = require("cors");
const express = require("express");

const server = express();

server.use(cors());

let PORT = 7500;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
