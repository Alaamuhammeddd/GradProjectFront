import React, { useState } from "react";
import "../../Styles/AssignGrades.css";
import "../../Styles/Sidebar.css";

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
  // Sample data for tables
  const [tableData, setTableData] = useState([
    {
      id: 1,
      project_id: "",
      student_name: "",
      student_id: "",
      semester_work_grade: "",
      max_semester_work_grade: "",
      final_work_grade: "",
      max_final_work_grade: "",
      overall_grade: "",
      max_overall_grade: "",
    },
    {
      id: 2,
      project_id: "",
      student_name: "",
      student_id: "",
      semester_work_grade: "",
      max_semester_work_grade: "",
      final_work_grade: "",
      max_final_work_grade: "",
      overall_grade: "",
      max_overall_grade: "",
    },
    {
      id: 3,
      project_id: "",
      student_name: "",
      student_id: "",
      semester_work_grade: "",
      max_semester_work_grade: "",
      final_work_grade: "",
      max_final_work_grade: "",
      overall_grade: "",
      max_overall_grade: "",
    },
    {
      id: 4,
      project_id: "",
      student_name: "",
      student_id: "",
      semester_work_grade: "",
      max_semester_work_grade: "",
      final_work_grade: "",
      max_final_work_grade: "",
      overall_grade: "",
      max_overall_grade: "",
    },
    {
      id: 5,
      project_id: "",
      student_name: "",
      student_id: "",
      semester_work_grade: "",
      max_semester_work_grade: "",
      final_work_grade: "",
      max_final_work_grade: "",
      overall_grade: "",
      max_overall_grade: "",
    },
    {
      id: 6,
      project_id: "",
      student_name: "",
      student_id: "",
      semester_work_grade: "",
      max_semester_work_grade: "",
      final_work_grade: "",
      max_final_work_grade: "",
      overall_grade: "",
      max_overall_grade: "",
    },
    {
      id: 7,
      project_id: "",
      student_name: "",
      student_id: "",
      semester_work_grade: "",
      max_semester_work_grade: "",
      final_work_grade: "",
      max_final_work_grade: "",
      overall_grade: "",
      max_overall_grade: "",
    },
    // Add more sample data if needed
  ]);

  // Function to handle changes in input fields
  const handleInputChange = (e, rowIndex, columnName) => {
    const newData = [...tableData];
    newData[rowIndex][columnName] = e.target.value;
    setTableData(newData);
  };

  // Function to save data
  const handleSaveData = () => {
    // Perform saving logic here (e.g., send data to server)
    console.log("Data has been saved:", tableData);
    // You can show a notification to indicate that the data has been saved
    alert("Data has been saved!");
  };

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Sidebar />
      <div
        className="content"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "20%",
        }}
      >
        <div
          className="table-section"
          style={{
            marginLeft: "auto",
            position: "absolute",
          }}
        >
          <h2>Assign Grades</h2>
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
                <tr key={item.id}>
                  <td>{item.project_id}</td>
                  <td>{item.student_name}</td>
                  <td>{item.student_id}</td>

                  <td>
                    <input
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
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.final_work_grade}
                      onChange={(e) =>
                        handleInputChange(e, index, "final_work_grade")
                      }
                    />
                  </td>
                  <td>
                    <input
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
          <button
            onClick={handleSaveData}
            style={{ margin: "10px", position: "absolute", left: "1200px" }}
          >
            Save Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignGrades;
