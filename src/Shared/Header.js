import React from "react";
import logo from "../Assets/Images/Logo.png";
import { Link } from "react-router-dom";
import { getAuthUser, removeAuthUser } from "../Helper/Storage";
import { useNavigate } from "react-router-dom";
import "../Styles/Header.css";
const Header = () => {
  const auth = getAuthUser();
  const navigate = useNavigate();
  console.log("auth:", auth);

  const Logout = () => {
    removeAuthUser();
    navigate("/");
  };
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

        {auth ? (
          <button className="logoutbtn" onClick={Logout}>
            Logout
          </button>
        ) : (
          <div>
            <Link to={"/login"}>
              <button className="lognbtn">Log In</button>
            </Link>
            <Link to={"/register"}>
              <button className="signbtn">Sign Up</button>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
