import express from "express";
const router = express.Router();
import {authenticateJwt} from '../middleware/user.authenticate.js'; 

// Route to fetch movies from external API
router.get("/movies", (req, res) => {
  // Logic to fetch movies from external API
});

// Route to add a movie to the user's favorites
router.post("/favorites", authenticateJwt, (req, res) => {
  // Logic to add movie to favorites
});

// Route to get all the user's favorite movies
router.get("/favorites", authenticateJwt, (req, res) => {
  // Logic to get the user's favorite movies
});

// Route to remove a movie from the user's favorites
router.delete("/favorites/:movieId", authenticateJwt, (req, res) => {
  // Logic to remove movie from favorites
});

export default router;
