import React from "react";
import image from "../Assets/Images/Logo.png";
import logo from "../Assets/Images/Logo.png";
import { Link } from "react-router-dom";

import "../Styles/Header.css";
const Header = () => {
  return (
    <>
      <nav>
        <div>
          <img src={logo} alt="GradPath logo" />
          <span>GradPath</span>
        </div>
        <ul>
          <li>Home</li>
          <li>Projects</li>
          <li>About us</li>
        </ul>
        <div className="search-container">
          <input
            className="searchInput"
            type="search"
            placeholder="&#x1F50E;&#xFE0E; Search"
          />
        </div>
        <div>
          <Link to={"/login"}>
            <button className="lognbtn">Log In</button>
          </Link>
          <Link to={"/register"}>
            <button className="signbtn">Sign Up</button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
