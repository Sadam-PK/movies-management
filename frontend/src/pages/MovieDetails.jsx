import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import axios from "axios";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const storedMovie = localStorage.getItem("selectedMovie");

    if (storedMovie) {
      // Parse the movie data and set it to the state
      const parsedMovie = JSON.parse(storedMovie);
      console.log("Stored Movie:", parsedMovie); // Log to check movie object
      setMovie(parsedMovie);
    }
  }, []);

  // ------ data format -------
  const formatReleaseDate = (releaseDate) => {
    const date = new Date(releaseDate);
    return date.toLocaleDateString("en-US", {
      weekday: "long", // Day of the week (e.g. Monday)
      year: "numeric", // Full year (e.g. 2018)
      month: "long", // Full month name (e.g. October)
      day: "numeric", // Day of the month (e.g. 18)
    });
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  // ### add to favorite ----
  const handleFavorite = async (
    e,
    trackId,
    name,
    genre,
    photo,
    previewUrl,
    price,
    releaseDate,
    director,
    longDescription
  ) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to add to favorites");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/movies/favorites",
        {
          trackId,
          name,
          genre,
          price,
          photo,
          previewUrl,
          releaseDate,
          director,
          longDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == true) {
        toast.success(response.data.message || "Added to favorites!");
      } else {
        toast.error(response.data.message || "Failed to add to favorites.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="background1 relative sm:h-[70vh] h-full flex sm:flex-row flex-col">
      <div className="flex sm:w-[50%] w-full sm:pt-28">
        <div className="absolute inset-0 opacity-80 bg-gray-600" />
        <div className="text-white relative sm:pl-32 px-3 sm:pt-40 pt-20 sm:space-y-6">
          {/* title */}
          <h2 className="sm:font-bold sm:text-4xl">{movie.name}</h2>
          <ul className="flex flex-col gap-5 py-5 pr-40 text-base">
            <li>Genre: {movie.genre}</li>
            <li>Price: {movie.price}</li>
            <li>Release Date: {formatReleaseDate(movie.releaseDate)}</li>
            <li>Director: {movie.director}</li>
            <li>Description: {movie.longDescription}</li>
          </ul>
          {/* ### add to favorite ### */}
          <CustomButton
            name={"Add Favorite"}
            onClick={(e) => {
              handleFavorite(
                e,
                movie.trackId,
                movie.name,
                movie.genre,
                movie.photo,
                movie.previewUrl,
                movie.price,
                movie.releaseDate,
                movie.director,
                movie.longDescription
              );
            }}
            className="bg-indigo-900 p-3 rounded-3xl w-[20vh] hover:bg-indigo-500"
          />
        </div>
      </div>
      <div className="flex justify-center items-center h-[100%] bg-transparent z-10 px-5 sm:w-[50%] ">
        <div className="w-full aspect-w-16 aspect-h-9 flex flex-col border-4 border-gray-300">
          {movie.previewUrl ? (
            <ReactPlayer
              url={movie.previewUrl}
              controls
              width="100%"
              height="100%"
            />
          ) : (
            <div className="w-full sm:h-[40vh] h-[20vh] flex bg-black rounded-md">
              <div className="text-center w-full h-full flex justify-center items-center">
                <p className="text-white">
                  No preview available for this movie.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
