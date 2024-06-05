import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/Dashboardadmin.css";
import "../../Styles/Sidebar.css";
import { getAuthUser } from "../../Helper/Storage";

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
  const [departments, setDepartments] = useState([]);
  const [graduationTerms, setGraduationTerms] = useState([]);

  // State for projects
  const [projects, setProjects] = useState([]);

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
        const response = await axios.get(
          "http://localhost:4000/admin/pending-projects",
          {
            headers: {
              token: admin_token,
            },
          }
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching pending projects:", error);
      }
    };

    fetchPendingProjects();
  }, []);

  // Function to handle deletion of departments
  const handleDeleteDepartment = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the department "${name}"?`
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          "http://localhost:4000/admin/departments",
          {
            data: { department_name: name },
          },
          {
            headers: {
              token: admin_token,
            },
          }
        );
        if (response.status === 200) {
          setDepartments(departments.filter((dep) => dep.id !== id));
          alert("Department Deleted Successfully!");
        } else {
          alert(response.data.error);
        }
      } catch (error) {
        console.error("Error deleting department:", error);
        alert("Failed to delete department");
      }
    }
  };

  // Function to handle addition of new department
  const handleAddDepartment = async () => {
    const newDepartmentName = prompt("Enter the new department name:");

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
          alert("Department added!");
        } else {
          alert(response.data.error);
        }
      } catch (error) {
        console.error("Error adding new department:", error);
        alert("Failed to add new department");
      }
    }
  };

  // Function to handle deletion of graduation terms
  const handleDeleteTerm = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the term "${name}"?`
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          "http://localhost:4000/admin/graduation-terms",
          {
            headers: {
              token: admin_token,
            },
          },
          {
            data: { graduation_term: name },
          }
        );
        if (response.status === 200) {
          setGraduationTerms(graduationTerms.filter((ter) => ter.id !== id));
          alert("Term Deleted Successfully!");
        } else {
          alert(response.data.error);
        }
      } catch (error) {
        console.error("Error deleting Term:", error);
        alert("Failed to delete Term");
      }
    }
  };

  // Function to handle addition of new graduation term
  const handleAddTerm = async () => {
    const newTermName = prompt("Enter the new term name:");

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
          alert("Term added!");
        } else {
          alert(response.data.error);
        }
      } catch (error) {
        console.error("Error adding new term:", error);
        alert("Failed to add new term");
      }
    }
  };

  return (
    <div className="container" style={{ display: "flex" }}>
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
              onClick={handleAddDepartment}
              style={{ marginBottom: "10px" }}
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
                          onClick={() =>
                            handleDeleteDepartment(
                              department.id,
                              department.name
                            )
                          }
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
            <button onClick={handleAddTerm} style={{ marginBottom: "10px" }}>
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
                          onClick={() => handleDeleteTerm(term.id, term.name)}
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
                  <th>Project Files Path</th>
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
                    <td>{item.project_files_path}</td>
                    <td>{item.github_link}</td>
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
