// src/components/AuthMiddleware.js
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../Helper/Storage";

const AuthMiddleware = () => {
  const auth = getAuthUser();

  // Check if user is authenticated as admin, professor, or student
  const isAuthenticated =
    auth && (auth.admin_token || auth.professor_token || auth.student_token);

  return <>{isAuthenticated ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default AuthMiddleware;
