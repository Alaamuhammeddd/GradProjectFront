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
  const [bookmarkedProjects, setBookmarkedProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/count/most-bookmarked-projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBookmarkedProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching most bookmarked projects:", error);
      });
  }, []);

  return (
    <div>
      <h2>TOP 3 Bookmarked Projects</h2>
      <div className="project-grid">
        {bookmarkedProjects.map((project, index) => (
          <div
            key={index} // Use index as key if title is not unique
            className={`report-project-card report-project-card-${index}`}
          >
            <h3>{project.title}</h3>
            <p>bookmarks: {project.bookmark_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const TopVotedProjects = () => {
  const [votedProjects, setVotedProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/count/most-voted-projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setVotedProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching top voted projects:", error);
      });
  }, []);

  const chartData = {
    labels: votedProjects.map((project) => project.title),
    datasets: [
      {
        label: "Votes",
        data: votedProjects.map((project) => project.total_votes),
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
            key={index}
            className={`report-project-card report-project-card-${index}`}
          >
            <h3>{project.title}</h3>
            <p>Votes: {project.total_votes}</p>
          </div>
        ))}
      </div>
      <ChartComponent
        title="Top Voted Projects"
        data={chartData}
        chartType={Bar}
      />
    </div>
  );
};

const AverageGradesByDepartment = () => {
  const [gradesByDepartment, setGradesByDepartment] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/count/average-grades-by-department")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGradesByDepartment(
          data.filter((dept) => dept.avg_semester_work_grade !== null)
        ); // Filter out departments with null grades
      })
      .catch((error) => {
        console.error("Error fetching average grades by department:", error);
      });
  }, []);
  const data = {
    labels: gradesByDepartment.map((dept) => dept.department_name),
    datasets: [
      {
        label: "Average Grade",
        data: gradesByDepartment.map((dept) => dept.avg_overall_grade), // Use avg_overall_grade for the data
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
  const [gradesByProfessor, setGradesByProfessor] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/count/average-grade-by-professor")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGradesByProfessor(data);
      })
      .catch((error) => {
        console.error("Error fetching average grade by professor:", error);
      });
  }, []);

  const data = {
    datasets: gradesByProfessor.map((prof, index) => ({
      label: `Professor ${prof.professor_name}`,
      data: [
        {
          x: index + 1, // X-axis value
          y: prof.avg_overall_grade, // Y-axis value
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
  const [commentedProjects, setCommentedProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/count/most-commented-projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCommentedProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching most commented projects:", error);
      });
  }, []);

  return (
    <div>
      <h2>Top 3 Commented Projects</h2>
      <div className="project-grid">
        {commentedProjects.map((project, index) => (
          <div
            key={index}
            className={`report-project-card report-project-card-${index}`}
          >
            <h3>{project.title}</h3>
            <p>Comments: {project.comment_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AverageGradeBySemester = () => {
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
  const [gradesByYearAndDepartment, setGradesByYearAndDepartment] = useState(
    []
  );

  useEffect(() => {
    fetch("http://localhost:4000/count/average-grades-by-year")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGradesByYearAndDepartment(data);
      })
      .catch((error) => {
        console.error(
          "Error fetching average grades by year and department:",
          error
        );
      });
  }, []);

  const years = [
    ...new Set(gradesByYearAndDepartment.map((item) => item.year)),
  ];
  const departments = [
    ...new Set(gradesByYearAndDepartment.map((item) => item.department_name)),
  ];

  const datasets = departments.map((department, index) => ({
    label: department,
    data: years.map((year) => {
      const gradeData = gradesByYearAndDepartment.find(
        (item) => item.year === year && item.department_name === department
      );
      return gradeData ? gradeData.avg_overall_grade : 0;
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
  const [gradesByYear, setGradesByYear] = useState([]);

  useEffect(() => {
    fetch("/average-grades-by-graduation-year")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGradesByYear(data);
      })
      .catch((error) => {
        console.error(
          "Error fetching average grades by graduation year:",
          error
        );
      });
  }, []);

  const data = {
    labels: gradesByYear.map((item) => item.year),
    datasets: [
      {
        label: "Average Semester Work Grade",
        data: gradesByYear.map((item) => item.avg_semester_work_grade),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
      {
        label: "Average Final Work Grade",
        data: gradesByYear.map((item) => item.avg_final_work_grade),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        fill: false,
      },
      {
        label: "Average Overall Grade",
        data: gradesByYear.map((item) => item.avg_overall_grade),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
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
  const [successRateData, setSuccessRateData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/count/success-rate-by-department")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSuccessRateData(data);
      })
      .catch((error) => {
        console.error("Error fetching success rate by department:", error);
      });
  }, []);

  const data = {
    labels: successRateData.map((item) => item.department_name),
    datasets: [
      {
        label: "Success Rate",
        data: successRateData.map((item) => item.success_rate),
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
  const [failureRateData, setFailureRateData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/count/failure-rate-by-department")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFailureRateData(data);
      })
      .catch((error) => {
        console.error("Error fetching failure rate by department:", error);
      });
  }, []);

  const data = {
    labels: failureRateData.map((item) => item.department_name),
    datasets: [
      {
        label: "Failure Rate",
        data: failureRateData.map((item) => item.failure_rate),
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
