import React, { useState } from "react";
import { motion } from "framer-motion";
import "./JobApplicationForm.css";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    applyingForPosition: "",
    relevantExperience: "",
    portfolioURL: "",
    managementExperience: "",
    additionalSkills: [],
    preferredInterviewTime: "",
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          additionalSkills: [...prevData.additionalSkills, name],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          additionalSkills: prevData.additionalSkills.filter(
            (skill) => skill !== name
          ),
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setFormSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    } else if (isNaN(data.phoneNumber)) {
      errors.phoneNumber = "Phone Number must be a valid number";
    }

    if (!data.applyingForPosition.trim()) {
      errors.applyingForPosition = "Applying for Position is required";
    }

    if (
      data.applyingForPosition === "Developer" ||
      data.applyingForPosition === "Designer"
    ) {
      if (!data.relevantExperience.trim()) {
        errors.relevantExperience = "Relevant Experience is required";
      } else if (
        isNaN(data.relevantExperience) ||
        +data.relevantExperience <= 0
      ) {
        errors.relevantExperience =
          "Relevant Experience must be a number greater than 0";
      }
    }

    if (data.applyingForPosition === "Designer") {
      if (!data.portfolioURL.trim()) {
        errors.portfolioURL = "Portfolio URL is required";
      } else if (!isValidURL(data.portfolioURL)) {
        errors.portfolioURL = "Portfolio URL is not valid";
      }
    }

    if (data.applyingForPosition === "Manager") {
      if (!data.managementExperience.trim()) {
        errors.managementExperience = "Management Experience is required";
      }
    }

    if (data.additionalSkills.length === 0) {
      errors.additionalSkills = "At least one skill must be selected";
    }

    if (!data.preferredInterviewTime.trim()) {
      errors.preferredInterviewTime = "Preferred Interview Time is required";
    } else if (isNaN(Date.parse(data.preferredInterviewTime))) {
      errors.preferredInterviewTime =
        "Preferred Interview Time must be a valid date and time";
    }

    return errors;
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="form-title">Job Application Form</h1>
      {!formSubmitted ? (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? "error-input" : ""}
            />
            {errors.fullName && <div className="error">{errors.fullName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error-input" : ""}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? "error-input" : ""}
            />
            {errors.phoneNumber && (
              <div className="error">{errors.phoneNumber}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="applyingForPosition">Applying for Position</label>
            <select
              id="applyingForPosition"
              name="applyingForPosition"
              value={formData.applyingForPosition}
              onChange={handleChange}
              className={errors.applyingForPosition ? "error-input" : ""}
            >
              <option value="">Select Position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            {errors.applyingForPosition && (
              <div className="error">{errors.applyingForPosition}</div>
            )}
          </div>

          {formData.applyingForPosition === "Developer" ||
          formData.applyingForPosition === "Designer" ? (
            <div className="form-group">
              <label htmlFor="relevantExperience">
                Relevant Experience (years)
              </label>
              <input
                type="number"
                id="relevantExperience"
                name="relevantExperience"
                value={formData.relevantExperience}
                onChange={handleChange}
                className={errors.relevantExperience ? "error-input" : ""}
              />
              {errors.relevantExperience && (
                <div className="error">{errors.relevantExperience}</div>
              )}
            </div>
          ) : null}

          {formData.applyingForPosition === "Designer" ? (
            <div className="form-group">
              <label htmlFor="portfolioURL">Portfolio URL</label>
              <input
                type="text"
                id="portfolioURL"
                name="portfolioURL"
                value={formData.portfolioURL}
                onChange={handleChange}
                className={errors.portfolioURL ? "error-input" : ""}
              />
              {errors.portfolioURL && (
                <div className="error">{errors.portfolioURL}</div>
              )}
            </div>
          ) : null}

          {formData.applyingForPosition === "Manager" ? (
            <div className="form-group">
              <label htmlFor="managementExperience">
                Management Experience
              </label>
              <textarea
                id="managementExperience"
                name="managementExperience"
                value={formData.managementExperience}
                onChange={handleChange}
                className={errors.managementExperience ? "error-input" : ""}
              />
              {errors.managementExperience && (
                <div className="error">{errors.managementExperience}</div>
              )}
            </div>
          ) : null}

          <div className="form-group">
            <label>Additional Skills</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="JavaScript"
                  checked={formData.additionalSkills.includes("JavaScript")}
                  onChange={handleChange}
                />
                JavaScript
              </label>
              <label>
                <input
                  type="checkbox"
                  name="CSS"
                  checked={formData.additionalSkills.includes("CSS")}
                  onChange={handleChange}
                />
                CSS
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Python"
                  checked={formData.additionalSkills.includes("Python")}
                  onChange={handleChange}
                />
                Python
              </label>
            </div>
            {errors.additionalSkills && (
              <div className="error">{errors.additionalSkills}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="preferredInterviewTime">
              Preferred Interview Time
            </label>
            <input
              type="datetime-local"
              id="preferredInterviewTime"
              name="preferredInterviewTime"
              value={formData.preferredInterviewTime}
              onChange={handleChange}
              className={errors.preferredInterviewTime ? "error-input" : ""}
            />
            {errors.preferredInterviewTime && (
              <div className="error">{errors.preferredInterviewTime}</div>
            )}
          </div>

          <button type="submit">Submit</button>
        </motion.form>
      ) : (
        <motion.div
          className="form-summary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Thank you for your submission!</h2>
          <p>Here is a summary of your application:</p>
          <ul>
            <li>
              <strong>Full Name:</strong> {formData.fullName}
            </li>
            <li>
              <strong>Email:</strong> {formData.email}
            </li>
            <li>
              <strong>Phone Number:</strong> {formData.phoneNumber}
            </li>
            <li>
              <strong>Applying for Position:</strong>{" "}
              {formData.applyingForPosition}
            </li>
            {formData.applyingForPosition === "Developer" ? (
              <li>
                <strong>Relevant Experience:</strong>{" "}
                {formData.relevantExperience} years
              </li>
            ) : null}
            {formData.applyingForPosition === "Designer" ? (
              <li>
                <strong>Portfolio URL:</strong>{" "}
                <a
                  href={formData.portfolioURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {formData.portfolioURL}
                </a>
              </li>
            ) : null}
            {formData.applyingForPosition === "Manager" ? (
              <li>
                <strong>Management Experience:</strong>{" "}
                {formData.managementExperience}
              </li>
            ) : null}
            <li>
              <strong>Additional Skills:</strong>{" "}
              {formData.additionalSkills.join(", ")}
            </li>
            <li>
              <strong>Preferred Interview Time:</strong>{" "}
              {new Date(formData.preferredInterviewTime).toLocaleString()}
            </li>
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default JobApplicationForm;
