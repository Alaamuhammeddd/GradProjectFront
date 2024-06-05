import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/ManageUser.css";
import "../../Styles/Sidebar.css";
import { Button, Modal, TextField } from "@mui/material";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Users</div>
      <ul className="nav-links">
        <li>
          <a href="/admin-dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/admin-dashboard/manage-comment">Manage Comments</a>
        </li>
      </ul>
    </div>
  );
};

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    professor_id: "",
    professor_name: "",
    professor_email: "",
    password: "",
    professor_department: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/students")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student accounts:", error);
      });
  }, []);

  const handleDeleteUser = (id) => {
    console.log(`Deleting user with ID ${id}`);
    axios
      .delete(`http://localhost:4000/admin/delete-student/${id}`)
      .then((response) => {
        console.log(response.data.message);
        axios
          .get("http://localhost:4000/admin/students")
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.error("Error fetching updated student accounts:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  const handleAddProfessor = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);

    setFormData({
      professor_id: "",
      professor_name: "",
      professor_email: "",
      password: "",
      professor_department: "",
    });
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/admin/professor-register",
        formData
      );
      console.log("Professor added:", response.data);
      setSuccessMessage("Professor added successfully.");
      setErrorMessage(""); // Clear any previous error message
      setFormData({
        professor_id: "",
        professor_name: "",
        professor_email: "",
        password: "",
        professor_department: "",
      }); // Clear the form data
    } catch (error) {
      console.error("Error adding professor:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = error.response.data.errors.reduce(
          (accumulator, currentError) => {
            accumulator[currentError.param] = currentError.msg;
            return accumulator;
          },
          {}
        );
        setFormErrors(errorMessages);
      } else {
        setErrorMessage("Failed to add professor. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="manage-user-container">
        <Sidebar />
        <div className="admin-panel">
          <div className="admin-icon-left">
            <div className="icon-container">
              <div className="icon-info-left">
                <span className="badge">10+</span>
                <p className="current">Current Users</p>
              </div>
            </div>
          </div>
          <div className="admin-icon-right">
            <div className="icon-container">
              <div className="icon-info-right">
                <span className="badgee">5+</span>
                <p className="deleted">Deleted Users</p>
              </div>
            </div>
          </div>
        </div>
        <h2>Students</h2>
        <div
          className="user-table"
          style={{ position: "absolute", left: "280px", top: "400px" }}
        >
          <Button
            className="add-professor-btn"
            variant="contained"
            onClick={handleAddProfessor}
          >
            Add Professor
          </Button>
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.student_id}>
                  <td>{user.student_id}</td>
                  <td>{user.student_name}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(user.student_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal open={showPopup} onClose={handleClosePopup}>
        <div className="grades-popup-container">
          <div
            className="grades-popup"
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              margin: "10px",
              padding: "30px",
            }}
          >
            <button className="close-btn" onClick={handleClosePopup}>
              X
            </button>
            <h2>Add Professor</h2>

            <TextField
              label="Professor ID"
              name="professor_id"
              value={formData.professor_id}
              onChange={handleChange}
              helperText={formErrors.professor_id || ""}
              error={Boolean(formErrors.professor_id)}
              style={{ marginBottom: "30px" }}
            />

            <TextField
              label="Professor Name"
              name="professor_name"
              value={formData.professor_name}
              onChange={handleChange}
              helperText={formErrors.professor_name || ""}
              error={Boolean(formErrors.professor_name)}
              style={{ marginBottom: "30px" }}
            />

            <TextField
              label="Email"
              name="professor_email"
              value={formData.professor_email}
              onChange={handleChange}
              helperText={formErrors.professor_email || ""}
              error={Boolean(formErrors.professor_email)}
              style={{ marginBottom: "30px" }}
            />

            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              helperText={formErrors.password || ""}
              error={Boolean(formErrors.password)}
              style={{ marginBottom: "30px" }}
            />

            <TextField
              label="Department"
              name="professor_department"
              value={formData.professor_department}
              onChange={handleChange}
              helperText={formErrors.professor_department || ""}
              error={Boolean(formErrors.professor_department)}
              style={{ marginBottom: "30px" }}
            />

            <Button onClick={handleSubmit} variant="contained">
              Add
            </Button>
            {successMessage && (
              <div style={{ color: "green" }}>{successMessage}</div>
            )}
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ManageUser;
