import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Insulinform.css";

const Medicalweightloss = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    medicationName: "",
    duration: "Less Than A Year",
    allergies: "",
    hasPrescription: "Yes",
    pharmacyInfo: "",
    noPrescription: false,
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
    // Form submission logic here
    console.log("Form submitted:", formData);
    // Navigate to a confirmation page or show a success message
    navigate("/confirmation");
  };

  return (
    <div className="home-container">
      <section className="form-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h1>Please Provide Us With Some Necessary Information</h1>
              <p>
                After filling out this form, you can go to the store to pick up
                your medicine and place your order.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill step-2"></div>
              </div>
              <p className="progress-text">Step 2 of 3: Fill Form</p>
            </div>

            <form onSubmit={handleSubmit} className="prescription-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
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
                <label htmlFor="age">Age *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="medicationName">Medication Name</label>
                <input
                  type="text"
                  id="medicationName"
                  name="medicationName"
                  value={formData.medicationName}
                  onChange={handleChange}
                  placeholder="Enter medication name"
                />
              </div>

              <div className="form-group">
                <label>Duration *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="duration"
                      value="Less Than A Year"
                      checked={formData.duration === "Less Than A Year"}
                      onChange={handleChange}
                    />
                    Less Than A Year
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="duration"
                      value="More Than A Year"
                      checked={formData.duration === "More Than A Year"}
                      onChange={handleChange}
                    />
                    More Than A Year
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="allergies">Known Allergies</label>
                <textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="Enter any known allergies"
                  rows="3"
                ></textarea>
              </div>

              <div className="form-group">
                <label>Prescription *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="hasPrescription"
                      value="Yes"
                      checked={formData.hasPrescription === "Yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="hasPrescription"
                      value="No"
                      checked={formData.hasPrescription === "No"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="pharmacyInfo">Pharmacy Information</label>
                <input
                  type="text"
                  id="pharmacyInfo"
                  name="pharmacyInfo"
                  value={formData.pharmacyInfo}
                  onChange={handleChange}
                  placeholder="Enter pharmacy information"
                />
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="noPrescription"
                    checked={formData.noPrescription}
                    onChange={handleChange}
                  />
                  I Do Not Have A Prescription
                </label>
              </div>

              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Medicalweightloss;
