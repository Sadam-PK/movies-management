import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  trackId,
  name,
  genre,
  price,
  photo,
  previewUrl,
  releaseDate,
  director,
  longDescription,
}) => {
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    navigate("/movie-details");
  };

  return (
    <div
      className="flex flex-col justify-center items-center bg-white text-gray-500
    w-full sm:w-[20vw] h-auto rounded-xl p-2 mt-5 mx-1 sm:mx-4 sm:my-4 object-cover"
    >
      <div className="flex flex-col bg-red-400 h-[36vh] w-full">
        <img src={photo} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col sm:gap-3 gap-4 bg-white h-[14vh] w-[90%] pt-5 sm:text-base font-thin text-sm">
        <span>Title: {name}</span>
        <span>Genre: {genre}</span>
        <span>Price: ${price}</span>
      </div>
      <div className="flex flex-col bg-white h-[10vh] w-full justify-center items-center">
        <button
          className="bg-indigo-900 hover:bg-indigo-700 rounded-lg p-2 w-[90%] text-white"
          onClick={() =>
            handleMovieClick({
              trackId,
              name,
              genre,
              price,
              photo,
              previewUrl,
              releaseDate,
              director,
              longDescription,
            })
          }
        >
          VIEW
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
