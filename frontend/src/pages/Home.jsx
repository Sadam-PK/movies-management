import React from "react";
import MovieCard from "../components/MovieCard";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const movie = [
    {
      name: "movie 1",
      desc: "movie 1 details",
      rating: "7/10",
      photo:
        "https://paradepets.com/.image/t_share/MTkxMzY1Nzg3ODY5ODQ5MTg2/fennec.jpg",
    },
    {
      name: "movie 2",
      desc: "movie 2 details",
      rating: "9/10",
      photo:
        "https://i.pinimg.com/736x/01/64/bc/0164bc773e67bc004be09a77db0b9074--character-concept-art-handmade-toys.jpg",
    },
    {
      name: "movie 3",
      desc: "movie 3 details",
      rating: "8/10",
      photo:
        "https://www.treehugger.com/thmb/f6bheAPa7Dj-aWhyfBpZAyKQnXo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-163520909-a51a026d2f794fc9b7fc1283806a7248.jpg",
    },
    {
      name: "movie 4",
      desc: "movie 4 details",
      rating: "7/10",
      photo:
        "https://compote.slate.com/images/73f0857e-2a1a-4fea-b97a-bd4c241c01f5.jpg",
    },
  ];
  const totalPages = 3;
  const currentPage = 1;
  return (
    <div>
      <div className="bg-zinc-300">
        <h2 className=" pl-20 py-10 font-bold text-2xl">Popular Movies</h2>
      </div>
      <div className="flex flex-wrap justify-center bg-zinc-300">
        {movie.map((e) => {
          return (
            <MovieCard
              name={e.name}
              desc={e.desc}
              rating={e.rating}
              photo={e.photo}
            />
          );
        })}
      </div>
      {/* Pagination controls */}
      {movie.length > 0 && (
        <div className="flex bg-zinc-300 justify-center items-center gap-5 pt-20">
          <button
            // onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="border border-gray-500 px-3 rounded-xl cursor-pointer hover:border-gray-400"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span className="">
            Page {currentPage} of {totalPages}
          </span>
          <button
            // onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="border border-gray-500 px-3 rounded-xl cursor-pointer hover:border-gray-400"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )}

      {/* ----- Footer ----- */}
      <div className="h-[32vh] bg-zinc-300 flex flex-col items-center justify-center">
        <ul className="flex flex-row gap-10">
          <li className="hover:text-indigo-900 cursor-pointer">Android App</li>
          <li className="hover:text-indigo-900 cursor-pointer">
            Terms of service
          </li>
          <li className="hover:text-indigo-900 cursor-pointer">Contact</li>
          <li className="hover:text-indigo-900 cursor-pointer">Sitemap</li>
          <li className="hover:text-indigo-900 cursor-pointer">Contact</li>
        </ul>

        <span className="w-[60vw] py-4 text-sm text-center">
          <p>
            Movie Management offers free online movie streaming, allowing you to
            enjoy thousands of movies and TV shows without the need for
            registration or payment. You can stream instantly from MoviesCloud
            to watch at your convenience.
          </p>
        </span>
      </div>
    </div>
  );
};

export default Home;
