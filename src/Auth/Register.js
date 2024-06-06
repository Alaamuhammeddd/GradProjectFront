import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../Styles/Register.css";
import { setAuthUser } from "../Helper/Storage";
import { Alert } from "react-bootstrap";

const Register = () => {
  const [formData, setFormData] = useState({
    student_id: "",
    student_name: "",
    email: "",
    password: "",
    student_department: "",
  });
  const [errors, setErrors] = useState({});
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear previous errors for the input field
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/student-register",
        formData
      );
      console.log(response.data);
      console.log("Registration successful:", response.data);
      setAuthUser(response.data);
      navigate("/");
      setSuccess("Registration Successful");
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      if (error.response.data.errors) {
        const newErrors = {};
        error.response.data.errors.forEach((error) => {
          newErrors[error.param] = error.msg;
        });
        setErrors(newErrors);
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
      {errors.generic && <Alert variant="danger">{errors.generic}</Alert>}
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h1
            style={{
              fontWeight: "bold",
              marginTop: "50px",
              marginBottom: "20px",
            }}
          >
            Create An Account
          </h1>
          <div className="register-form-group">
            <input
              type="text"
              id="studentid"
              name="student_id"
              placeholder="Enter Your ID"
              value={formData.student_id}
              onChange={handleInputChange}
            />
            {errors.student_id && (
              <p className="error-text">{errors.student_id}</p>
            )}
          </div>

          <div className="register-form-group">
            <input
              type="text"
              id="name"
              name="student_name"
              placeholder="Name"
              value={formData.student_name}
              onChange={handleInputChange}
            />
            {errors.student_name && (
              <p className="error-text">{errors.student_name}</p>
            )}
          </div>

          <div className="register-form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="register-form-group">
            <select
              value={formData.student_department}
              name="student_department"
              onChange={handleInputChange}
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
            {errors.student_department && (
              <p className="error-text">{errors.student_department}</p>
            )}
          </div>

          <div className="register-form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

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
