import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

console.log(process.env.MONGO_URI);


const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error msg: ", error.message);
  }
};

export default connectToMongoDB;
