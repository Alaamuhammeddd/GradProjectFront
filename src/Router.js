import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import React from "react";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Pages/Home/Home";
import Projects from "./Pages/Projects";
// import Settings from "./Pages/settings";
import BookmarkedProjects from "./Pages/student/BookmarkedProjects";
import MyProject from "./Pages/student/MyProject";
import ViewProject from "./Pages/ViewProject";
import ViewGrades from "./Pages/student/ViewGrades";
import AddProject from "./Pages/student/AddProject";
import LoginProf from "./Auth/LoginProf";
import MainSettingsPage from "./Pages/student/Settings/MainSettingsPage";
import ProfDashboard from "./Pages/professor/ProfDashboard";
import Dashboardadmin from "./Pages/admin/Dashboardadmin";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
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
        element: <MainSettingsPage />,
      },
      {
        path: "/bookmarked-student",
        element: <BookmarkedProjects />,
      },
      {
        path: "/my-project",
        element: <MyProject />,
      },
      {
        path: "/view-project/:projectId",
        element: <ViewProject />,
      },
      {
        path: "/view-grades",
        element: <ViewGrades />,
      },
      {
        path: "/add-project",
        element: <AddProject />,
      },
      {
        path: "/login-prof",
        element: <LoginProf />,
      },
      {
        path: "/prof-dashboard",
        element: <ProfDashboard />,
      },
      {
        path: "/admin-dashboard",
        element: <Dashboardadmin />,
      },
    ],
  },
]);
