import React from "react";
import { Link } from "react-router-dom";

const Appbar = () => {
  const user = "sadam@gmail.com";
  // const user = false;

  // conditional render """"" appbar """"" whether or not the user is present
  if (!user) {
    return (
      <div className="bg-blue-400 p-3 flex justify-between items-center relative">
        <Link to="/" className="font-bold">
          Movie Management
        </Link>
        <ul className="flex flex-row gap-5">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div>
      <div className="bg-blue-300 p-3 flex justify-between items-center relative">
        <Link to="/" className="font-bold">
          Event Management
        </Link>

        <ul className="flex flex-row gap-5">
          <li>{user}</li>
          <li
            className="cursor-pointer w-[6vw] text-center bg-blue-600 text-white 
            rounded-full hover:bg-blue-500 hover:transition duration-500"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Appbar;
