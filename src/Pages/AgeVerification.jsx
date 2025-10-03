import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AgeVerification.css";

const AgeVerification = () => {
  const [age, setAge] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (age === "over18") {
      localStorage.setItem("ageVerified", "true");
      navigate("/shop");
    } else if (age === "under18") {
      alert("Sorry, you must be at least 18 to access this site.");
    } else {
      alert("Please select an option.");
    }
  };

  return (
    <div className="age-verification">
      <h2>Age Verification</h2>
      <p>You must be at least 18 years old to continue.</p>

      <div className="checkbox-group">
        <label>
          <input
            type="radio"
            name="age"
            value="over18"
            checked={age === "over18"}
            onChange={(e) => setAge(e.target.value)}
          />
          I am over 18
        </label>
        <label>
          <input
            type="radio"
            name="age"
            value="under18"
            checked={age === "under18"}
            onChange={(e) => setAge(e.target.value)}
          />
          I am under 18
        </label>
      </div>

      <button onClick={handleSubmit}>OK</button>
    </div>
  );
};

export default AgeVerification;
