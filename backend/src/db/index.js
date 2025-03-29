import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";

const connectDB = async () => {
  console.log("DB_NAME", DB_NAME);
  console.log("MONGODB_URI", process.env.MONGODB_URI);
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB Connection FAILED", error);
    process.exit(1);
  }
};

export default connectDB;
