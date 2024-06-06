import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/ManageUser.css";
import "../../Styles/Sidebar.css";
import { Button, Modal, TextField } from "@mui/material";
import { getAuthUser } from "../../Helper/Storage";

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
  const auth = getAuthUser();
  const admin_token = auth.admin_token;
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
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
      .get("http://localhost:4000/admin/students", {
        headers: {
          token: admin_token,
        },
      })
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
      .delete(`http://localhost:4000/admin/delete-student/${id}`, {
        headers: {
          token: admin_token,
        },
      })
      .then((response) => {
        console.log(response.data.message);
        axios
          .get("http://localhost:4000/admin/students", {
            headers: {
              token: admin_token,
            },
          })
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
        formData,
        {
          headers: {
            token: admin_token,
          },
        }
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

  const handleShowDeleteConfirmation = (user) => {
    setSelectedUser(user);
    setShowDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      handleDeleteUser(selectedUser.student_id);
      setShowDeleteConfirmation(false);
      setSelectedUser(null);
    }
  };

  return (
    <>
      <div className="manage-user-container">
        <Sidebar />
        <h2>Students</h2>
        <div
          className="user-table"
          style={{ position: "absolute", left: "280px", top: "200px" }}
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
                      onClick={() => handleShowDeleteConfirmation(user)}
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

      <Modal
        open={showDeleteConfirmation}
        onClose={handleCloseDeleteConfirmation}
      >
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
            <button
              className="close-btn"
              onClick={handleCloseDeleteConfirmation}
            >
              X
            </button>
            <h2>Confirm Delete</h2>
            <div style={{ marginBottom: "30px" }}>
              Are you sure you want to delete the student with ID:{" "}
              {selectedUser?.student_id} and Name: {selectedUser?.student_name}?
            </div>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              style={{ marginBottom: "10px" }}
            >
              Delete
            </Button>
            <Button onClick={handleCloseDeleteConfirmation} variant="outlined">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ManageUser;
