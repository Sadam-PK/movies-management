import express from "express";
const router = express.Router();
import { authenticateJwt } from "../middleware/user.authenticate.js";
import {
  addFavorites,
  getFavorites,
  movies,
} from "../controllers/movie.controller.js";

// fetch movies from external API
router.get("/", movies);

// add a movie to the user's favorites
router.post("/favorites", authenticateJwt, addFavorites);

// get all the user's favorite movies
router.get("/favorites", authenticateJwt, getFavorites);

export default router;
