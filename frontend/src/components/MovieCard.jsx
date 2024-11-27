import React from "react";
import { useNavigate } from "react-router-dom"; 

const MovieCard = ({
  trackId,
  name,
  genre,
  price,
  photo,
  previewUrl,
  longDescription,
  releaseDate,
  director,
}) => {
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));

    navigate("/movie-details");
  };

  return (
    <div
      className="flex flex-col justify-center items-center bg-white 
    w-[20vw] h-auto rounded-xl p-2 mt-5 mr-5 object-cover"
    >
      <div className="flex flex-col bg-red-400 h-[36vh] w-full">
        <img src={photo} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-3 bg-white h-[14vh] w-[90%] pt-5">
        <span>Title: {name}</span>
        <span>Genre: {genre}</span>
        <span>Price: ${price}</span>
      </div>
      <div className="flex flex-col bg-white h-[10vh] w-full justify-center items-center">
        <button
          className="bg-indigo-900 rounded-lg p-2 w-[90%] text-white"
          onClick={() =>
            handleMovieClick({
              trackId,
              name,
              genre,
              price,
              photo,
              previewUrl,
              longDescription,
              releaseDate,
              director,
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
