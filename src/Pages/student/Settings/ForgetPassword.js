import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [resetToken, setResetToken] = useState(null); // State to store reset token
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/request-password-reset",
        {
          email: email,
        }
      );
      setResetToken(response.data.resetToken); // Store reset token in state
      setSuccessMessage(response.data.message);
      setError(null);
      setErrors([]); // Clear any previous errors
    } catch (error) {
      if (error.response && error.response.data) {
        const responseData = error.response.data;
        if (responseData.error) {
          setError(responseData.error);
        } else if (responseData.errors) {
          setErrors(responseData.errors);
        }
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1
          style={{
            fontWeight: "bold",
            marginTop: "50px",
            marginBottom: "60px",
          }}
        >
          Forgot Password?
        </h1>
        <input
          type="email"
          id="number"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.length || error ? "input-error" : ""}
        />
        {errors.map((error, index) => (
          <div key={index} className="error-message">
            {error.msg}
          </div>
        ))}
        {error && <div className="error-message">{error}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <br />
        <br />
        {/* Render the Link only if resetToken is not null */}
        {resetToken && (
          <Link to={"/change-password/" + resetToken}>
            <button className="submitBtn" type="submit">
              Send
            </button>
          </Link>
        )}
      </form>
    </div>
  );
};

export default ForgetPassword;
