import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
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
          <Link className="LoginLink" to={"/login"}>
            Forgot Password?
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
