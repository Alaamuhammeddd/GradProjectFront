import React, { useState, useEffect } from "react";
import { Bubble, Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto"; // Ensure you have this import to avoid potential issues with chart.js
import "./styles/Reports.css";

const ChartComponent = ({ title, data, chartType: ChartType }) => (
  <div style={{ maxWidth: "500px", margin: "20px auto" }}>
    <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{title}</h2>
    <ChartType data={data} options={{ scales: { y: { beginAtZero: true } } }} />
  </div>
);

const AverageStudentGradesByProject = () => {
  // Sample data for demonstration
  const studentGrades = [
    { name: "Project A", averageGrade: 65 },
    { name: "Project B", averageGrade: 90 },
    { name: "Project C", averageGrade: 48 },
  ];

  const data = {
    labels: studentGrades.map((project) => project.name),
    datasets: [
      {
        label: "Average Grade",
        data: studentGrades.map((project) => project.averageGrade),
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  return (
    <ChartComponent
      title="Average Student Grades by Project"
      data={data}
      chartType={Bar}
    />
  );
};

const MostBookmarkedProjects = () => {
  // Sample data for demonstration
  const bookmarkedProjects = [
    { name: "Title A", bookmarks: 25 },
    { name: "Title B", bookmarks: 30 },
    { name: "Title C", bookmarks: 15 },
  ];

  return (
    <div>
      <h2>TOP 3 Bookmarked Projects</h2>
      <div className="project-grid">
        {bookmarkedProjects.map((project, index) => (
          <div
            key={project.name}
            className={`project-card project-card-${index}`}
          >
            <h3>{project.name}</h3>
            <p>bookmarks: {project.bookmarks}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
const TopVotedProjects = () => {
  // Sample data for demonstration
  const votedProjects = [
    { name: "Project A", votes: 150 },
    { name: "Project B", votes: 120 },
    { name: "Project C", votes: 100 },
  ];

  // Data for the bar chart
  const data = {
    labels: votedProjects.map((project) => project.name),
    datasets: [
      {
        label: "Votes",
        data: votedProjects.map((project) => project.votes),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  return (
    <div>
      <h2>TOP 3 Voted Projects</h2>
      <div className="project-grid">
        {votedProjects.map((project, index) => (
          <div
            key={project.name}
            className={`project-card project-card-${index}`}
          >
            <h3>{project.name}</h3>
            <p>Votes: {project.votes}</p>
          </div>
        ))}
      </div>
      <ChartComponent title="Top Voted Projects" data={data} chartType={Bar} />
    </div>
  );
};

const AverageGradesByDepartment = () => {
  // Sample data for demonstration
  const gradesByDepartment = [
    { name: "ComputerScience", averageGrade: 60 },
    { name: "InformationSystem", averageGrade: 92 },
    { name: "InternetTecnology", averageGrade: 50 },
    { name: "ArtificialIntelligence", averageGrade: 75 },
  ];

  const data = {
    labels: gradesByDepartment.map((dept) => dept.name),
    datasets: [
      {
        label: "Average Grade",
        data: gradesByDepartment.map((dept) => dept.averageGrade),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  return (
    <ChartComponent
      title="Average Grades by Department"
      data={data}
      chartType={Doughnut}
    />
  );
};
const AverageGradeGivenByProfessor = () => {
  // Sample data for demonstration
  const gradesByProfessor = [
    { name: "Professor A", averageGrade: 68 },
    { name: "Professor B", averageGrade: 92 },
    { name: "Professor C", averageGrade: 55 },
    { name: "Professor D", averageGrade: 99 },
    { name: "Professor E", averageGrade: 77 },
  ];

  // Create a dataset for the Bubble chart
  const data = {
    datasets: gradesByProfessor.map((prof, index) => ({
      label: prof.name,
      data: [
        {
          x: index + 1, // X-axis value
          y: prof.averageGrade, // Y-axis value
          r: 10, // Radius of the bubble
        },
      ],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
      ][index % 5], // Cycle through 5 colors
    })),
  };

  return (
    <ChartComponent
      title="Average Grade Given by Professor"
      data={data}
      chartType={Bubble}
    />
  );
};
const MostCommentedProjects = () => {
  // Sample data for demonstration
  const commentedProjects = [
    { name: "Project A", comments: 25 },
    { name: "Project B", comments: 30 },
    { name: "Project C", comments: 15 },
  ];

  return (
    <div>
      <h2>Top 3 Commented Projects</h2>
      <div className="project-grid">
        {commentedProjects.slice(0, 3).map((project, index) => (
          <div
            key={project.name}
            className={`project-card project-card-${index}`}
          >
            <h3>{project.name}</h3>
            <p>Comments: {project.comments}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AverageGradeBySemester = () => {
  // Sample data for demonstration
  const gradesBySemester = [
    { name: "Semester 1", averageGrade: 75 },
    { name: "Semester 2", averageGrade: 60 },
    { name: "Semester 3", averageGrade: 80 },
    { name: "Semester 4", averageGrade: 92 },
  ];

  const data = {
    labels: gradesBySemester.map((semester) => semester.name),
    datasets: [
      {
        label: "Average Grade",
        data: gradesBySemester.map((semester) => semester.averageGrade),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  return (
    <ChartComponent
      title="Average Grade by Semester"
      data={data}
      chartType={Line}
    />
  );
};
const AverageGradesByYearAndDepartment = () => {
  // Sample data for demonstration
  const gradesByYearAndDepartment = [
    { year: 2020, department: "Computer Science", averageGrade: 85 },
    { year: 2020, department: "Information Systems", averageGrade: 78 },
    { year: 2020, department: "Artificial Intelligence", averageGrade: 92 },
    { year: 2021, department: "Computer Science", averageGrade: 88 },
    { year: 2021, department: "Information Systems", averageGrade: 81 },
    { year: 2021, department: "Artificial Intelligence", averageGrade: 94 },
    { year: 2022, department: "Computer Science", averageGrade: 90 },
    { year: 2022, department: "Information Systems", averageGrade: 85 },
    { year: 2022, department: "Artificial Intelligence", averageGrade: 96 },
  ];

  // Prepare data for the stacked bar chart
  const years = [
    ...new Set(gradesByYearAndDepartment.map((item) => item.year)),
  ];
  const departments = [
    ...new Set(gradesByYearAndDepartment.map((item) => item.department)),
  ];

  const datasets = departments.map((department, index) => ({
    label: department,
    data: years.map((year) => {
      const gradeData = gradesByYearAndDepartment.find(
        (item) => item.year === year && item.department === department
      );
      return gradeData ? gradeData.averageGrade : 0;
    }),
    backgroundColor: [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
    ][index % 3], // Cycle through colors
  }));

  const data = {
    labels: years,
    datasets: datasets,
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-card">
      <h2>Average Grades by Year and Department</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

const AverageGradeByGraduationYear = () => {
  // Sample data for demonstration
  const gradesByGraduationYear = [
    { year: "2019", averageGrade: 75 },
    { year: "2020", averageGrade: 60 },
    { year: "2021", averageGrade: 80 },
    { year: "2022", averageGrade: 92 },
  ];

  const data = {
    labels: gradesByGraduationYear.map((item) => item.year),
    datasets: [
      {
        label: "Average Grade",
        data: gradesByGraduationYear.map((item) => item.averageGrade),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "rgba(75, 192, 192, 1)",
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
      },
    ],
  };

  return (
    <ChartComponent
      title="Average Grade by Graduation Year"
      data={data}
      chartType={Line}
    />
  );
};
const SuccessRateByDepartment = () => {
  // Sample data for demonstration
  const successRateData = [
    { department: "Computer Science", successRate: 80 },
    { department: "Information Systems", successRate: 70 },
    { department: "Artificial Intelligence", successRate: 92 },
    { department: "Cyber Security", successRate: 68 },
    { department: "Software Engineering", successRate: 50 },
  ];

  const data = {
    labels: successRateData.map((item) => item.department),
    datasets: [
      {
        label: "Success Rate",
        data: successRateData.map((item) => item.successRate),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ChartComponent
      title="Success Rate by Department"
      data={data}
      chartType={Pie}
    />
  );
};
const FailureRateByDepartment = () => {
  // Sample data for demonstration
  const failureRateData = [
    { department: "Computer Science", failureRate: 15 },
    { department: "Information Systems", failureRate: 22 },
    { department: "Artificial Intelligence", failureRate: 8 },
    { department: "Cyber Security", failureRate: 12 },
    { department: "Software Engineering", failureRate: 20 },
  ];

  const data = {
    labels: failureRateData.map((item) => item.department),
    datasets: [
      {
        label: "Failure Rate",
        data: failureRateData.map((item) => item.failureRate),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <ChartComponent
      title="Failure Rate by Department"
      data={data}
      chartType={Pie}
    />
  );
};

const Reports = () => (
  <div className="reports-container">
    <div className="charts">
      <div className="chart-card">
        <h2>Average Student Grades by Project</h2>
        <AverageStudentGradesByProject />
      </div>

      <div className="chart-card">
        <MostBookmarkedProjects />
      </div>
      <div className="chart-card">
        <h2>Average Grade by Graduation Year</h2>
        <AverageGradeByGraduationYear />
      </div>
      <div className="chart-card">
        <h2>Average Grades by Department</h2>
        <AverageGradesByDepartment />
      </div>
      <div className="chart-card">
        <TopVotedProjects />
      </div>
      <div className="chart-card">
        <h2>Failure Rate by Department</h2>
        <FailureRateByDepartment />
      </div>
      <div className="chart-row">
        <AverageGradesByYearAndDepartment />
        {/* Add other chart components here */}
      </div>
      <div className="chart-card">
        <h2>Average Grade Given by Professor</h2>
        <AverageGradeGivenByProfessor />
      </div>
      <div className="chart-card">
        <h2>Average Grade by Semester</h2>
        <AverageGradeBySemester />
      </div>

      <div className="chart-card">
        <MostCommentedProjects />
      </div>
      <div className="chart-card">
        <h2>Success Rate by Department</h2>
        <SuccessRateByDepartment />
      </div>
    </div>
  </div>
);

export default Reports;
