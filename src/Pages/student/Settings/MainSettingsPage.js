import React, { useState } from "react";
import EditEmail from "./EditEmail";
import ChangePassword from "./ChangePassword";
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
  const isAdminOrProfessor = auth && auth.professor_token !== null;

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
            <button
              onClick={() => setActiveComponent("changePassword")}
              className="side-button"
            >
              Change Password
            </button>
          </div>
        </div>
        <div className="form-group">
          {activeComponent === "editEmail" && <EditEmail />}
          {activeComponent === "changePassword" && <ChangePassword />}
        </div>
      </div>
    </>
  );
};

export default MainSettingsPage;
