import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AddQuiz from "./pages/AddQuiz";
import ViewQuiz from "./pages/ViewQuiz";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Play from "./pages/Play";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-w9PoN52LuVtpW7ZKnwnZyEP1R8Wdo20",
  authDomain: "fir-project-81787.firebaseapp.com",
  databaseURL:
    "https://fir-project-81787-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-project-81787",
  storageBucket: "fir-project-81787.firebasestorage.app",
  messagingSenderId: "793383140379",
  appId: "1:793383140379:web:9d7f7e8b4fc3279a728cbe",
  measurementId: "G-TFNJ9XN9MF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/add-quiz",
          element: <AddQuiz />,
        },
        {
          path: "/view-quiz",
          element: <ViewQuiz />,
        },
        {
          path: "/play-quiz",
          element: <Play />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  return <RouterProvider router={routes}></RouterProvider>;
};

export default App;
