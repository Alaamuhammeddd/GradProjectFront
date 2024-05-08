import React from "react";
import userPhoto from "./assets/user.jpg";
import "./Styles/ProfilePhoto.css";

const ProfilePhoto = ({ userName }) => {
  return (
    <div className="profile-photo-container">
      <div className="profile-photo">
        <img src={userPhoto} alt="User" className="profile-photo-image" />
      </div>
      <div className="profile-name">{userName}</div>
    </div>
  );
};

export default ProfilePhoto;
