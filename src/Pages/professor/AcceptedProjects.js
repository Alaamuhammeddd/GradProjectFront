import React, { useState, useEffect } from "react";
// // import "../../Styles/AssignGrades.css";
// import "../../Styles/Sidebar.css";
import axios from "axios";
import { getAuthUser } from "../../Helper/Storage";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">AcceptedProjects</div>
      <ul className="nav-links">
        <li>
          <a href="/prof-dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/settings">Settings</a>
        </li>
      </ul>
    </div>
  );
};

const AcceptedProjects = () => {
  //   const [tableData, setTableData] = useState([
  //     {
  //       id: 1,
  //       project_id: "",
  //       student_name: "",
  //       student_id: "",
  //       semester_work_grade: "",
  //       max_semester_work_grade: "",
  //       final_work_grade: "",
  //       max_final_work_grade: "",
  //       overall_grade: "",
  //       max_overall_grade: "",
  //     },
  //     {
  //       id: 2,
  //       project_id: "",
  //       student_name: "",
  //       student_id: "",
  //       semester_work_grade: "",
  //       max_semester_work_grade: "",
  //       final_work_grade: "",
  //       max_final_work_grade: "",
  //       overall_grade: "",
  //       max_overall_grade: "",
  //     },
  //     {
  //       id: 3,
  //       project_id: "",
  //       student_name: "",
  //       student_id: "",
  //       semester_work_grade: "",
  //       max_semester_work_grade: "",
  //       final_work_grade: "",
  //       max_final_work_grade: "",
  //       overall_grade: "",
  //       max_overall_grade: "",
  //     },
  //     {
  //       id: 4,
  //       project_id: "",
  //       student_name: "",
  //       student_id: "",
  //       semester_work_grade: "",
  //       max_semester_work_grade: "",
  //       final_work_grade: "",
  //       max_final_work_grade: "",
  //       overall_grade: "",
  //       max_overall_grade: "",
  //     },
  //     {
  //       id: 5,
  //       project_id: "",
  //       student_name: "",
  //       student_id: "",
  //       semester_work_grade: "",
  //       max_semester_work_grade: "",
  //       final_work_grade: "",
  //       max_final_work_grade: "",
  //       overall_grade: "",
  //       max_overall_grade: "",
  //     },
  //     {
  //       id: 6,
  //       project_id: "",
  //       student_name: "",
  //       student_id: "",
  //       semester_work_grade: "",
  //       max_semester_work_grade: "",
  //       final_work_grade: "",
  //       max_final_work_grade: "",
  //       overall_grade: "",
  //       max_overall_grade: "",
  //     },
  //     {
  //       id: 7,
  //       project_id: "",
  //       student_name: "",
  //       student_id: "",
  //       semester_work_grade: "",
  //       max_semester_work_grade: "",
  //       final_work_grade: "",
  //       max_final_work_grade: "",
  //       overall_grade: "",
  //       max_overall_grade: "",
  //     },
  //     // Add more sample data if needed
  //   ]);

  // Function to handle changes in input fields
  //   const handleInputChange = (e, rowIndex, columnName) => {
  //     const newData = [...tableData];
  //     newData[rowIndex][columnName] = e.target.value;
  //     setTableData(newData);
  //   };

  //   // Function to save data
  //   const handleSaveData = () => {
  //     // Perform saving logic here (e.g., send data to server)
  //     console.log("Data has been saved:", tableData);
  //     // You can show a notification to indicate that the data has been saved
  //     alert("Data has been saved!");
  //   };
  const [projects, setProjects] = useState([]);
  const auth = getAuthUser();
  const professor_token = auth.professor_token;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/professor/${auth.professor_id}/approved-projects`,
        {
          headers: {
            token: professor_token,
          },
        }
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching approved projects:", error);
    }
  };
  return (
    <>
      <div
        className="container"
        style={{ display: "flex", justifyContent: "left" }}
      >
        <Sidebar />
        <div
          className="content"
          style={{ marginTop: "100px", marginRight: "auto" }}
        >
          <h2>Assign Grades</h2>
          <div
            className="table"
            style={{
              marginLeft: "auto",
              display: "flex",
              maxHeight: "500px",
              overflowY: "auto",
              overflowX: "auto",
            }}
          >
            <table>
              <thead>
                <tr>
                  <th>Project ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Supervisor Name</th>
                  <th>Graduation Year</th>
                  <th>Graduation Term</th>
                  <th>Department Name</th>

                  <th>Approval Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.project_id}>
                    <td>{project.project_id}</td>
                    <td>{project.title}</td>
                    <td>{project.description}</td>
                    <td>{project.supervisor_name}</td>
                    <td>{project.graduation_year}</td>
                    <td>{project.graduation_term}</td>
                    <td>{project.department_name}</td>

                    <td>{project.approval_status}</td>
                    <td>
                      <div style={{ display: "inline-flex" }}>
                        <Link to={"/assign-grades/" + project.project_id}>
                          <button
                            className="accpt-btn"
                            style={{ margin: "20px" }}
                          >
                            Assign Grades
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcceptedProjects;
