import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../Helper/Storage";

const Student = () => {
  const auth = getAuthUser();
  return (
    <>
      {auth && auth.student_token && auth.student_token.length > 0 ? (
        <Outlet />
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default Student;
