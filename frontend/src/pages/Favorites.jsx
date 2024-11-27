import React, { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Favorites = () => {
  const [myMovies, setMyMovies] = useState([]);
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // If the user is not logged in, don't make the API request

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in localStorage.");
        }

        const response = await axios.get(
          "http://localhost:3000/api/movies/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMyMovies(response?.data.favoriteMovies);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          // Token might be invalid, handle accordingly
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Check if the token is retrieved correctly
        if (!token) {
          throw new Error("No token found in localStorage.");
        }

        const response = await axios.get(
          "http://localhost:3000/api/movies/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMyMovies(response?.data.favoriteMovies);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const totalPages = 3;
  const currentPage = 1;

  return (
    <div>
      <div className="bg-zinc-300">
        <h2 className=" pl-20 py-10 font-bold text-2xl">Favorite Movies</h2>
      </div>
      <div className="flex flex-wrap justify-center bg-zinc-300">
        {myMovies.map((e) => (
          <MovieCard
            key={e.id} // Use a unique key, like `e.id` or `e.name`
            name={e.name}
            desc={e.desc}
            rating={e.rating}
            photo={e.photo}
          />
        ))}
      </div>
      {myMovies.length > 0 && (
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
      )}
      <Footer />
    </div>
  );
};

export default Favorites;
