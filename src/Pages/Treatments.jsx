import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/Treatments.css";
import WeightManagement from "../assets/weightmanagement.jpg";
import DiabetesCare from "../assets/Diabetescare.jpg";

const Treatments = () => {
  const navigate = useNavigate();

  const handleWeightLossClick = () => {
    navigate("/weight-loss-form");
  };

  const handleDiabetesClick = () => {
    navigate("/insulin-form");
  };

  return (
    <div className="home-container">
      <section className="treatments-section">
        <div className="container">
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <p className="progress-text">Step 1 of 3: Select Treatment</p>
          </div>

          <h1 className="treatments-title">TREATMENTS</h1>

          <div className="treatments-grid">
            <div className="treatment-card">
              <div className="treatment-image">
                <img src={WeightManagement} alt="Medical Weight Loss" />
              </div>
              <h2 className="treatment-title">Medical Weight Loss</h2>
              <button className="treatment-btn" onClick={handleWeightLossClick}>
                Medical Weight Loss Medication
              </button>
            </div>

            <div className="treatment-card">
              <div className="treatment-image">
                <img src={DiabetesCare} alt="Insulin and Diabetes Supplies" />
              </div>
              <h2 className="treatment-title">Insulin (Diabetes Supplies)</h2>
              <button className="treatment-btn" onClick={handleDiabetesClick}>
                Buy Diabetic Supplies & Insulin
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Treatments;
