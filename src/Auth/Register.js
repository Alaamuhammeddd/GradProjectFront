import React from "react";
import { useState } from "react";
import "../Styles/Register.css";
import { Link } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
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
          Create An Account{" "}
        </h1>
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
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
          Create Account
        </button>
        <p style={{ fontWeight: "bold" }}>
          Already Have An Account?{" "}
          <Link className="LoginLink" to={"/login"}>
            {" "}
            Sign In.
          </Link>
        </p>
      </form>
    </>
  );
};

export default Register;
