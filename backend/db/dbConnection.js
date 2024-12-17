import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({ path: './backend/.env' });

export const databaseConnection = () => {
  try {
    mongoose
      .connect(`${process.env.DATABASE_STRING}/movies-management`)
      .then(() => {
        console.log("connected to database - mongo");
      })
      .catch((error) => {
        console.error("Database connection error:", error);
      });
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
