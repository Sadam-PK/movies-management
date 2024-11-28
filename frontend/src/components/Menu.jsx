import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Menu() {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const handleNavigation = (path) => {
    setIsMenuVisible(false);
    navigate(path);
  };

  return (
    <div
      className={`w-[100vw] sm:w-[16vw] bg-zinc-200 mt-4 h-screen left-0 absolute p-3
      border-r border-gray-600 flex pl-8 justify-center ${!isMenuVisible && 'hidden'}`}
    >
      <ul className="pt-3 space-y-5">
        <li className="hover:text-gray-600 cursor-pointer border-b border-gray-300 w-32 text-center pb-1">
          <button onClick={() => handleNavigation('/login')}>Login</button>
        </li>
        <li className="hover:text-gray-600 cursor-pointer border-b border-gray-300 w-32 text-center pb-1">
          <button onClick={() => handleNavigation('/signup')}>Register</button>
        </li>
      </ul>
    </div>
  );
}
