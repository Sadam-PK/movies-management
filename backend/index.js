import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookiesParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import { databaseConnection } from "./db/dbConnection.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookiesParser());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend domain
    credentials: true, // for cookies
  })
);

app.get("/", (req, res) => {
  res.send("Helloo");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  databaseConnection(); // database connection
  console.log(`Server is running on http://localhost:${PORT}`);
});
