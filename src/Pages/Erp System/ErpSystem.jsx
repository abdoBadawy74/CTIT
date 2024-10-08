import { useState, useEffect } from "react";
import "./ErpSystem.css";

// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";

import SelectPackage from "./SelectPackage";
import Adds from "./Adds";
import CreateAccount from "./CreateAccount";
import VerifyEmail from "./VerifyEmail";
import Payment from "./Payment";

export default function ErpSystem() {
  // translate
  const { language } = useLanguage();

  // states
  const [activeIndex, setActiveIndex] = useState(0); // Step control
  const [flag, setFlag] = useState(false); // Flag to enable/disable the next button
  const [adds, setAdds] = useState([]); // Adds
  const [countriesNames, setCountriesNames] = useState([]); // Countries
  const [SelectedPackageId, setSelectedPackageId] = useState(null); // Selected Package
  const [steps, setSteps] = useState([]); // Dynamic steps

  // Check if LoginEmail exists in local storage
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("LoginEmail");

    if (isLoggedIn) {
      // If user is logged in, only show Package, Adds, and Payment
      setSteps([
        { label: t[language].Package },
        { label: t[language].Adds },
        { label: t[language].Payment },
      ]);
    } else {
      // If user is not logged in, show all steps
      setSteps([
        { label: t[language].Package },
        { label: t[language].Adds },
        { label: t[language].CreateAcount },
        { label: t[language].Confirm_Email },
      ]);
    }
  }, [language]);

  //   move to the next step
  const goToTheNext = () => {
    if (activeIndex < steps.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
    setFlag(false);
  };

  //  move to the previous step
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
            {t[language].Previous}
          </button>
        )}

        {activeIndex < steps.length - 1 && (
          <button
            className={`px-24 py-5 my-10 lg:my-0 text-lg rounded-lg focus:outline-none transition-all ${
              flag ? "bg-[#0081FE] text-white" : "bg-gray-300 opacity-50"
            }`}
            onClick={goToTheNext}
            disabled={flag === false}
          >
            {t[language].Next}
          </button>
        )}
      </div>

      {/* End of Steps  */}

      {/* Step content */}
      <div className="step-content">
        {/* ERP Packages */}
        {activeIndex === 0 && (
          <SelectPackage
            setFlag={setFlag}
            setAdds={setAdds}
            setCountriesNames={setCountriesNames}
            setSelectedPackageId={setSelectedPackageId}
          />
        )}
        {/* End Erp Packages */}

        {/* Start Adds  */}
        {activeIndex === 1 && <Adds adds={adds} setFlag={setFlag} />}
        {/* End Adds */}

        {/* Conditional rendering for Create Account and Verify Email */}
        {!localStorage.getItem("LoginEmail") && activeIndex === 2 && (
          <CreateAccount
            countriesNames={countriesNames}
            setFlag={setFlag}
            SelectedPackageId={SelectedPackageId}
          />
        )}

        {!localStorage.getItem("LoginEmail") && activeIndex === 3 && (
          <VerifyEmail setFlag={setFlag} />
        )}

        {/* Payment */}
        {activeIndex === steps.length - 1 && <Payment SelectedPackageId={SelectedPackageId} />}
      </div>
    </>
  );
}
