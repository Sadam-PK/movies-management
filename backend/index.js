import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookiesParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import moviesRoutes from "./routes/movie.route.js";
import { databaseConnection } from "./db/dbConnection.js";

const PORT = process.env.PORT || 3000;
const app = express();

// CORS configuration
const prodOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2];
const devOrigin = ["http://localhost:5173"]; // your frontend dev URL

const allowedOrigins =
  process.env.NODE_ENV === "production" ? prodOrigins : devOrigin;

app.use(
  cors({
    origin: (origin, callback) => {
      // Log the incoming origin for debugging
      console.log("Incoming Origin:", origin);
      // If the origin is either from the allowed list or if no origin is sent (e.g., Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  })
);

app.use(express.json());
app.use(cookiesParser());

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);

// Database connection and server start
app.listen(PORT, () => {
  databaseConnection(); // Connect to the database
  console.log(`Server is running on http://localhost:${PORT}`);
});
