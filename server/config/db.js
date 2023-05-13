import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected successfully...");
  } catch (error) {
    console.log("Error in connection to database " + error);
  }
};
