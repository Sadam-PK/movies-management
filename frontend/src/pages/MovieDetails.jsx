import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import ReactPlayer from "react-player";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const storedMovie = localStorage.getItem("selectedMovie");

    if (storedMovie) {
      // Parse the movie data and set it to the state
      setMovie(JSON.parse(storedMovie));
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

  return (
    <div className="background1 relative sm:h-[70vh] h-[40vh] flex flex-row bg-red-400">
      <div className="flex w-[50%]">
        <div className="absolute inset-0 opacity-80 bg-gray-600" />
        <div className="text-white relative pl-32 px-3 pt-32 space-y-6">
          {/* title */}
          <h2 className="font-bold text-4xl sm:text-5xl">{movie.name}</h2>
          <ul className="flex flex-col gap-5 py-5 pr-40">
            <li>Genre: {movie.genre}</li>
            <li>Price: {movie.price}</li>
            <li>Release Date: {formatReleaseDate(movie.releaseDate)}</li>
            <li>Director: {movie.director}</li>
            <li>Description: {movie.longDescription}</li>
          </ul>
          {/* <CustomButton
            name={"WATCH"}
            className="bg-indigo-900 p-3 rounded-3xl w-[20vh] hover:bg-indigo-500"
          /> */}
          {/* details */}
        </div>
      </div>
      <div className="flex justify-center items-center h-[80vh] bg-transparent z-10 pr-5 w-[50%]">
        <div className="w-full max-w-4xl aspect-w-16 aspect-h-9 flex flex-col border-4 border-gray-300">
          {movie.previewUrl ? (
            <ReactPlayer
              url={movie.previewUrl}
              controls
              width="100%"
              height="100%"
            />
          ) : (
            <div className="w-full h-[40vh] flex bg-black rounded-md">
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
