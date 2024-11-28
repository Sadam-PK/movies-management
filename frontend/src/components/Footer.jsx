import React from "react";

const Footer = () => {
  return (
    <div>
      {/* ----- Footer ----- */}
      <div className="h-[32vh] sm:flex-col bg-zinc-300 flex flex-col items-center justify-center">
        <ul className="flex sm:flex-row flex-wrap sm:gap-10 gap-3 px-3 justify-center">
          <li className="hover:text-indigo-900 cursor-pointer">Android App</li>
          <li className="hover:text-indigo-900 cursor-pointer">
            Terms of service
          </li>
          <li className="hover:text-indigo-900 cursor-pointer">Contact</li>
          <li className="hover:text-indigo-900 cursor-pointer">Sitemap</li>
          <li className="hover:text-indigo-900 cursor-pointer">Contact</li>
        </ul>

        <span className="sm:w-[60vw] py-4 px-6 items-center justify-center flex text-sm font-thin text-center">
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

export default Footer;
