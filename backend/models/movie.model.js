import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Favorite = mongoose.model("Favorite", favoriteSchema);
