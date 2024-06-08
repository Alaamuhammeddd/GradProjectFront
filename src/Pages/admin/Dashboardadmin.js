import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/Dashboardadmin.css";
import "../../Styles/Sidebar.css";
import { getAuthUser } from "../../Helper/Storage";
import { Button, Modal, TextField } from "@mui/material";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Dashboard</div>
      <ul className="nav-links">
        <li>
          <a href="/admin-dashboard/manage-user">User</a>
        </li>
        <li>
          <a href="/admin-dashboard/manage-comment">Manage Comments</a>
        </li>
      </ul>
    </div>
  );
};

const Dashboardadmin = () => {
  const auth = getAuthUser();
  const admin_token = auth.admin_token;
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [graduationTerms, setGraduationTerms] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [deleteDepartment, setDeleteDepartment] = useState(null);
  const [newTermName, setNewTermName] = useState("");
  const [deleteTerm, setDeleteTerm] = useState(null);
  const [showAddTermPopup, setShowAddTermPopup] = useState(false);
  const [showDeleteTermPopup, setShowDeleteTermPopup] = useState(false);

  // State for projects
  const [projects, setProjects] = useState([]);

  const handleClosePopup = () => {
    setShowAddPopup(false);
    setShowDeletePopup(false);
    setShowAddTermPopup(false);
    setShowDeleteTermPopup(false);
    setSuccessMessage("");
    setErrorMessage("");
    setNewDepartmentName("");
    setDeleteDepartment(null);
    setNewTermName("");
    setDeleteTerm(null);
  };
  // Fetch department names from backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/show-departments"
        );
        const departmentNames = response.data.department_names.map(
          (name, index) => ({ id: index + 1, name })
        );
        setDepartments(departmentNames);
      } catch (error) {
        console.error("Error fetching department names:", error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchGraduationTerms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/show-term"
        );
        const termNames = response.data.graduation_term.map((name, index) => ({
          id: index + 1,
          name,
        }));
        setGraduationTerms(termNames);
      } catch (error) {
        console.error("Error fetching graduation terms:", error);
      }
    };

    fetchGraduationTerms();
  }, []);

  // Fetch pending projects from backend
  useEffect(() => {
    const fetchPendingProjects = async () => {
      try {
        const response = await axios.get("http://localhost:4000/admin/all", {
          headers: {
            token: admin_token,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching pending projects:", error);
      }
    };

    fetchPendingProjects();
  }, []);

  // Function to handle addition of new department
  const handleAddDepartment = async () => {
    if (newDepartmentName) {
      try {
        const response = await axios.post(
          "http://localhost:4000/admin/departments",
          {
            department_name: newDepartmentName,
          },
          {
            headers: {
              token: admin_token,
            },
          }
        );
        if (response.status === 200) {
          const newDepartment = {
            id: departments.length + 1,
            name: newDepartmentName,
          };
          setDepartments([...departments, newDepartment]);
          setSuccessMessage("Department added successfully!");
          setErrorMessage("");
        } else {
          setErrorMessage(response.data.error);
        }
      } catch (error) {
        console.error("Error adding new department:", error);
        setErrorMessage("Failed to add new department");
      }
    } else {
      setErrorMessage("Department name cannot be empty");
    }
  };

  // Function to handle deletion of departments
  const handleDeleteDepartment = async () => {
    if (deleteDepartment) {
      try {
        const response = await axios.delete(
          "http://localhost:4000/admin/departments",
          {
            data: { department_name: deleteDepartment.name },
            headers: {
              token: admin_token,
            },
          }
        );
        if (response.status === 200) {
          setDepartments(
            departments.filter((dep) => dep.id !== deleteDepartment.id)
          );
          setSuccessMessage("Department deleted successfully!");
          setErrorMessage("");
        } else {
          setErrorMessage(response.data.error);
        }
      } catch (error) {
        console.error("Error deleting department:", error);
        setErrorMessage("Failed to delete department");
      }
    } else {
      setErrorMessage("No department selected for deletion");
    }
  };
  const handleAddTerm = async () => {
    if (newTermName) {
      try {
        const response = await axios.post(
          "http://localhost:4000/admin/graduation-terms",
          {
            graduation_term: newTermName,
          },
          {
            headers: {
              token: admin_token,
            },
          }
        );
        if (response.status === 200) {
          const newTerm = {
            id: graduationTerms.length + 1,
            name: newTermName,
          };
          setGraduationTerms([...graduationTerms, newTerm]);
          setSuccessMessage("Term added successfully!");
          setErrorMessage("");
        } else {
          setErrorMessage(response.data.error);
        }
      } catch (error) {
        console.error("Error adding new term:", error);
        setErrorMessage("Failed to add new term");
      }
    } else {
      setErrorMessage("Term name cannot be empty");
    }
  };
  const handleDeleteTerm = async () => {
    if (deleteTerm) {
      try {
        const response = await axios.delete(
          "http://localhost:4000/admin/graduation-terms",
          {
            data: { graduation_term: deleteTerm.name },
            headers: {
              token: admin_token,
            },
          }
        );
        if (response.status === 200) {
          setGraduationTerms(
            graduationTerms.filter((term) => term.id !== deleteTerm.id)
          );
          setSuccessMessage("Term deleted successfully!");
          setErrorMessage("");
        } else {
          setErrorMessage(response.data.error);
        }
      } catch (error) {
        console.error("Error deleting term:", error);
        setErrorMessage("Failed to delete term");
      }
    } else {
      setErrorMessage("No term selected for deletion");
    }
  };
  return (
    <div className="container" style={{ display: "flex" }}>
      <Modal open={showAddPopup} onClose={handleClosePopup}>
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
            <h2>Add Department</h2>
            <TextField
              label="Department Name"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              style={{ marginBottom: "30px" }}
            />
            <Button onClick={handleAddDepartment}>Add</Button>
            {successMessage && (
              <div style={{ color: "green" }}>{successMessage}</div>
            )}
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          </div>
        </div>
      </Modal>

      <Modal open={showDeletePopup} onClose={handleClosePopup}>
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
            <h2>Delete Department</h2>
            <div style={{ marginBottom: "30px" }}>
              Are you sure you want to delete the department "
              {deleteDepartment?.name}"?
            </div>
            <Button onClick={handleDeleteDepartment}>Delete</Button>
            {successMessage && (
              <div style={{ color: "green" }}>{successMessage}</div>
            )}
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          </div>
        </div>
      </Modal>
      <Modal open={showAddTermPopup} onClose={handleClosePopup}>
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
            <h2>Add Term</h2>
            <TextField
              label="Term Name"
              value={newTermName}
              onChange={(e) => setNewTermName(e.target.value)}
              style={{ marginBottom: "30px" }}
            />
            <Button onClick={handleAddTerm}>Add</Button>
            {successMessage && (
              <div style={{ color: "green" }}>{successMessage}</div>
            )}
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          </div>
        </div>
      </Modal>
      <Modal open={showDeleteTermPopup} onClose={handleClosePopup}>
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
            <h2>Delete Term</h2>
            <div style={{ marginBottom: "30px" }}>
              Are you sure you want to delete the term "{deleteTerm?.name}"?
            </div>
            <Button onClick={handleDeleteTerm}>Delete</Button>
            {successMessage && (
              <div style={{ color: "green" }}>{successMessage}</div>
            )}
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          </div>
        </div>
      </Modal>
      <Sidebar />
      <div className="content" style={{ flex: 1, padding: "20px" }}>
        {/* Top section containing department and term tables */}
        <div style={{ display: "flex", marginBottom: "20px" }}>
          {/* Department Table */}
          <div
            className="department-table"
            style={{ flex: 1, marginRight: "20px" }}
          >
            <h2>Departments</h2>
            <button
              onClick={() => setShowAddPopup(true)}
              style={{ marginBottom: "10px" }}
              className="add-btn"
            >
              Add Department
            </button>
            <div
              className="table-container"
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
              }}
            >
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Department Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((department) => (
                    <tr key={department.id}>
                      <td>{department.name}</td>
                      <td>
                        <button
                          onClick={() => {
                            setDeleteDepartment(department);
                            setShowDeletePopup(true);
                          }}
                          style={{
                            backgroundColor: "rgb(236, 91, 91)",
                            borderRadius: "10px",
                          }}
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

          {/* Graduation Term Table */}
          <div className="term-table" style={{ flex: 1 }}>
            <h2>Graduation Terms</h2>
            <button
              onClick={() => setShowAddTermPopup(true)}
              style={{ marginBottom: "10px" }}
              className="add-btn"
            >
              Add Term
            </button>
            <div
              className="table-container"
              style={{
                maxHeight: "200px",
                overflowY: "auto",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
              }}
            >
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Term</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {graduationTerms.map((term) => (
                    <tr key={term.id}>
                      <td>{term.name}</td>
                      <td>
                        <button
                          onClick={() => {
                            setDeleteTerm(term);
                            setShowDeleteTermPopup(true);
                          }}
                          style={{
                            backgroundColor: "rgb(236, 91, 91)",
                            borderRadius: "10px",
                          }}
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
        </div>

        {/* Project Table */}
        <div className="table-section">
          <h2>Projects</h2>
          <div
            className="table-container"
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
              overflowX: "auto",
              width: "1500px", // Allow horizontal scrolling
            }}
          >
            <table style={{ width: "1500px" }}>
              {" "}
              {/* Set fixed width */}
              <thead>
                <tr>
                  <th>Project ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Supervisor Name</th>
                  <th>Graduation Year</th>
                  <th>Graduation Term</th>
                  <th>Department Name</th>
                  <th>GitHub Link</th>
                  <th>Approval Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((item) => (
                  <tr key={item.project_id}>
                    <td>{item.project_id}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.supervisor_name}</td>
                    <td>{item.graduation_year}</td>
                    <td>{item.graduation_term}</td>
                    <td>{item.department_name}</td>
                    <td>
                      <a
                        target="_blank" // Add this line
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "blue" }}
                        href={item.github_link}
                      >
                        {item.github_link}
                      </a>
                    </td>
                    <td>{item.approval_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardadmin;
