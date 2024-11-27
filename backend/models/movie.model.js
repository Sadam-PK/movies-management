import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: { type: String, required: true },
    genre: { type: String, required: false },
    name: { type: String, required: false },
    photo: { type: String, required: false },
    previewUrl: { type: String, required: false },
    price: { type: String, required: false },
    releaseDate: { type: String, required: false },
    director: { type: String, required: false },
    longDescription: { type: String, required: false },
  },
  { timestamps: true }
);

export const Favorite = mongoose.model("Favorite", favoriteSchema);
