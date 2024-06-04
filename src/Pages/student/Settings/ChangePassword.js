import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/ProfileTab.css";
import { getAuthUser, removeAuthUser } from "../../../Helper/Storage";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const auth = getAuthUser();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setPasswordsMatch(false);
      toast.error("Passwords Mismatch");
      return;
    }

    try {
      let apiUrl = "";
      if (auth && auth.professor_id !== undefined) {
        apiUrl = `http://localhost:4000/professor/${auth.professor_id}/change-password`;
      } else if (auth && auth.student_id !== undefined) {
        apiUrl = `http://localhost:4000/auth/${auth.student_id}/change-password`;
      } else {
        throw new Error("User account type not recognized");
      }

      const response = await axios.put(apiUrl, {
        old_password: oldPassword,
        new_password: newPassword,
      });

      if (response.status === 200) {
        toast.success("Password updated successfully. You will be logged out.");
        setTimeout(() => {
          removeAuthUser();
          navigate("/");
        }, 3000); // Give the user 3 seconds to see the success message
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }

    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  if (!auth) {
    return null; // Prevent rendering if auth is null
  }

  return (
    <div className="tab-container">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        style={{
          fontSize: "16px",
          fontFamily: "Arial",
          color: "white",
          maxHeight: "fit-content",
          maxWidth: "fit-content",
        }}
      />
      <div className="profile-tab">
        <h2>Change Password</h2>
        <form className="change-password" onSubmit={handleSaveChanges}>
          <div className="input-container">
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter old password..."
              value={oldPassword}
              onChange={handleChangeOldPassword}
              required
            />
            <br />

            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password..."
              value={newPassword}
              onChange={handleChangeNewPassword}
              required
              className={passwordsMatch ? "" : "passwords-mismatch"}
            />
            <br />

            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm new password..."
              value={confirmNewPassword}
              onChange={handleChangeConfirmNewPassword}
              required
              className={passwordsMatch ? "" : "passwords-mismatch"}
            />
            <br />
          </div>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
