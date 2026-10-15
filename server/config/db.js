import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const connectionRes = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected: ${connectionRes.connection.host}`.cyan.underline,
    );
  } catch (error) {
    console.log(`Error while connecting DB : ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
