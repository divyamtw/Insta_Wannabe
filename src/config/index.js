import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected!");
  } catch (error) {
    console.log(
      "Something went wrong while Connecting Database!",
      error.message,
    );
    process.exit(1);
  }
};

export default connectDB;
