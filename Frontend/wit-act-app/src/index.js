import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Route, Link, Outlet, createRoutesFromElement, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Verification } from "./pages/Verification";
import { Homepage } from "./pages/Homepage";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css"
import Profile from './pages/Profile';

const App = () => (
  <div className="App">
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { 
        path: "/",
        element: <Login />,
      },
      { 
        path: "/register",
        element: <Register />,
      },
      { 
        path: "/verification",
        element: <Verification />,
      },
      { 
        path: "/homepage",
        element: <Homepage />,
      },
      { 
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();