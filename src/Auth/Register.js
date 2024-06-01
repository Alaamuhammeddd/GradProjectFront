import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Styles/Register.css";
import { setAuthUser } from "../Helper/Storage";
import { Alert } from "react-bootstrap";

const Register = () => {
  const [student_id, setStudentid] = useState("");
  const [student_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [student_department, setDepartment] = useState("");
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/show-departments"
        );
        const { department_names } = response.data;
        setDepartmentOptions(department_names);
      } catch (error) {
        console.error("Error fetching department names:", error);
      }
    };

    fetchDepartments();
  }, []);

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
      navigate("/");
      setSuccess("Registration Successful");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      if (error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        // Handle the case where errors array is not present in the response
        // For example, you could set a generic error message
        setErrors({ generic: "Registration failed. Please try again later." });
      }
    }
  };

  return (
    <>
      {success && <Alert variant="success">{success}</Alert>}
      {errors && <Alert variant="danger">{errors.generic}</Alert>}{" "}
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
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
          />

          <br />
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={student_name}
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
          <select
            value={student_department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option disabled value="">
              Select Department
            </option>
            {departmentOptions.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>

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
              Sign In.
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
