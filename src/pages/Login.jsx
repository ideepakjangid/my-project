import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Context } from "../context/MainContext";

const Login = () => {
  const { login } = useContext(Context);
  const navigator = useNavigate();
  const [error, setError] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, e.target.email.value, e.target.password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        login(user.toJSON());
        navigator("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(error)
        setError(true);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-green-100 min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Login
          </h2>
          {error && <p className="text-red-600 text-sm mt-1">Invalid email/password</p>}
          <form onSubmit={loginHandler} className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </button>
          </form>

          {/* Additional Links */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
