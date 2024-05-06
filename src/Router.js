import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import React from "react";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Pages/Home/Home";
import Projects from "./Pages/Projects";
import Settings from "./Pages/settings";
import BookmarkedProjects from "./Pages/student/BookmarkedProjects";
import MyProjects from "./Pages/student/MyProjects";
import ViewProject from "./Pages/ViewProject";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/bookmarked-student",
        element: <BookmarkedProjects />,
      },
      {
        path: "/my-projects",
        element: <MyProjects />,
      },
      {
        path: "/view-project/:projectId",
        element: <ViewProject />,
      },
    ],
  },
]);
