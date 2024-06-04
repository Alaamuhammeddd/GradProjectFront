import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/ProfileTab.css";
import { getAuthUser, removeAuthUser } from "../../../Helper/Storage";

const EditEmail = () => {
  const auth = getAuthUser();
  const navigate = useNavigate();
  const [currentEmail, setCurrentEmail] = useState(
    auth?.student_email || auth?.professor_email || ""
  );
  const [newEmail, setNewEmail] = useState("");
  const [message, setMessage] = useState("");
  const isProfessor = auth && auth.professor_id !== undefined;

  const handleChangeNewEmail = (e) => {
    setNewEmail(e.target.value);
  };

  const handleSaveChanges = async () => {
    console.log(auth.professor_id);
    try {
      let apiUrl = "";
      if (isProfessor) {
        apiUrl = `http://localhost:4000/professor/${auth.professor_id}/change-email`;
      } else {
        apiUrl = `http://localhost:4000/auth/${auth.student_id}/change-email`;
      }

      const response = await axios.put(apiUrl, {
        current_email: currentEmail,
        new_email: newEmail,
      });

      if (response.status === 200) {
        toast.success("Email updated successfully. You will be logged out.");
        setTimeout(() => {
          removeAuthUser();
          navigate("/");
        }, 3000); // Give the user 3 seconds to see the success message
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || "An error occurred");
        toast.error(error.response.data.error || "An error occurred");
      } else {
        setMessage("An error occurred");
        toast.error("An error occurred");
      }
    }

    setNewEmail("");
  };

  if (!auth) {
    return null; // Prevent rendering if auth is null
  }

  return (
    <div className="tab-container">
      <div className="profile-tab">
        <div className="user-info">
          <span className="username">
            {auth.student_name ||
              (auth.professor_name && "Dr. " + auth.professor_name) ||
              auth.admin_name}
          </span>
        </div>

        <div className="email-inputs">
          <input
            type="email"
            placeholder="Current Email"
            value={currentEmail}
            disabled
          />

          <input
            type="email"
            placeholder="New Email"
            value={newEmail}
            onChange={handleChangeNewEmail}
          />
        </div>

        <button className="save-btn" onClick={handleSaveChanges}>
          Save Changes
        </button>

        {message && <p>{message}</p>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditEmail;
