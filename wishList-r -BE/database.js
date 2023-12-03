const mongoose = require("mongoose");
require("dotenv").config();
const connection = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Mongoo is connected");
  } catch (error) {
    console.log("something went wrong connecting to mongoo ");
  }
};

module.exports = connection;
