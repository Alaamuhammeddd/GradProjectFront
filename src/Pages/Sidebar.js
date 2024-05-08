import React from "react";
import "../Styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Dashboard</div>
      <ul className="nav-links">
        <li>
          <a href="#">Projects</a>
        </li>

        <li>
          <a href="#">Accepted Projects</a>
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
