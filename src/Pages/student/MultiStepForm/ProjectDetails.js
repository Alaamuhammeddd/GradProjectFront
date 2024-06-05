import React, { useEffect, useState } from "react";
import "../../../Styles/AddProject.css";

// import "react-datepicker/dist/react-datepicker.css";
function ProjectDetails({ formData, setFormData }) {
  const [graduationTerms, setGraduationTerms] = useState([]);
  useEffect(() => {
    fetchGraduationTerms();
  }, []);

  const fetchGraduationTerms = () => {
    fetch("http://localhost:4000/admin/show-term") // Assuming this route exists on your backend
      .then((response) => response.json())
      .then((data) => {
        setGraduationTerms(data.graduation_term);
      })
      .catch((error) =>
        console.error("Error fetching graduation terms:", error)
      );
  };
  const generateYearOptions = () => {
    const startYear = 2000;
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 20;
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
  };

  // Generate a list of years from 2000 to current year + 20
  const years = generateYearOptions();
  return (
    <div className="projectdetails-container">
      <input
        className="project-details-control"
        type="text"
        placeholder="Project Title..."
        value={formData.title}
        onChange={(event) =>
          setFormData({ ...formData, title: event.target.value })
        }
      />
      <input
        className="project-details-control"
        type="text"
        placeholder="Description..."
        value={formData.description}
        onChange={(event) =>
          setFormData({ ...formData, description: event.target.value })
        }
      />

      <select
        className="project-details-control"
        value={formData.graduation_term}
        onChange={(event) =>
          setFormData({ ...formData, graduation_term: event.target.value })
        }
      >
        <option disabled value="">
          Graduation Term
        </option>
        {graduationTerms.map((term) => (
          <option key={term} value={term}>
            {term}
          </option>
        ))}
      </select>
      <select
        className="project-details-control"
        value={formData.graduation_year}
        onChange={(event) =>
          setFormData({ ...formData, graduation_year: event.target.value })
        }
      >
        <option disabled value="">
          Select Graduation Year
        </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProjectDetails;
