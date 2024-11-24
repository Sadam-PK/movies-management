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
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getFavorites = async (req, res) => {};

export const addFavorites = async (req, res) => {};

export const removeFavorite = async (req, res) => {};
