const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../schemas/userSchema");

const jwtSecret = config.get("jsonWebTokenSecret");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const user = await User.findOne({ email }).select("-password");

    if (user) return res.status(409).json("This email already exists");

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    newUser.password = hashedPassword;

    await newUser.save();

    const payload = {
      user: {
        id: newUser._id,
      },
    };

    jwt.sign(payload, jwtSecret, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error");
  }
};

module.exports = register;
