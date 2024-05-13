import React from "react";
import "../Styles/Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Dashboard</div>
      <ul className="nav-links">
        <li>
          <Link style={{}} to={"assign-grades"}>
            <a href="/assign-grades">Accepted Projects</a>
          </Link>
        </li>

        <li>
          <a href="#">Settings</a>
        </li>

        <li>
          <a href="#">Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
