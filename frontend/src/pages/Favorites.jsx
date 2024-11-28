import React, { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Favorites = () => {
  const [myMovies, setMyMovies] = useState([]);
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);
        if (!token) {
          throw new Error("No token found in localStorage.");
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/movies/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMyMovies(response?.data.favoriteMovies);
        console.log("====== ", myMovies);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchData();
    } else {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const totalPages = 3;
  const currentPage = 1;

  // Function to handle movie click and save to localStorage
  const handleMovieClick = (movie) => {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    navigate("/movie-details");
  };

  return (
    <div>
      <div className="bg-zinc-300">
        <h2 className=" pl-20 py-10 font-bold text-2xl">Favorite Movies</h2>
      </div>
      <div className="flex flex-wrap justify-center bg-zinc-300">
        {myMovies?.map((e, i) => (
          <MovieCard
            key={i}
            trackId={e.movieId}
            name={e.name}
            genre={e.genre}
            price={e.price}
            photo={e.photo}
            previewUrl={e.previewUrl}
            releaseDate={e.releaseDate}
            director={e.artistName}
            longDescription={e.longDescription}
            onClick={() => handleMovieClick(e)}
          />
        ))}
      </div>
      {myMovies.length == 0 && (
        <div className="flex w-full h-[80vh] justify-center items-center ">
          <p>You do not have any favorite movies.</p>
        </div>
      )}
      {/* {myMovies.length > 0 && (
        <div className="flex bg-zinc-300 justify-center items-center gap-5 pt-20">
          <button
            disabled={currentPage === 1}
            className="border border-gray-500 px-3 rounded-xl cursor-pointer hover:border-gray-400"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            className="border border-gray-500 px-3 rounded-xl cursor-pointer hover:border-gray-400"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Favorites;
