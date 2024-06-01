import React, { useState } from "react";
import "./Styles/ProfileTab.css";
// import userImage from "../assets/user.jpg";

const EditEmail = () => {
  const user = {
    username: "JohnDoe",
    currentEmail: "example@example.com",
  };

  const [newEmail, setNewEmail] = useState("");
  const [additionalInput, setAdditionalInput] = useState("");

  const handleChangeEmail = (e) => {
    setNewEmail(e.target.value);
  };

  const handleChangeAdditionalInput = (e) => {
    setAdditionalInput(e.target.value);
  };

  const handleSaveChanges = () => {
    console.log("New email:", newEmail);
    console.log("Additional input:", additionalInput);

    setNewEmail("");
    setAdditionalInput("");
  };

  return (
    <div className="tab-container">
      <div className="profile-tab">
        <div className="user-info">
          <span className="username">{user.username}</span>
        </div>

        <div className="email-inputs">
          <input
            type="email"
            placeholder="Current Email"
            value={user.currentEmail}
            disabled
          />

          <input
            type="email"
            placeholder="Current Email"
            value={newEmail}
            onChange={handleChangeEmail}
          />

          <input
            type="text"
            placeholder="New Email"
            value={additionalInput}
            onChange={handleChangeAdditionalInput}
          />
        </div>

        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
};

export default EditEmail;
