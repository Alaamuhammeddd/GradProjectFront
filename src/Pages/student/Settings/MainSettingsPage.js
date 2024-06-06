import React, { useState } from "react";
import EditEmail from "./EditEmail";
import "./Styles/MainSettings.css";
// import Sidebar from "../../../Shared/Sidebar.js";
import "../../../Styles/Sidebar.css";
import { getAuthUser } from "../../../Helper/Storage";

const Sidebar = ({ isAdminOrProfessor }) => {
  return (
    <div className="sidebar">
      <div className="logo">Settings</div>
      <ul className="nav-links">
        <li>
          <a href="/prof-dashboard">Dashboard</a>
        </li>
        <li>
          <a href="prof-dashboard/accepted-projects">Accepted Projects</a>
        </li>
      </ul>
    </div>
  );
};
const MainSettingsPage = () => {
  const auth = getAuthUser();
  const [activeComponent, setActiveComponent] = useState(null);
  const isAdminOrProfessor = auth && auth.professor_id > 0;

  return (
    <>
      {isAdminOrProfessor && (
        <div className="sidebar">
          <Sidebar />
        </div>
      )}
      <div className="settings-container">
        <div className="side-btns">
          <div className="side-buttons">
            <button
              onClick={() => setActiveComponent("editEmail")}
              className="side-button"
            >
              Edit Email
            </button>
          </div>
        </div>
        <div className="form-group">
          <EditEmail />
        </div>
      </div>
    </>
  );
};

export default MainSettingsPage;
