import React, { useState } from "react";
import logo from "../Assets/Images/Logo (2).png";
import { Link } from "react-router-dom";
import { getAuthUser, removeAuthUser } from "../Helper/Storage";
import { useNavigate } from "react-router-dom";
import "../Styles/Header.css";
import Dropdown from "react-bootstrap/Dropdown";
import CircumIcon from "@klarr-agency/circum-icons-react";
import { CiBellOn } from "react-icons/ci";
import axios from "axios";
const Header = () => {
  const auth = getAuthUser();
  let reciepent_id;
  if (auth) {
    reciepent_id = auth.student_id || auth.professor_id || auth.admin_id;
  }
  const navigate = useNavigate();
  console.log("auth:", auth);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const Logout = () => {
    removeAuthUser();
    navigate("/");
  };
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    fetchNotifications();
  };

  const fetchNotifications = async () => {
    try {
      // Make a GET request to fetch unread notifications for the authenticated user
      const response = await axios.get(
        `http://localhost:4000/notification/${reciepent_id}`
      );
      // Assuming the response data contains the notifications
      const unreadNotifications = response.data;
      setNotifications(unreadNotifications);
      console.log(unreadNotifications);
      console.log();
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
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
                Hello,{" "}
                {auth.student_name ||
                  (auth.professor_name && "Dr. " + auth.professor_name) ||
                  auth.admin_name}
              </span>

              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  style={{ backgroundColor: "#083F77", width: "40px" }}
                ></Dropdown.Toggle>

                <Dropdown.Menu>
                  {auth.student_token && auth.student_token.length > 0 ? (
                    <>
                      <Link className="nav-linkitem" to={"/bookmarked-student"}>
                        <Dropdown.Item
                          href="/bookmarked-student"
                          className="dropdownitm"
                        >
                          Bookmarked Projects
                        </Dropdown.Item>
                      </Link>
                      <Link className="nav-linkitem" to={"/my-project"}>
                        <Dropdown.Item
                          href="/my-project"
                          className="dropdownitm"
                        >
                          View My Project
                        </Dropdown.Item>
                      </Link>
                      <Link className="nav-linkitem" to={"/settings"}>
                        <Dropdown.Item href="/settings" className="dropdownitm">
                          Settings
                        </Dropdown.Item>
                      </Link>
                    </>
                  ) : auth.professor_token &&
                    auth.professor_token.length > 0 ? (
                    <>
                      <Link className="nav-linkitem" to={"/prof-dashboard"}>
                        <Dropdown.Item
                          href="/professor-dashboard"
                          className="dropdownitm"
                        >
                          Professor Dashboard
                        </Dropdown.Item>
                      </Link>
                    </>
                  ) : auth.admin_token && auth.admin_token.length > 0 ? (
                    <>
                      <Link className="nav-linkitem" to={"/admin-dashboard"}>
                        <Dropdown.Item
                          href="/admin-dashboard"
                          className="dropdownitm"
                        >
                          Admin Dashboard
                        </Dropdown.Item>
                      </Link>
                    </>
                  ) : null}
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={Logout}
                    style={{ color: "#D31510" }}
                    href="/"
                  >
                    <CircumIcon size="20px" name="logout" /> Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <CiBellOn size="30px" />
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "transparent",
                    width: "40px",
                    color: "#000",
                    marginLeft: "none",
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={toggleNotifications} // Handle click event to toggle notifications
                >
                  <CiBellOn size="30px" />
                </Dropdown.Toggle>
                <Dropdown.Menu show={showNotifications}>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <Dropdown.Item
                        style={{ color: "#000" }}
                        key={notification.id}
                        disabled
                      >
                        {notification.notification_message}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item disabled>No notifications</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </>
        ) : (
          <div>
            <Dropdown>
              <Dropdown.Toggle
                style={{ backgroundColor: "#083f77" }}
                className="lognbtn"
                id="dropdown-basic"
              >
                Log-In
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link className="nav-linkitem" to={"/login-prof"}>
                  <Dropdown.Item href="/login-prof" className="dropdownitm">
                    Log-in As Professor
                  </Dropdown.Item>
                </Link>
                <Link className="nav-linkitem" to={"/login"}>
                  <Dropdown.Item href="/login" className="dropdownitm">
                    Log-in as Student
                  </Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>

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
