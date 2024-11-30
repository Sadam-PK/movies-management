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

const devOrigin = ["http://localhost:5173"];
const prodOrigins = [process.env.ORIGIN_2];

const allowedOrigins =
  process.env.NODE_ENV === "production" ? prodOrigins : devOrigin;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Ensure OPTIONS is allowed
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],  // Add Accept in case you need it
    credentials: true,  // Allow cookies/credentials
  })
);

app.options("*", cors());
app.use(express.json());
app.use(cookiesParser());

app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);

app.listen(PORT, () => {
  databaseConnection(); // Connect to the database
  console.log(`Server is running on http://localhost:${PORT}`);
});
