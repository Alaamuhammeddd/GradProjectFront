import Header from "./Shared/Header";

import "./Styles/App.css";

import { Outlet } from "react-router-dom";
import React from "react";

const App = () => {
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default App;
