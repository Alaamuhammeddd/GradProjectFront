import Header from "./Shared/Header";
// import Footer from "./Shared/Footer";
import "./Styles/App.css";
import { Outlet } from "react-router-dom";
import React from "react";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default App;
