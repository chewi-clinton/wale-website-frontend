import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/applyforprescription.css";

const ApplyForPrescription = () => {
  const navigate = useNavigate();
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataWithType = {
      ...formData,
      formType: "prescription",
    };

    axios
      .post("/api/prescription-request/", formDataWithType)
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        navigate("/confirmation");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
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
                disabled={!formData.agreeToTerms}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyForPrescription;
