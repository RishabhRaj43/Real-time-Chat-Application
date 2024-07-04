import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error msg: ", error.message);
  }
};

export default connectToMongoDB;
