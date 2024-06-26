import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../Helper/Storage";

const Admin = () => {
  const auth = getAuthUser();
  return (
    <>
      {auth && auth.admin_token && auth.admin_token.length > 0 ? (
        <Outlet />
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default Admin;
