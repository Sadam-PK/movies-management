import React from "react";
import CustomButton from "../components/CustomButton";
import ReactPlayer from "react-player";

const MovieDetails = () => {
  return (
    <div className="background1 relative sm:h-[70vh] h-[40vh] flex flex-row bg-red-400">
      <div className="flex w-[50%]">
        <div className="absolute inset-0 opacity-70 bg-gray-600" />
        <div className="text-white relative pl-32 px-3 pt-32 space-y-6">
          {/* title */}
          <h2 className="font-bold text-4xl sm:text-5xl">Movie Name</h2>
          <ul className="flex flex-row gap-10 py-5">
            <li>time</li>
            <li>rating</li>
            <li>more</li>
          </ul>

          <CustomButton
            name={"WATCH"}
            className="bg-indigo-900 p-3 rounded-3xl w-[20vh]
        hover:bg-indigo-500"
          />

          {/* details */}
          <p className="text-lg pr-20 py-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center h-screen bg-transparent z-10 pr-5 w-[50%]">
        {
          <div className="w-full max-w-4xl aspect-w-16 aspect-h-9">
            <ReactPlayer
              url="https://youtu.be/rpQFuuoAxTc"
              controls
              width=""
              height="52vh"
            />
          </div>
        }
      </div>
    </div>
  );
};

export default MovieDetails;
