const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Da ket noi co so du lieu!");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
