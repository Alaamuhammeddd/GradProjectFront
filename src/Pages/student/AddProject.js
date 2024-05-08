import React, { useState } from "react";
import axios from "axios"; // Import Axios library
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  withStyles,
} from "@material-ui/core";
import ProjectDetails from "./MultiStepForm/ProjectDetails";
import ProjectInfo from "./MultiStepForm/ProjectInfo";
import ProjectMembers from "./MultiStepForm/ProjectMembers";
import ProjectFiles from "./MultiStepForm/ProjectFiles";
import "../../Styles/AddProject.css";

function AddProject() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    supervisor_name: "",
    graduation_term: "",
    graduation_year: null,
    department_name: "",
    projectFile: "",
    github_link: "",
    regestration_date: "",
    professor_id: null,
    teammateData: [{ name: "", studentId: null }], // Array of objects with properties name and id
  });

  const FormComponents = [
    <ProjectDetails formData={formData} setFormData={setFormData} />,
    <ProjectInfo formData={formData} setFormData={setFormData} />,
    <ProjectFiles formData={formData} setFormData={setFormData} />,
    <ProjectMembers formData={formData} setFormData={setFormData} />,
  ];

  const FormTitles = [
    "Project Details",
    "Project Info",
    "Project Files",
    "Project Members",
  ];

  const ColorStepper = withStyles({
    root: {
      backgroundColor: "transparent",
    },
    active: {
      backgroundColor: "#083f77",
      color: "#fff",
    },
    completed: {
      backgroundColor: "#083f77",
      color: "#fff",
    },
  })(Stepper);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = () => {
    // Submit form data to the backend
    axios
      .post("http://localhost:4000/project/create", formData)
      .then((response) => {
        console.log(response.data); // Handle success response from backend
        // Optionally, you can reset the form here
        // setFormData({ ...initialFormData });
      })
      .catch((error) => {
        console.error("Error:", error); // Handle error
      });
  };

  const isLastStep = activeStep === FormTitles.length - 1;

  return (
    <div className="form">
      <div className="form-container">
        <ColorStepper activeStep={activeStep} alternativeLabel>
          {FormTitles.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </ColorStepper>
        <div className="body">{FormComponents[activeStep]}</div>
        <div className="footer">
          <Button
            className="back-btn"
            style={{ marginRight: "250px" }}
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          {isLastStep ? (
            <Button
              className="submit-btn"
              variant="contained"
              color="primary"
              onClick={handleSubmit} // Call handleSubmit on Submit button click
            >
              Submit
            </Button>
          ) : (
            <Button
              className="next-btn"
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProject;
