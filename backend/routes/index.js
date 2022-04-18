const express = require("express");
const router = express.Router();

const register = require("../functions/register");
const login = require("../functions/login");
const { roleAuthMiddleware } = require("../middlewares/roleAuthMiddleware");
const auth = require("../middlewares/authentication");
const getUsers = require("../functions/getUsers");

router.post("/register", register);
router.post("/login", login);
router.get(
  "/check_access/admin",
  auth,
  roleAuthMiddleware("admin"),
  (req, res) => {
    res.send("admin panel");
  }
);
router.get(
  "/check_access/sales",
  auth,
  roleAuthMiddleware("sales"),
  (req, res) => {
    res.send("sales panel");
  }
);

router.get("/admin/get_users", auth, roleAuthMiddleware("admin"), getUsers);

module.exports = router;
