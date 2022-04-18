const User = require("../schemas/userSchema");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Server error");
  }
};

module.exports = getUsers;
