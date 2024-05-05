import React, { useState } from "react";
import logo from "../Assets/Images/Logo.png";
import { Link } from "react-router-dom";
import { getAuthUser, removeAuthUser } from "../Helper/Storage";
import { useNavigate } from "react-router-dom";
import "../Styles/Header.css";
import Dropdown from "react-bootstrap/Dropdown";
import CircumIcon from "@klarr-agency/circum-icons-react";
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
          <Link className="nav-link" to={"/home"}>
            <img src={logo} alt="GradPath logo" />
            <span>GradPath</span>
          </Link>
        </div>

        {auth ? (
          <>
            <ul>
              <Link
                className="nav-linkitem"
                to={"/projects"}
                style={{
                  fontWeight: "bolder",
                  fontSize: "22px",
                  color: "#083f77",
                }}
              >
                Projects
              </Link>
              {/* <Link
            className="nav-link"
            to={"/projects"}
            style={{ fontWeight: "bold" }}
          >
            Projects
          </Link> */}
            </ul>
            <div className="search-container">
              <input
                className="searchInput"
                type="search"
                placeholder="&#x1F50E;&#xFE0E; Search"
              />
            </div>
            <div className="user-info">
              <span className="greeting">Hello, {auth.student_name}</span>

              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  style={{ backgroundColor: "#083F77", width: "40px" }}
                ></Dropdown.Toggle>

                <Dropdown.Menu>
                  <Link className="nav-linkitem" to={"/bookmarked-student"}>
                    <Dropdown.Item href="#/action-1" className="dropdownitm">
                      Bookmarked Projects
                    </Dropdown.Item>
                  </Link>
                  <Link className="nav-linkitem" to={"/my-projects"}>
                    <Dropdown.Item href="#/action-2" className="dropdownitm">
                      My Projects
                    </Dropdown.Item>
                  </Link>

                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={Logout}
                    style={{ color: "#D31510" }}
                    href="#/action-3"
                  >
                    <CircumIcon size="20px" name="logout" /> Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <CircumIcon name="bell_on" />
            </div>
          </>
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
