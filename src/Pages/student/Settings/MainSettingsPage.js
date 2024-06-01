import React, { useState } from "react";
import EditEmail from "./EditEmail";
import ChangePassword from "./ChangePassword";
import "./Styles/MainSettings.css";

const MainSettingsPage = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <div className="container">
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
  );
};

export default MainSettingsPage;
