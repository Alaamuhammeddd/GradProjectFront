import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header.js";
import "../../Styles/Home.css";
import aboutimg from "../../Assets/Images/about.png";
import studentimg from "../../Assets/Images/student.png";
import graduatesimg from "../../Assets/Images/graduates.png";
import profimg from "../../Assets/Images/prof.png";

const Home = () => {
  const [totalProjects, setTotalProjects] = useState(null);
  const [totalProfessors, setTotalProfessors] = useState(null);
  const [totalDepartments, setTotalDepartments] = useState(null);

  useEffect(() => {
    // Fetch total projects count
    axios
      .get(`http://localhost:4000/count/accepted-project-count`)
      .then((response) => {
        setTotalProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total projects count:", error);
      });

    // Fetch total departments
    axios
      .get("http://localhost:4000/count/department-count")
      .then((response) => {
        setTotalDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching department count:", error);
      });

    // Fetch total professors
    axios
      .get("http://localhost:4000/count/count-professors")
      .then((response) => {
        setTotalProfessors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching professors count:", error);
      });
  }, []); // Empty dependency array ensures this useEffect runs only once

  const addLeadingZero = (number) => {
    return number < 10 ? `0${number}` : number;
  };

  return (
    <Fragment>
      <Header />
      <section className="numbers">
        <div className="container">
          <div className="row">
            <div className="projects" style={{ display: "inline" }}>
              <div className="col-md-4">
                <h2>{addLeadingZero(totalProjects?.acceptedProjectCount)}</h2>
                <h6> Projects</h6>
              </div>
            </div>

            <div className="projects" style={{ display: "inline" }}>
              <div className="col-md-4">
                <h2>{addLeadingZero(totalDepartments?.count)}</h2>
                <h6> Departments</h6>
              </div>
            </div>

            <div className="projects" style={{ display: "inline" }}>
              <div className="col-md-4">
                <h2>{addLeadingZero(totalProfessors?.professorCount)}</h2>
                <h6> Professors</h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="audience">
        <div className="container" style={{ display: "inline" }}>
          <div className="row">
            <div className="col-md-3">
              <img src={studentimg} title="studentimg" />
              <h6> Students</h6>
            </div>

            <div className="col-md-3">
              <img src={graduatesimg} title="graduatesimg" />
              <h6> Graduates</h6>
            </div>

            <div className="col-md-3">
              <img src={profimg} title="profimg" />
              <h6> Professors</h6>
            </div>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={aboutimg} title="aboutimg" />
            </div>
            <div className="col-md-6">
              <h2>About</h2>
              <h4>
                At our college, we foster an environment of academic excellence
                and collaboration, where students' visions come to life through
                their graduation projects.
              </h4>
              <p>
                Our platform serves as a gateway for students to showcase their
                hard work and creativity, while our dedicated professors provide
                invaluable guidance and feedback, ensuring each project reaches
                its fullest potential. Join us as we celebrate the culmination
                of academic journeys, marked by innovation, dedication, and the
                pursuit of knowledge.
              </p>
              <button>
                <a href="/reports" style={{ textDecoration: "none" }}>
                  Learn More
                </a>
              </button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
