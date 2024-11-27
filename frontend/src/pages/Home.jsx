import React, { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [myMovies, setMyMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/movies");
        setMyMovies(response?.data.movies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const totalPages = 3;
  const currentPage = 1;

  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <div className="bg-zinc-300">
        <h2 className=" pl-20 py-10 font-bold text-2xl">Popular Movies</h2>
      </div>
      <div className="flex flex-wrap justify-center bg-zinc-300">
        {myMovies?.map((e, i) => {
          return (
            <MovieCard
              key={i}
              name={e.trackName}
              genre={e.primaryGenreName}
              price={e.trackPrice}
              photo={e.artworkUrl100}
            />
          );
        })}
      </div>
      {/* Pagination controls */}
      {myMovies?.length > 0 && (
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
      <Footer />
    </div>
  );
};

export default Home;
