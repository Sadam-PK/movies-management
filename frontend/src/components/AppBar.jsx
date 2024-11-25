import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv } from "@fortawesome/free-solid-svg-icons";

const Appbar = () => {
  const user = "sadam@gmail.com";
  // const user = false;

  // conditional render """"" appbar """"" whether or not the user is present
  if (!user) {
    return (
      <div className="bg-white p-3 flex justify-between items-center relative">
        <div className="space-x-2 ml-20">
          <FontAwesomeIcon icon={faTv} className="text-2xl" />
          <Link to="/" className="font-bold">
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
          <Link to="/" className="font-bold">
            Movie Management
          </Link>
        </div>

        <div>
          <ul className="flex flex-row gap-5">
            <li>{user}</li>
            <li
              className="cursor-pointer w-[6vw] text-center bg-indigo-900 text-white 
            rounded-full hover:bg-indigo-700 hover:transition duration-500"
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
