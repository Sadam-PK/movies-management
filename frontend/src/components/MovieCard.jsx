import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const MovieCard = ({ name, desc, rating, photo }) => {
  return (
    <div
      className="flex flex-col justify-center items-center bg-white 
    w-[28vw] h-auto rounded-xl p-2 mt-5 mr-5 object-cover"
    >
      <div className="flex flex-col bg-red-400 h-[40vh] w-full">
        <img src={photo} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col bg-white h-[14vh] w-[90%] py-2">
        <span>{name}</span>
        <span>{desc}</span>
        <span>{rating}</span>
      </div>
      <div className="flex flex-col bg-white h-[10vh] w-full justify-center items-center">
        <button className="bg-indigo-900 rounded-lg p-2 w-[90%] text-white">
          {" "}
          <FontAwesomeIcon icon={faPlay} /> Watch
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
