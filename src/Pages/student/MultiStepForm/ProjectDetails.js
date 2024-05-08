import React from "react";
import "../../../Styles/AddProject.css";

// import "react-datepicker/dist/react-datepicker.css";
function ProjectDetails({ formData, setFormData }) {
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
        value={formData.graduation_term} // Set value directly from formData
        onChange={(event) =>
          setFormData({ ...formData, graduation_term: event.target.value })
        }
      >
        <option disabled value="">
          Graduation Term
        </option>
        <option value="June">June</option>
        <option value="Summer">Summer</option>
        <option value="January">January</option>
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
