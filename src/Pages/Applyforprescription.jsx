import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig"; // Import your configured axios instance
import "../style/applyforprescription.css";

const ApplyForPrescription = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "male",
    dateOfBirth: "",
    phone: "",
    address: "",
    state: "",
    zipCode: "",
    pastMedicalProblems: "",
    currentMedications: "",
    knownAllergies: "",
    medicationNeeded: "",
    dosageNeeded: "",
    thyroidCancer: false,
    menSyndrome: false,
    glp1Allergy: false,
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const validateForm = () => {
    const requiredFields = ["email", "dateOfBirth", "phone", "state"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setError(
        `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return false;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions to continue.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    const formDataWithType = {
      ...formData,
      formType: "prescription",
    };

    try {
      console.log("Submitting form data:", formDataWithType);

      const response = await axios.post(
        "/api/prescription-request/",
        formDataWithType
      );

      console.log("Form submitted successfully:", response.data);
      navigate("/confirmation");
    } catch (error) {
      console.error("Error submitting form:", error);

      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const message =
          error.response.data?.message ||
          error.response.data?.detail ||
          "Unknown error";

        switch (status) {
          case 400:
            setError(`Invalid form data: ${message}`);
            break;
          case 404:
            setError(
              "The prescription request endpoint was not found. Please contact support."
            );
            break;
          case 500:
            setError(
              "Server error. Please try again later or contact support."
            );
            break;
          default:
            setError(`Error ${status}: ${message}`);
        }
      } else if (error.request) {
        // Request was made but no response
        setError("Network error. Please check your connection and try again.");
      } else {
        // Something else happened
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <section className="prescription-section">
        <div className="container">
          <div className="prescription-container">
            <div className="prescription-header">
              <h1>Get Your Prescription From TRIMAXA PHARMACY</h1>
              <p>
                Please fill out this form completely to request your
                prescription.
              </p>
            </div>

            {error && (
              <div
                className="error-message"
                style={{
                  backgroundColor: "#fee",
                  color: "#c33",
                  padding: "10px",
                  borderRadius: "4px",
                  marginBottom: "20px",
                  border: "1px solid #fcc",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="prescription-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      Male
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      Female
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth *</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter your zip code"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="pastMedicalProblems">
                  Past Medical Problems
                </label>
                <textarea
                  id="pastMedicalProblems"
                  name="pastMedicalProblems"
                  value={formData.pastMedicalProblems}
                  onChange={handleChange}
                  placeholder="List any past medical problems"
                  rows="3"
                  disabled={loading}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="currentMedications">Current Medications</label>
                <textarea
                  id="currentMedications"
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleChange}
                  placeholder="List any current medications"
                  rows="3"
                  disabled={loading}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="knownAllergies">Known Allergies</label>
                <textarea
                  id="knownAllergies"
                  name="knownAllergies"
                  value={formData.knownAllergies}
                  onChange={handleChange}
                  placeholder="List any known allergies"
                  rows="3"
                  disabled={loading}
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="medicationNeeded">Medication Needed</label>
                  <input
                    type="text"
                    id="medicationNeeded"
                    name="medicationNeeded"
                    value={formData.medicationNeeded}
                    onChange={handleChange}
                    placeholder="Enter medication needed"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dosageNeeded">Dosage Needed</label>
                  <input
                    type="text"
                    id="dosageNeeded"
                    name="dosageNeeded"
                    value={formData.dosageNeeded}
                    onChange={handleChange}
                    placeholder="Enter dosage needed"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="medical-history-section">
                <h2>Medical History</h2>
                <p>Please check all that apply:</p>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="thyroidCancer"
                      checked={formData.thyroidCancer}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">
                      Have you ever been diagnosed with thyroid cancer?
                    </span>
                  </label>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="menSyndrome"
                      checked={formData.menSyndrome}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">
                      Have you ever been diagnosed with multiple endocrine
                      neoplasia (MEN) syndrome?
                    </span>
                  </label>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="glp1Allergy"
                      checked={formData.glp1Allergy}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">
                      Have you ever had an allergic reaction to a GLP-1 receptor
                      agonist?
                    </span>
                  </label>
                </div>
              </div>

              <div className="terms-section">
                <h2>Terms and Conditions</h2>
                <div className="terms-content">
                  <p>
                    By submitting this request, you confirm that all information
                    provided is accurate and complete to the best of your
                    knowledge. You authorize TRIMAXA PHARMACY to review this
                    information and contact your healthcare provider if
                    necessary.
                  </p>
                  <p>
                    You understand that TRIMAXA PHARMACY reserves the right to
                    deny your request if the medication is not appropriate for
                    your condition based on the information provided.
                  </p>
                  <p>
                    All information provided will be kept confidential in
                    accordance with HIPAA regulations.
                  </p>
                </div>

                <div className="checkbox-group terms-checkbox">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">
                      I have read and agree to the terms and conditions
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={!formData.agreeToTerms || loading}
                style={{
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyForPrescription;
