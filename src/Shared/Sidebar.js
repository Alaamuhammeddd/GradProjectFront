import React from "react";
import "../Styles/Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Dashboard</div>
      <ul className="nav-links">
        <li>
          <Link to={"accepted-projects"}>
            <a href="/accepted-projects">Accepted Projects</a>
          </Link>
        </li>

        <li>
          <Link to={"/settings"}>
            <a href="/settings">Settings</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
