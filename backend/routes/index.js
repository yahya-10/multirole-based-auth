const express = require("express");
const router = express.Router();

const register = require("../functions/register");

router.post("/register", register);

module.exports = router;
