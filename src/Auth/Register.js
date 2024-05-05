import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Styles/Register.css";
import { setAuthUser } from "../Helper/Storage";
const Register = () => {
  const [student_id, setStudentid] = useState("");
  const [student_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [student_department, setDepartment] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/student-register",
        {
          student_id,
          student_name,
          email,
          password,
          student_department,
        }
      );
      console.log(response.data);
      console.log("Registration successful:", response.data);
      setAuthUser(response.data);
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      if (error.response.data.errors) {
        setErrors(
          error.response.data.errors.reduce((acc, err) => {
            acc[err.param] = err.msg;
            return acc;
          }, {})
        );
      } else {
        // Handle the case where errors array is not present in the response
        // For example, you could set a generic error message
        setErrors({ generic: "Registration failed. Please try again later." });
      }
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
          id="studentid"
          placeholder="Enter Your ID"
          value={student_id}
          onChange={(e) => setStudentid(e.target.value)}
          className={errors.student_id ? "input-error" : ""}
        />
        {errors.studentId && (
          <span className="error-msg">{errors.student_id}</span>
        )}
        <br />
        <input
          type="text"
          id="name"
          placeholder="Name"
          value={student_name}
          onChange={(e) => setName(e.target.value)}
          className={errors.student_name ? "input-error" : ""}
        />
        {errors.student_name && (
          <span className="error-msg">{errors.student_name}</span>
        )}
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
        <select>
          <option value={student_department}>Select Department</option>
          <option
            value="Software Engineering"
            onChange={(e) => setDepartment(e.target.value)}
          >
            Software Engineering
          </option>
        </select>
        {errors.department && (
          <span className="error-msg">{errors.department}</span>
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
