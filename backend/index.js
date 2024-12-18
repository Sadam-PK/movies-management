import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });
import cors from "cors";
import cookiesParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import moviesRoutes from "./routes/movie.route.js";
import { databaseConnection } from "./db/dbConnection.js";

const PORT = process.env.PORT || 3000;
const app = express();

const __dirname = path.resolve();

app.use(cors());

app.use(express.json());
app.use(cookiesParser());

app.use("/api/auth", authRoutes);
app.use("/api/movies", moviesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  databaseConnection(); // Connect to the database
  console.log(`Server is running on http://localhost:${PORT}`);
});
