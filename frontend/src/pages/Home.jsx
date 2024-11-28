import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [myMovies, setMyMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Check if user is logged in and redirect if not
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch movies with pagination
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/movies?page=${currentPage}&limit=${limit}&term=star`
        );
        setMyMovies(response?.data.movies);
        setTotalMovies(response?.data.totalMovies);
        setTotalPages(response?.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage, limit]);

  // Function to handle movie click and save to localStorage
  const handleMovieClick = (movie) => {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    navigate("/movie-details");
  };

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* ##### popular & favorite section ###### */}
      <div className="bg-zinc-300 flex sm:flex-row sm:justify-between w-full px-6">
        <h2 className=" sm:pl-32 py-10 font-bold sm:text-2xl w-full text-indigo-900">Popular Movies</h2>
        <h2 className=" sm:pr-40 pt-10 font-bold sm:text-2xl w-full text-right hover:text-indigo-900">
          <Link to="/favorites">Favorite Movies</Link>
        </h2>
      </div>

      {/* ########## cards section ######## */}
      <div className="flex flex-wrap justify-center bg-zinc-300">
        {myMovies?.map((e, i) => {
          return (
            <MovieCard
              key={i}
              trackId={e.trackId}
              name={e.trackName}
              genre={e.primaryGenreName}
              price={e.trackPrice}
              photo={e.artworkUrl100}
              previewUrl={e.previewUrl}
              releaseDate={e.releaseDate}
              director={e.artistName}
              longDescription={e.longDescription}
              onClick={() => handleMovieClick(e)}
            />
          );
        })}
      </div>

      {/* ##### Pagination section ###### */}
      {myMovies?.length > 0 && (
        <div className="flex bg-zinc-300 justify-center items-center gap-5 pt-20">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="border border-gray-500 px-3 rounded-xl cursor-pointer hover:border-gray-400"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span className="">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="border border-gray-500 px-3 rounded-xl cursor-pointer hover:border-gray-400"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
