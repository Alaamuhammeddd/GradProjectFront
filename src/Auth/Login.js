import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthUser } from "../Helper/Storage";
import { Alert } from "react-bootstrap";

const LoginProf = () => {
  const [student_id, setStudentid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/student-login",
        {
          student_id,
          password,
        }
      );
      setSuccess("Log-in Successful");
      setAuthUser(response.data);
      sessionStorage.setItem("authUser", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = error.response.data.errors[0].msg;
        setError(errorMessage);
      } else {
        setError("Login Failed. Please try again.");
      }
    }
  };

  return (
    <>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1
            style={{
              fontWeight: "bold",
              marginTop: "50px",
              marginBottom: "60px",
            }}
          >
            Login Here
          </h1>
          <input
            type="text"
            id="number"
            placeholder="Enter Your ID"
            value={student_id}
            onChange={(e) => setStudentid(e.target.value)}
          />
          <br />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="submitBtn" type="submit">
            Login
          </button>
          <p style={{ fontWeight: "bold" }}>
            <Link className="LoginLink" to={"/forget-password-student"}>
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginProf;
