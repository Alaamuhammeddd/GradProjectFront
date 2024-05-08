import React from "react";
import EditProfileTab from "./EditProfileTab";
import ProfilePhoto from "./ProfilePhoto";
import Username from "./Username";
import "./Styles/SettingsTab.css";
// import "@testing-library/jest-dom/extend-expect";

const MainSettingsPage = () => {
  return (
    <div className="settings-tab">
      <ProfilePhoto />
      <Username />
      <EditProfileTab />
    </div>
  );
};

export default MainSettingsPage;
