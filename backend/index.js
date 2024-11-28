import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookiesParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import moviesRoutes from "./routes/movie.route.js";
import { databaseConnection } from "./db/dbConnection.js";

const prodOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2];
const devOrigin = ["http://localhost:5173"];

const allowedOrigins =
  process.env.NODE_ENV === "production" ? prodOrigins : devOrigin;

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin)) {
        console.log(origin, allowedOrigins);
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },

    // origin: "http://localhost:5173", // frontend domain
    credentials: true, // for cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookiesParser());
app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);

app.listen(PORT, () => {
  databaseConnection(); // database connection
  console.log(`Server is running on http://localhost:${PORT}`);
});
