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

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background1 relative sm:h-[70vh] h-[40vh] flex flex-row bg-red-400">
      <div className="flex w-[50%]">
        <div className="absolute inset-0 opacity-70 bg-gray-600" />
        <div className="text-white relative pl-32 px-3 pt-32 space-y-6">
          {/* title */}
          <h2 className="font-bold text-4xl sm:text-5xl">{movie.name}</h2>
          <ul className="flex flex-row gap-10 py-5">
            <li>Genre: {movie.genre}</li>
            <li>Price: ${movie.price}</li>
          </ul>

          <CustomButton
            name={"WATCH"}
            className="bg-indigo-900 p-3 rounded-3xl w-[20vh] hover:bg-indigo-500"
          />

          {/* details */}
          <p className="text-lg pr-20 py-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
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
