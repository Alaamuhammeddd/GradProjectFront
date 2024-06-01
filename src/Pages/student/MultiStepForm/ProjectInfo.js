import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../../Styles/AddProject.css";
function ProjectInfo({ formData, setFormData }) {
  const [departmentOptions, setDepartmentOptions] = useState([]);
  useEffect(() => {
    // Fetch department names when component mounts
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/show-departments"
        );
        const { department_names } = response.data;
        setDepartmentOptions(department_names);
      } catch (error) {
        console.error("Error fetching department names:", error);
      }
    };

    fetchDepartments();
  }, []);
  useEffect(() => {
    // Fetch department names when component mounts
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/show-departments"
        );
        const { department_names } = response.data;
        setDepartmentOptions(department_names);
      } catch (error) {
        console.error("Error fetching department names:", error);
      }
    };

    fetchDepartments();
  }, []);
  const handleDepartmentChange = (event) => {
    setFormData({ ...formData, department_name: event.target.value });
  };

  return (
    <div className="projectInfo-container">
      <select
        value={formData.department_name}
        onChange={(e) => handleDepartmentChange(e)}
      >
        <option disabled value="">
          Select Department
        </option>
        {departmentOptions.map((department, index) => (
          <option key={index} value={department}>
            {department}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="project-info-control"
        placeholder="Supervisor's Name..."
        value={formData.supervisor_name}
        onChange={(e) => {
          setFormData({ ...formData, supervisor_name: e.target.value });
        }}
      />
      <input
        type="text"
        className="project-info-control"
        placeholder="Supervisor's ID..."
        value={formData.professor_id}
        onChange={(e) => {
          setFormData({ ...formData, professor_id: e.target.value });
        }}
      />
    </div>
  );
}

export default ProjectInfo;
