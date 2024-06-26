import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  withStyles,
} from "@material-ui/core";
import { Alert } from "react-bootstrap"; // Import Alert from React Bootstrap
import ProjectDetails from "./MultiStepForm/ProjectDetails";
import ProjectInfo from "./MultiStepForm/ProjectInfo";
import ProjectMembers from "./MultiStepForm/ProjectMembers";
import ProjectFiles from "./MultiStepForm/ProjectFiles";
import "../../Styles/AddProject.css";
import { useNavigate } from "react-router-dom";
function AddProject() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    supervisor_name: "",
    graduation_term: "",
    graduation_year: null,
    department_name: "",
    github_link: "",
    regestration_date: "",
    professor_id: null,
    teammateData: [{ name: "", studentId: null }],
  });
  const handleFileChange = (selectedFile) => {
    setFormData({ ...formData, projectFile: selectedFile });
  };

  const projectFile = useRef(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // State to manage error message
  const FormComponents = [
    <ProjectDetails formData={formData} setFormData={setFormData} />,
    <ProjectInfo formData={formData} setFormData={setFormData} />,
    <ProjectMembers formData={formData} setFormData={setFormData} />,
    <ProjectFiles
      formData={formData}
      setFormData={setFormData}
      projectFile={projectFile}
      onFileChange={handleFileChange}
    />,
  ];

  const FormTitles = [
    "Project Details",
    "Project Info",
    "Project Members",
    "Project Files",
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
    setFormData({
      title: "",
      description: "",
      supervisor_name: "",
      graduation_term: "",
      graduation_year: null,
      department_name: "",
      github_link: "",
      regestration_date: "",
      professor_id: null,
      teammateData: [{ name: "", studentId: null }],
    });
    // Go back to the first ste
    setActiveStep(0);
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      if (projectFile.current && projectFile.current.files.length > 0) {
        const formDataToSend = new FormData();
        // Append other form fields
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }

        const projectFileRef = projectFile.current.files[0];
        console.log(projectFileRef);

        // Append the selected file to formDataToSend with the key "projectFile"
        formDataToSend.append("projectFile", projectFileRef);
        console.log(formData);

        // Send the request
        const response = await axios.post(
          "http://localhost:4000/project/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data);
        setSuccess("Project Added");
        handleReset();
        navigate("/my-project");
      } else {
        setError("No file selected");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error occurred while submitting project");
    }
  };

  const isLastStep = activeStep === FormTitles.length - 1;

  return (
    <div className="form">
      <div className="form-container">
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}{" "}
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
              onClick={handleSubmit}
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
