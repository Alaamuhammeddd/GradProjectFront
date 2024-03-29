import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthUser } from "../Helper/Storage";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      console.log("Registration successful:", response.data);
      setAuthUser(response.data);
      navigate("/home");
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
      <form onSubmit={handleSubmit}>
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
          id="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <span className="error-msg">{errors.email}</span>}
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
    </>
  );
};

export default Login;
