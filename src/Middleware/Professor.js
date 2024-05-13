import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../Helper/Storage";

const Professor = () => {
  const auth = getAuthUser();
  return (
    <>
      {auth && auth.professor_token && auth.professor_token.length > 0 ? (
        <Outlet />
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default Professor;
