import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: { type: String, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
    releaseDate: { type: String, required: true },
    director: { type: String, required: true },
    longDescription: { type: String, required: true },
  },
  { timestamps: true }
);

export const Favorite = mongoose.model("Favorite", favoriteSchema);
