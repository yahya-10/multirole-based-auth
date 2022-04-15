const mongoose = require("mongoose");
const config = require("config");

// Retrieve the connection URI.
const mongoConfig = config.get("mongoURI");

const ConnectToDB = async () => {
  try {
    //   Connect the server to db.
    await mongoose.connect(mongoConfig);
    console.log("mongoDB is connected");
  } catch (error) {
    console.error(error);
    // In case of error, nodeJS will automatically exit.
    process.exit(1);
  }
};

module.exports = ConnectToDB;
