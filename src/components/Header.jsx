import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/MainContext";
import { IoMenuSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  const { user, logOut } = useContext(Context);
  const [clicked, setClicked] = useState(true);

  // Automatically close the menu when the `user` state changes
  useEffect(() => {
    setClicked(true); // Close the menu when `user` changes (e.g., logout/login)
  }, [user]);

  // Helper function to handle logout and close menu
  const handleLogout = () => {
    logOut(); // Log out the user
    setClicked(true); // Close the menu
  };

  return (
    <div className="w-full shadow-lg sticky top-0 z-10 bg-gradient-to-r from-blue-500 to-green-500 py-5 px-8 flex justify-between items-center relative">
      <div className="text-3xl font-bold">QuizzApp.</div>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex items-center gap-6 font-bold text-[18px]">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user !== null ? (
          <>
            <li>
              <Link to="/add-quiz">Add Quiz</Link>
            </li>
            <li>
              <Link to="/view-quiz">View Quiz</Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                Log Out
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>

      {/* Mobile Menu Icon */}
      {clicked ? (
        <IoMenuSharp
          onClick={() => setClicked(false)}
          className="sm:hidden text-[25px] cursor-pointer"
        />
      ) : (
        <RxCross2
          onClick={() => setClicked(true)}
          className="sm:hidden text-[25px] cursor-pointer font-bold"
        />
      )}

      {/* Mobile Navigation */}
      <ul
        className={`w-full gap-6 font-bold text-[18px] h-screen bg-gradient-to-r from-blue-100 to-green-100 text-black sm:hidden absolute top-[76px] transition-all duration-300 ease-linear ${
          clicked ? "left-[-100%]" : "left-0"
        }`}
      >
        <li className="p-2 ps-4 hover:text-gray-700 border border-gray-400">
          <Link to="/" onClick={() => setClicked(true)}>
            Home
          </Link>
        </li>
        {user !== null ? (
          <>
            <li className="p-2 ps-4 hover:text-gray-700 border border-gray-400">
              <Link to="/add-quiz" onClick={() => setClicked(true)}>
                Add Quiz
              </Link>
            </li>
            <li className="p-2 ps-4 hover:text-gray-700 border border-gray-400">
              <Link to="/view-quiz" onClick={() => setClicked(true)}>
                View Quiz
              </Link>
            </li>
            <li className="p-2 ps-4 hover:text-gray-700 border border-gray-400">
              <Link to="/" onClick={handleLogout}>
                Log Out
              </Link>
            </li>
          </>
        ) : (
          <li className="p-2 ps-4 hover:text-gray-700 border border-gray-400">
            <Link to="/login" onClick={() => setClicked(true)}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
