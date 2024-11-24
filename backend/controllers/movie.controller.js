import axios from "axios";
import { Favorite } from "../models/movie.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.SECRET;

export const movies = async (req, res) => {
  try {
    const response = await axios.get(
      "https://itunes.apple.com/search?term=star&country=au&media=movie"
    );

    return res.status(200).json(response.data.results);
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const addFavorites = async (req, res) => {
  const userId = req.user._id;
  const { trackId } = req.body;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ error: "userId is required to add to favorites" });
    }

    if (!trackId) {
      return res
        .status(400)
        .json({ error: "trackId is required to add to favorites" });
    }

    const favorite = await new Favorite({
      userId: userId,
      movieId: trackId,
    });

    favorite.save();

    return res.status(200).json({ status: true, message: "Added to favorite" });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const favoriteMovies = await Favorite.find({});
    return res.status(200).json({ status: true, favoriteMovies });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const removeFavorite = async (req, res) => {};
