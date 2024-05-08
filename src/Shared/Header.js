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
          <Link className="nav-link" to={"/"}>
            <img src={logo} alt="GradPath logo" />
            <span>GradPath</span>
          </Link>
        </div>

        {auth ? (
          <>
            <ul>
              <Link
                className="nav-linkitem"
                to={"/"}
                style={{
                  fontWeight: "bolder",
                  fontSize: "22px",
                  color: "#083f77",
                  marginRight: "20px",
                }}
              >
                Home
              </Link>
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
            </ul>

            <div className="user-info">
              <span className="greeting">
                Hello, {auth.student_name || "Dr. " + auth.professor_name}
              </span>

              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  style={{ backgroundColor: "#083F77", width: "40px" }}
                ></Dropdown.Toggle>

                <Dropdown.Menu>
                  <Link className="nav-linkitem" to={"/bookmarked-student"}>
                    <Dropdown.Item
                      href="/bookmarked-student"
                      className="dropdownitm"
                    >
                      Bookmarked Projects
                    </Dropdown.Item>
                  </Link>
                  <Link className="nav-linkitem" to={"/my-project"}>
                    <Dropdown.Item href="/my-project" className="dropdownitm">
                      View My Project
                    </Dropdown.Item>
                  </Link>
                  <Link className="nav-linkitem" to={"/settings"}>
                    <Dropdown.Item href="/settings" className="dropdownitm">
                      Settings
                    </Dropdown.Item>
                  </Link>

                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={Logout}
                    style={{ color: "#D31510" }}
                    href="/login"
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
