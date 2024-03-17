import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Styles/Register.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auth/register", {
        name,
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
          Create An Account
        </h1>
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={errors.name ? "input-error" : ""}
        />
        {errors.name && <span className="error-msg">{errors.name}</span>}
        <br />
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
          Create Account
        </button>

        <p style={{ fontWeight: "bold" }}>
          Already Have An Account?{" "}
          <Link className="LoginLink" to={"/login"}>
            Sign In.
          </Link>
        </p>
      </form>
    </>
  );
};

export default Register;
