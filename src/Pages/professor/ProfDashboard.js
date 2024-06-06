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

const ProfDashboard = () => {
  const [totalProjects, setTotalProjects] = useState(null);

  const [requestedProjects, setRequestedProjects] = useState([]);
  const auth = getAuthUser();
  const professor_token = auth.professor_token;

  useEffect(() => {
    // Fetch total projects count

    axios
      .get(
        `http://localhost:4000/count/professor-project-count/${auth.professor_id}`,
        {
          headers: {
            token: professor_token,
          },
        }
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
        `http://localhost:4000/professor/${auth.professor_id}/requested-projects`,
        {
          headers: {
            token: professor_token,
          },
        }
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

  const handleAcceptProject = (projectId) => {
    axios
      .put(
        `http://localhost:4000/professor/accept/project/${projectId}/${auth.professor_id}`,
        null, // No request body, so pass null
        {
          headers: {
            token: professor_token,
          },
        }
      )
      .then((response) => {
        // Update state or UI as needed
        console.log(response.data.message);
        // Refresh the requested projects after accepting
        axios
          .get(
            `http://localhost:4000/professor/${auth.professor_id}/requested-projects`,
            {
              headers: {
                token: professor_token,
              },
            }
          )
          .then((response) => {
            setRequestedProjects(response.data);
          })
          .catch((error) => {
            console.error("Error fetching requested projects:", error);
          });
      })
      .catch((error) => {
        console.error("Error accepting project:", error);
      });
  };
  const handleRejectProject = (projectId) => {
    axios
      .put(
        `http://localhost:4000/professor/reject/project/${projectId}/${auth.professor_id}`,
        null, // No request body, so pass null
        {
          headers: {
            token: professor_token,
          },
        }
      )
      .then((response) => {
        // Update state or UI as needed
        console.log(response.data.message);
        // Refresh the requested projects after accepting
        axios
          .get(
            `http://localhost:4000/professor/${auth.professor_id}/requested-projects`,
            {
              headers: {
                token: professor_token,
              },
            }
          )
          .then((response) => {
            setRequestedProjects(response.data);
          })
          .catch((error) => {
            console.error("Error fetching requested projects:", error);
          });
      })
      .catch((error) => {
        console.error("Error accepting project:", error);
      });
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
          <div
            className="table"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            <table
              className="table"
              style={{
                maxHeight: "100px",
                overflowY: "scroll",
              }}
            >
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
                {requestedProjects.map((project) => (
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
                        <button
                          className="accpt-btn"
                          style={{ margin: "20px" }}
                          onClick={() =>
                            handleAcceptProject(project.project_id)
                          }
                        >
                          Accept
                        </button>
                        <button
                          style={{ margin: "20px" }}
                          className="rjct-btn"
                          onClick={() =>
                            handleRejectProject(project.project_id)
                          }
                        >
                          {" "}
                          Reject
                        </button>
                      </div>
                    </td>
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

export default ProfDashboard;
