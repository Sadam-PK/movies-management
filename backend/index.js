import express from "express";
import cors from "cors";
import cookiesParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookiesParser());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend domain
    credentials: true, // for cookies
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});