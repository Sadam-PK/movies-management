import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRectangleXmark,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UserContext from "../context/UserContext";
import Logout from "./Logout";
import Menu from "./Menu";
import apiBaseUrl from "../config.js";

const AppBar = () => {
  const { user, setUser } = useContext(UserContext);

  // ##### menu open - close state ####
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // conditional render """"" AppBar """"" whether or not the user is present
  if (!user) {
    return (
      <div className="bg-white p-3 flex justify-between items-center relative">
        <div className="space-x-2 sm:ml-20">
          <FontAwesomeIcon icon={faTv} className="text-2xl" />
          <Link to="/" className="font-bold text-2xl">
            Movie Management
          </Link>
        </div>

        <div>
          <ul className="flex flex-row gap-5">
            <li className="hover:text-indigo-900 sm:block hidden">
              <Link to="/login">Login</Link>
            </li>
            <li className="hover:text-indigo-900 sm:block hidden">
              <Link to="/signup">Signup</Link>
            </li>
            <li onClick={handleMenu} className="sm:hidden cursor-pointer">
              {isOpen ? (
                <FontAwesomeIcon icon={faRectangleXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </li>
          </ul>
          {isOpen && <Menu />}
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="p-3 flex justify-between sm:items-center">
        <div className="space-x-2 sm:ml-20">
          <FontAwesomeIcon icon={faTv} className="text-2xl" />
          <Link to="/" className="font-bold text-2xl">
            Movie Management
          </Link>
        </div>

        <div>
          <ul className="flex sm:flex-row  gap-5">
            <li className="sm:block hidden">{user.email}</li>
            <li
              className="cursor-pointer sm:w-[6vw] text-center bg-indigo-900 text-white 
            sm:rounded-full rounded-lg px-2 hover:bg-indigo-700 hover:transition duration-500 "
            >
              <Logout />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
