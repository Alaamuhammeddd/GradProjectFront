import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const CpProfessor = () => {
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const [newPassword, setNewPassword] = useState("");

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:4000/professor/reset-professor-password/${resetToken}`,
        {
          password: newPassword,
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully");
        setTimeout(() => {
          navigate("/login-prof");
        }, 3000); // Give the user 3 seconds to see the success message
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }

    setNewPassword("");
  };

  return (
    <div className="tab-container">
      <div className="profile-tab">
        <div className="email-inputs">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={handleChangeNewPassword}
          />
        </div>

        <button className="save-btn" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CpProfessor;
