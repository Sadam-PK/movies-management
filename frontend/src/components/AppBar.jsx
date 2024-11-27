import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UserContext from "../context/UserContext";
import Logout from "./Logout";

const Appbar = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data.user);
        // window.location.reload();
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // conditional render """"" appbar """"" whether or not the user is present
  if (!user) {
    return (
      <div className="bg-white p-3 flex justify-between items-center relative">
        <div className="space-x-2 ml-20">
          <FontAwesomeIcon icon={faTv} className="text-2xl" />
          <Link to="/" className="font-bold text-2xl">
            Movie Management
          </Link>
        </div>

        <div>
          <ul className="flex flex-row gap-5">
            <li className="hover:text-indigo-900">
              <Link to="/login">Login</Link>
            </li>
            <li className="hover:text-indigo-900">
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="p-3 flex justify-between items-center">
        <div className="space-x-2 ml-20">
          <FontAwesomeIcon icon={faTv} className="text-2xl" />
          <Link to="/" className="font-bold text-2xl">
            Movie Management
          </Link>
        </div>

        <div>
          <ul className="flex flex-row gap-5">
            <li>{user.email}</li>
            <li
              className="cursor-pointer w-[6vw] text-center bg-indigo-900 text-white 
            rounded-full hover:bg-indigo-700 hover:transition duration-500"
            >
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
