import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthUser } from "../../Helper/Storage";
const LoginAdmin = () => {
  const [professor_email, setProfessorEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/professor/professor-login",
        {
          professor_email,
          password,
        }
      );
      console.log("Registration successful:", response.data);
      setAuthUser(response.data);
      sessionStorage.setItem("authUser", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      setErrors(
        error.response.data.errors.reduce((acc, err) => {
          acc[err.param] = err.msg;
          return acc;
        }, {})
      );
    }
  };
  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1
            style={{
              fontWeight: "bold",
              marginTop: "50px",
              marginBottom: "60px",
            }}
          >
            {" "}
            Login Here{" "}
          </h1>
          <input
            type="email"
            id="number"
            placeholder="Enter Your Email"
            value={professor_email}
            onChange={(e) => setProfessorEmail(e.target.value)}
            className={errors.student_id ? "input-error" : ""}
          />
          {errors.studentId && (
            <span className="error-msg">{errors.student_id}</span>
          )}
          <br />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && (
            <span className="error-msg">{errors.password}</span>
          )}
          <br />
          <button className="submitBtn" type="submit">
            Login
          </button>
          <p style={{ fontWeight: "bold" }}>
            <Link className="LoginLink" to={"/login"}>
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginAdmin;
