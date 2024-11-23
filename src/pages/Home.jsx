import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-[95vh] p-4 bg-gradient-to-r from-blue-100 to-green-100">
        <div className="max-w-3xl text-center space-y-8 p-6 bg-white rounded-xl shadow-lg">
          {/* App Title */}
          <h1 className="text-5xl font-extrabold text-gray-800">
            <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
              Quiz Master
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 font-medium">
            Create, manage, and explore quizzes effortlessly. Start building
            your knowledge today!
          </p>

          {/* Call-to-Action Section */}
          <div className="flex justify-center space-x-4">
            {/* Add Quiz Button */}
            <Link
              to="/add-quiz"
              className="px-8 py-3 text-white bg-blue-500 font-semibold text-lg rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transform hover:scale-105 transition-transform duration-200"
            >
              Add Quiz
            </Link>

            {/* View Quizzes Button */}
            <Link
              to="/view-quiz"
              className="px-8 py-3 text-white bg-green-500 font-semibold text-lg rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300 transform hover:scale-105 transition-transform duration-200"
            >
              View Quizzes
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
