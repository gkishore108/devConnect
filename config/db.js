const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mongoURI = process.env.MONGODB_SECRET;

async function connectDB() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.error(error.message);

    // Exit the process;
    process.exit(1);
  }
}

module.exports = connectDB;
