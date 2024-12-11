import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connect");
  } catch (error) {
    console.log(error);
    console.log("error connecting to database", error)
  }
}

export default connectDB;
