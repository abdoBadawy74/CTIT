import React, { useState } from "react";
import "./ErpSystem.css";

export default function ErpSystem() {
  const [activeIndex, setActiveIndex] = useState(0); // Step control

  // The steps and their corresponding labels
  const steps = [
    { label: "Package" },
    { label: "Adds" },
    { label: "Create Account" },
    { label: "Email" },
    { label: "Payment" },
  ];

  const goToTheNext = () => {
    if (activeIndex < steps.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const goToThePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <>
      {/* Step indicator */}
      <div className="card py-8 bg-[#f2f9ff] mb-8 transition service-card">
        <div className="steps-container">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-item ${activeIndex === index ? "active" : ""} ${
                activeIndex > index ? "completed" : ""
              }`}
            >
              <span className="step-label">{step.label}</span>
              <span className="step-icon">
                {activeIndex > index ? (
                  <i className="pi pi-check"></i>
                ) : (
                  index + 1
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div
        className="flex px-20 flex-wrap"
        style={{
          justifyContent: activeIndex > 0 ? "space-between" : "flex-end",
        }}
      >
        {activeIndex !== 0 && (
          <button
            className="px-20 py-4 my-10 lg:my-0 bg-white text-[#0081FE] border border-[#0081FE] text-lg rounded-lg focus:outline-none"
            onClick={goToThePrevious}
          >
            Previous
          </button>
        )}

        <button
          className={`px-24 py-5 my-10 lg:my-0 text-lg rounded-lg focus:outline-none transition-all ${
            activeIndex < steps.length - 1
              ? "bg-[#0081FE] text-white"
              : "bg-gray-300 opacity-50"
          }`}
          onClick={goToTheNext}
          disabled={activeIndex >= steps.length - 1}
        >
          Next
        </button>
      </div>

      {/* End of Steps  */}

      {/* Step content */}
      <div className="step-content">
        {activeIndex === 0 && (
          <div>
            <h2>Step 1: Package Selection</h2>
          </div>
        )}
        {activeIndex === 1 && (
          <div>
            <h2>Step 2: Adds</h2>
          </div>
        )}
        {activeIndex === 2 && (
          <div>
            <h2>Step 3: Create Account</h2>
          </div>
        )}
        {activeIndex === 3 && (
          <div>
            <h2>Step 4: Email</h2>
          </div>
        )}
        {activeIndex === 4 && (
          <div>
            <h2>Step 5: Payment</h2>
          </div>
        )}
      </div>
    </>
  );
}
