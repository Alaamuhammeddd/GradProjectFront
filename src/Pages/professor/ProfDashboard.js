import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/Dashboard.css";
import "../../Styles/Dashboardadmin.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "../../Styles/Sidebar.css";
import Sidebar from "../../Shared/Sidebar";
import "../../Styles/Sidebar.css";
import { PieChart } from "react-minimal-pie-chart";
import { ImStack } from "react-icons/im";
import { FaArrowTrendUp } from "react-icons/fa6";

import { getAuthUser } from "../../Helper/Storage";
const Assgingrades = () => {
  console.log("Assgingrades function called");
};
const ProfDashboard = () => {
  const [totalProjects, setTotalProjects] = useState(null);
  const [requestedProjects, setRequestedProjects] = useState([]);
  const auth = getAuthUser();
  console.log(auth.professor_id);
  useEffect(() => {
    // Fetch total projects count
    axios
      .get(
        `http://localhost:4000/count/professor-project-count/${auth.professor_id}`
      )
      .then((response) => {
        setTotalProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total projects count:", error);
      });

    // Fetch requested projects
    axios
      .get(
        `http://localhost:4000/professor/${auth.professor_id}/requested-projects`
      )
      .then((response) => {
        setRequestedProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching requested projects:", error);
      });
  }, [auth.professor_id]);

  // Sample data for charts
  const chartData = [
    { title: "Jan", users: 400, projects: 240 },
    { title: "Feb", users: 300, projects: 139 },
    { title: "Mar", users: 200, projects: 980 },
    { title: "Apr", users: 278, projects: 390 },
    { title: "May", users: 189, projects: 480 },
    { title: "Jun", users: 239, projects: 380 },
  ];
  const tableHeaders = [
    "project_id",
    "title",
    "description",
    "supervisor_name",
    "graduation_year",
    "graduation_term",
    "department_name",
    "projects_files_path",
    "github_link",
    "approval_status",
  ];

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
        {/* Charts */}
        <div
          className="chart-section"
          style={{ margin: "10px", position: "absolute", top: "80px" }}
        >
          <h2>Projects</h2>
          <LineChart width={900} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#8884d8" />
            <Line type="monotone" dataKey="projects" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div
          style={{
            width: "200px",
            height: "200px",
            position: "absolute",
            top: "350px",
            right: "270px",
          }}
        >
          <PieChart
            data={[
              {
                title: "pending",
                value: totalProjects && totalProjects.pendingProjects,
                color: "#E38627",
              },
              {
                title: "rejected",
                value: totalProjects && totalProjects.rejectedProjects,
                color: "#C13C37",
              },
              {
                title: "accepted",
                value: totalProjects && totalProjects.acceptedProjects,
                color: "#008767",
              },
            ]}
          />
          <div style={{ position: "absolute", top: "50px", left: "220px" }}>
            <h2 style={{ color: "#008767", fontWeight: "bold" }}>Accepted</h2>
            <h2 style={{ color: "#C13C37", fontWeight: "bold" }}>Rejected</h2>
            <h2 style={{ color: "#E38627", fontWeight: "bold" }}>Pending</h2>
          </div>
        </div>

        <div
          className="totalProjectsContainer"
          style={{
            position: "absolute",
            top: "150px",
            left: "1500px",
            width: "250px",
            height: "150px",
            padding: "20px 20px  20px  20px",
            backgroundColor: "rgba(223, 220, 220, 0.785)",
            borderRadius: "15px",
          }}
        >
          <div className="totalProjectsContainer" style={{ width: "100%" }}>
            <h2>
              {" "}
              Total projects <ImStack color="#979797" />
            </h2>
            <FaArrowTrendUp color="#008767" />{" "}
            <b>{totalProjects && totalProjects.totalProjects}</b>
          </div>
        </div>

        {/* Table */}
        <div
          className="table-section"
          style={{
            margin: "10px",
            position: "absolute",
            top: "500px",
            left: "260px",
          }}
        >
          <h2>All Projects</h2>
          <table>
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requestedProjects.map((project) => (
                <tr key={project.project_id}>
                  {tableHeaders.map((header) => (
                    <td key={header}>{project[header]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="assginbtn"
            style={{
              position: "absolute",
              left: "1350px",
              borderRadius: "10px",
              backgroundColor: "#008767",
            }}
          >
            Assgingrades
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfDashboard;
