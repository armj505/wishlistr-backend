const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Mongoo is connected");
  } catch (error) {
    console.log("Something went wrong connecting to mongoo ");
  }
};

module.exports = connection;
