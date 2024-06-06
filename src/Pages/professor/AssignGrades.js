import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/AssignGrades.css";
import "../../Styles/Sidebar.css";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../Helper/Storage";

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

const AssignGrades = () => {
  const { projectId } = useParams();

  const projectIdNumber = parseInt(projectId);

  const [tableData, setTableData] = useState([
    {
      project_id: 0,
      student_name: "",
      student_id: 0,
      semester_work_grade: "", // Initialize with empty strings
      max_semester_work_grade: "",
      final_work_grade: "",
      max_final_work_grade: "",
      overall_grade: "",
      max_overall_grade: "",
    },
  ]);

  const auth = getAuthUser();
  const professor_token = auth.professor_token;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/professor/project/${projectIdNumber}/students`
        );
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [projectIdNumber]); // Adding projectId to dependency array to re-fetch data when it changes

  const handleInputChange = (e, rowIndex, columnName) => {
    console.log("Event value:", e.target.value);
    console.log("Row index:", rowIndex);
    console.log("Column name:", columnName);

    const newData = [...tableData];
    newData[rowIndex][columnName] = e.target.value;
    setTableData(newData);
  };

  const handleSaveData = async () => {
    try {
      await Promise.all(
        tableData.map(async (item) => {
          const response = await axios.put(
            "http://localhost:4000/professor/project/assign-grades",
            {
              professor_id: auth.professor_id,
              student_id: item.student_id,
              project_id: projectIdNumber,
              semester_work_grade: item.semester_work_grade,
              final_work_grade: item.final_work_grade,
              max_semester_work_grade: item.max_semester_work_grade,
              max_final_work_grade: item.max_final_work_grade,
            },
            {
              headers: {
                token: professor_token,
              },
            }
          );

          console.log(response);
        })
      );
      alert("Grades assigned successfully!");
    } catch (error) {
      console.error("Error assigning grades:", error);
      alert("Error assigning grades. Please try again.");
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <div className="table-section">
          <h2>Assign Grades</h2>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Project ID</th>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Semester Work Grade</th>
                  <th>Max Semester Work Grade</th>
                  <th>Final Work Grade</th>
                  <th>Max Final Work Grade</th>
                  <th>Overall Grade</th>
                  <th>Max Overall Grade</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr key={item.student_id}>
                    <td>{projectId}</td>
                    <td>{item.student_name}</td>
                    <td>{item.student_id}</td>
                    <td>
                      <input
                        style={{ height: "50px", width: "175px" }}
                        placeholder="Enter Grade..."
                        type="text"
                        value={item.semester_work_grade}
                        onChange={(e) =>
                          handleInputChange(e, index, "semester_work_grade")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.max_semester_work_grade}
                        onChange={(e) =>
                          handleInputChange(e, index, "max_semester_work_grade")
                        }
                        style={{ height: "50px", width: "175px" }}
                        placeholder="Enter Grade..."
                      />
                    </td>
                    <td>
                      <input
                        style={{ height: "50px", width: "175px" }}
                        placeholder="Enter Grade..."
                        type="text"
                        value={item.final_work_grade}
                        onChange={(e) =>
                          handleInputChange(e, index, "final_work_grade")
                        }
                      />
                    </td>
                    <td>
                      <input
                        style={{ height: "50px", width: "175px" }}
                        placeholder="Enter Grade..."
                        type="text"
                        value={item.max_final_work_grade}
                        onChange={(e) =>
                          handleInputChange(e, index, "max_final_work_grade")
                        }
                      />
                    </td>
                    <td>{item.overall_grade}</td>
                    <td>{item.max_overall_grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={handleSaveData}
            style={{ margin: "10px" }}
            className="save-btn"
          >
            Save Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignGrades;
