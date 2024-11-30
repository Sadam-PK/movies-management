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
const devOrigin = ["http://localhost:5173"];
const prodOrigins = [process.env.ORIGIN_2];

const allowedOrigins =
  process.env.NODE_ENV === "production" ? prodOrigins : devOrigin;

app.use(
  cors({
    origin: (origin, callback) => {
      // Accept any origin that is allowed in production or development
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // Ensure the 'Authorization' header is allowed
    credentials: true, // Allow credentials like cookies and authorization headers
  })
);

// Handle preflight (OPTIONS) requests for all routes
app.options("*", cors()); // Make sure all OPTIONS requests get the proper headers

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
