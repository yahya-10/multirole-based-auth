const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../schemas/userSchema");

const jwtSecret = config.get("jsonWebTokenSecret");

const register = async (req, res) => {
  try {
    // const { email, password, role } = req.body;
    const user = await User.findOne({ email: req.body.email }).select(
      "-password"
    );

    if (user) return res.json("This email already exists");

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

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
    // console.log(req.body.firstName);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error");
  }
};

module.exports = register;
