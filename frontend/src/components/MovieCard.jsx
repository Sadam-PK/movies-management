import React from "react";

const MovieCard = ({ name, desc, rating, photo }) => {
  return (
    <div
      className="flex flex-col justify-center items-center bg-purple-200 
    w-[28vw] h-auto rounded-xl p-2 mt-5 mr-5 object-cover"
    >
      <div className="flex flex-col bg-red-800 h-[10vh] w-full">
        <span>{name}</span>
        <span>{desc}</span>
        <span>{rating}</span>
      </div>
      <div className="flex flex-col bg-red-400 h-[40vh] w-full">
        <img src={photo} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col bg-red-300 h-[10vh] w-full justify-center items-center">
        <button className="bg-green-600 rounded-lg p-2 w-[90%]">Watch</button>
      </div>
    </div>
  );
};

export default MovieCard;
