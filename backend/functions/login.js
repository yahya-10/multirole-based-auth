const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../schemas/userSchema");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json("User not found.");

    const doPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doPasswordMatch) return res.status(401).json("Bad credentials.");

    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    const jwtSecret = config.get("jsonWebTokenSecret");

    jwt.sign(payload, jwtSecret, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Server error");
  }
};

module.exports = login;
