import React, { useState } from "react";

import "../../Styles/Dashboardadmin.css";
import "../../Styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Dashboard</div>
      <ul className="nav-links">
        <li>
          <a href="#">User</a>
        </li>
        <li>
          <a href="#">Manage Comments </a>
        </li>
        <li>
          <a href="#">Settings</a>
        </li>
        <li>
          <a href="#">Logout</a>
        </li>
      </ul>
    </div>
  );
};

const Dashboardadmin = () => {
  // Sample data for tables
  const tableData = [
    { id: "", title: "", description: "", supervisor_name: "" },
    { id: "", title: "", description: "", supervisor_name: "" },
    { id: "", title: "", description: "", supervisor_name: "" },
    { id: "", title: "", description: "", supervisor_name: "" },
    { id: "", title: "", description: "", supervisor_name: "" },
    { id: "", title: "", description: "", supervisor_name: "" },
    { id: "", title: "", description: "", supervisor_name: "" },
    { id: "", title: "", description: "", supervisor_name: "" },
  ];

  // Departments state and related functions
  const [departments, setDepartments] = useState([
    { id: 1, name: "ComputerScience" },
    { id: 2, name: "InformationSystem" },
    { id: 3, name: "IenternetTecnology" },
    { id: 4, name: "ArtificialIntelligence" },
  ]);

  const [graduationTerms, setGraduationTerms] = useState([
    { id: 1, term: "First-semster" },
    { id: 2, term: "Second-semster" },
    { id: 3, term: "Summer" },
  ]);

  // Function to handle deletion of departments
  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter((dep) => dep.id !== id));
  };

  // Function to handle addition of new department
  const handleAddDepartment = () => {
    const newDepartment = {
      id: departments.length + 1,
      name: `Department ${departments.length + 1}`,
    };
    setDepartments([...departments, newDepartment]);
  };

  // Function to handle deletion of graduation terms
  const handleDeleteTerm = (id) => {
    setGraduationTerms(graduationTerms.filter((term) => term.id !== id));
  };

  // Function to handle addition of new graduation term
  const handleAddTerm = () => {
    const newTerm = {
      id: graduationTerms.length + 1,
      term: `Term ${graduationTerms.length + 1}`,
    };
    setGraduationTerms([...graduationTerms, newTerm]);
  };

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="dashboard"></div>
      <Sidebar />
      <div
        className="content"
        style={{ display: "flex", flexDirection: "column", width: "100%" }}
      >
        {/* Department Table */}
        <div
          className="department-table"
          style={{
            margin: "10px",
            position: "absolute",
            top: "90px",
            left: "280px",
            width: "800px",
            height: "300px",
          }}
        >
          <h2>Departments</h2>
          <button
            onClick={handleAddDepartment}
            style={{
              backgroundColor: "",
              position: "absolute",
              left: "415px",
              top: "15px",
            }}
          >
            Add Department
          </button>
          <table>
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
                      onClick={() => handleDeleteDepartment(department.id)}
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
        {/* Graduation Term Table */}
        <div
          className="term-table"
          style={{
            margin: "10px",
            position: "absolute",
            top: "100px",
            left: "1200px",
            width: "800px",
            height: "300px",
          }}
        >
          <h2>Graduation Terms</h2>
          <button
            onClick={handleAddTerm}
            style={{ position: "absolute", left: "470px", top: "15px" }}
          >
            Add Term
          </button>
          <table>
            <thead>
              <tr>
                <th>Term</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {graduationTerms.map((term) => (
                <tr key={term.id}>
                  <td>{term.term}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteTerm(term.id)}
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
        {/* Project Table */}
        <div
          className="table-section"
          style={{
            margin: "10px",
            position: "absolute",
            top: "500px",
            left: "260px",
          }}
        >
          <h2>Projects</h2>
          <table>
            <thead>
              <tr>
                <th>project_id</th>
                <th>title</th>
                <th>description</th>
                <th>supervisor_name</th>
                <th>graduation_year</th>
                <th>graduation_term</th>
                <th>department_name</th>
                <th>projects_files_path</th>
                <th>github_link</th>
                <th>approval_status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td>{item.project_id}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.supervisor_name}</td>
                  <td>{item.graduation_year}</td>
                  <td>{item.graduation_term}</td>
                  <td>{item.department_name}</td>
                  <td>{item.projects_files_path}</td>
                  <td>{item.github_link}</td>
                  <td>{item.approval_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboardadmin;
