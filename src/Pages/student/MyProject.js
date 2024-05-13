import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectsCard from "../ProjectsCard";
import { getAuthUser } from "../../Helper/Storage";
import "../../Styles/MyProject.css";

const MyProject = () => {
  const auth = getAuthUser();
  const [project, setProject] = useState([]);
  const [showGradesPopup, setShowGradesPopup] = useState(false);
  const [grades, setGrades] = useState([]);
  const student_token = auth.student_token;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/student/${auth.student_id}`)
      .then((response) => {
        setProject(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, [auth.student_id]); // Trigger the effect whenever auth.student_id changes

  const fetchGrades = () => {
    axios
      .get(`http://localhost:4000/student/${auth.student_id}/grades`, {
        headers: {
          token: student_token,
        },
      })
      .then((response) => {
        setGrades(response.data);
        setShowGradesPopup(true);
      })
      .catch((error) => {
        console.error("Error fetching grades:", error);
      });
  };

  const handleCloseGradesPopup = () => {
    setShowGradesPopup(false);
  };

  return (
    <>
      <div
        className="grades-popup-container"
        style={{ display: showGradesPopup ? "flex" : "none" }}
      >
        <div className="grades-popup">
          <button className="close-btn" onClick={handleCloseGradesPopup}>
            X
          </button>
          <h2>Grades</h2>
          <ul>
            {grades.map((grade, index) => (
              <li key={index} style={{ listStyleType: "none" }}>
                <div>
                  Semester Work Grade: {grade.semester_work_grade}/
                  {grade.max_semester_work_grade}
                </div>
                <div>
                  Final Work Grade: {grade.final_work_grade}/
                  {grade.max_final_work_grade}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        {project.length > 0 ? (
          <div>
            <div className="projects-grid">
              {project.map((project) => (
                <ProjectsCard key={project.project_id} project={project} />
              ))}
            </div>
            <div className="grade-container">
              <button onClick={fetchGrades}>View My Grades</button>
            </div>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              fontSize: "40px",
              marginLeft: "auto",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            No projects available
          </div>
        )}
      </div>
    </>
  );
};

export default MyProject;
