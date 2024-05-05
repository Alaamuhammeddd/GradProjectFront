import React, { useState } from "react";
import logo from "../Assets/Images/Logo.png";
import { Link } from "react-router-dom";
import { getAuthUser, removeAuthUser } from "../Helper/Storage";
import { useNavigate } from "react-router-dom";
import "../Styles/Header.css";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
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
          <Link
            className="nav-link"
            to={"/projects"}
            style={{ fontWeight: "bold" }}
          >
            Projects
          </Link>
          <Link
            className="nav-link"
            to={"/projects"}
            style={{ fontWeight: "bold" }}
          >
            Projects
          </Link>
        </ul>
        <div className="search-container">
          <input
            className="searchInput"
            type="search"
            placeholder="&#x1F50E;&#xFE0E; Search"
          />
        </div>

        {auth ? (
          <div className="user-info">
            <span className="greeting">Hello, {auth.student_name}</span>
            <div className="dropdown">
              <button
                className="dropbtn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                &#9660;
              </button>
              {showDropdown && (
                <div className="dropdown-content">
                  <button onClick={Logout}>Logout</button>
                  <Link to={"/settings"}>
                    <button> Settings </button>
                  </Link>
                  <Link to={"/bookmarked-student"}>
                    <button> Bookmarked Projects </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
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
