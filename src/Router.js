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
import Student from "./Middleware/Student";
import Professor from "./Middleware/Professor";
import Admin from "./Middleware/Admin";
import Guest from "./Middleware/Guest";
import AuthMiddleware from "./Middleware/AuthUser";
import AssignGrades from "./Pages/professor/AssignGrades";
import AcceptedProjects from "./Pages/professor/AcceptedProjects";
import LoginAdmin from "./Pages/admin/LoginAdmin";
import EditEmail from "./Pages/student/Settings/EditEmail";
import ChangePassword from "./Pages/student/Settings/ChangePassword";

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
        element: <Student />,
        children: [
          {
            path: "/bookmarked-student",
            element: <BookmarkedProjects />,
          },
          {
            path: "/my-project",
            element: <MyProject />,
          },
          {
            path: "/view-grades",
            element: <ViewGrades />,
          },
          {
            path: "/add-project",
            element: <AddProject />,
          },
        ],
      },
      {
        element: <Professor />,
        children: [
          {
            path: "/prof-dashboard",
            element: <ProfDashboard />,
          },

          {
            path: "assign-grades/:projectId",
            element: <AssignGrades />,
          },
          {
            path: "prof-dashboard/accepted-projects",
            element: <AcceptedProjects />,
          },
        ],
      },

      {
        element: <AuthMiddleware />,
        children: [
          {
            path: "/view-project/:projectId",
            element: <ViewProject />,
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
            path: "/settings/edit-email",
            element: <EditEmail />,
          },
          {
            path: "/settings/change-password",
            element: <ChangePassword />,
          },
        ],
      },
      {
        element: <Admin />,
        children: [
          {
            path: "/admin-dashboard",
            element: <Dashboardadmin />,
          },
        ],
      },
      {
        element: <Guest />,
        children: [
          {
            path: "/login-admin",
            element: <LoginAdmin />,
          },
          {
            path: "/login-prof",
            element: <LoginProf />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);
