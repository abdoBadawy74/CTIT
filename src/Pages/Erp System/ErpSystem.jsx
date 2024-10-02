import React, { useState, useEffect, useRef } from "react";
import "./ErpSystem.css";

import VerifyEmailImg from "../../assets/Mail.png";
import QRCode from "../../assets/qr-code-img.png";
import { Link } from "react-router-dom";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";
import axios from "axios";
import SelectPackage from "./SelectPackage";
import Adds from "./Adds";
import CreateAccount from "./CreateAccount";

export default function ErpSystem() {

  // translate
  const { language } = useLanguage();
  // states
  const [activeIndex, setActiveIndex] = useState(0); // Step control
  const [flag, setFlag] = useState(false); // Flag to enable/disable the next button
  const [adds, setAdds] = useState([]); // Adds
  const [countriesNames, setCountriesNames] = useState([]); // Countries

 
  
  //   verify email
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef([]);

  // The steps and their corresponding labels
  const steps = [
    { label: t[language].Package },
    { label: t[language].Adds },
    { label: t[language].CreateAcount },
    { label: t[language].Email },
    { label: t[language].Payment },
  ];

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








  
  
  //   Verify Email
  useEffect(() => {
    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          return 0; // Stop at 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  const handleInputChange = (index, event) => {
    const value = event.target.value;

    // Move focus to the next input field if a character is typed
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
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

        <button
          className={`px-24 py-5 my-10 lg:my-0 text-lg rounded-lg focus:outline-none transition-all ${
            flag
              ? "bg-[#0081FE] text-white"
              : "bg-gray-300 opacity-50"
          }`}
          onClick={goToTheNext}
          disabled={flag === false}
        >
          {t[language].Next}
        </button>
      </div>

      {/* End of Steps  */}

      {/* Step content */}

      <div className="step-content">
        {/* ERP Packages */}
        {activeIndex === 0 && (
          <SelectPackage setFlag={setFlag} setAdds={setAdds} setCountriesNames={setCountriesNames} />
        )}
        {/* End Erp Packages */}

        {/* Start Adds  */}
        {activeIndex === 1 && (
         <Adds adds={adds} setFlag={setFlag} />
        )}
        {/* End Adds */}

        {/* Start Create Account */}
        {activeIndex === 2 && (
          <CreateAccount countriesNames={countriesNames}/>
        )}

        {/* Verify Email */}
        {activeIndex === 3 && (
          <div className="lg:ml-60 sm:mb-4 mx-auto mt-28 flex flex-col lg:flex-row justify-between items-center verify">
            <div>
              <div className="flex flex-col gap-3">
                <h1 className="text-xl">{t[language].VerifyEmail}</h1>
                <p className="text-[#8D8D8D] text-sm">
                  {t[language].check}{" "}
                  <span className="text-[#002B54]">{/* email variable */}</span>
                </p>
              </div>
              <form className="max-w-[426px]">
                <div className="flex space-x-8 items-center my-12">
                  {[...Array(4)].map((_, index) => (
                    <div key={index}>
                      <label htmlFor={`code-${index + 1}`} className="sr-only">
                        {`${index + 1} code`}
                      </label>
                      <input
                        type="text"
                        maxLength="1"
                        id={`code-${index + 1}`}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="block font-semibold w-20 h-20 text-2xl text-center text-gray-900 bg-[#ebf0f3] rounded-lg focus:ring-0 outline-0 border-0"
                        required
                        onChange={(e) => handleInputChange(index, e)}
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-4 rounded-lg text-white bg-[#002B54]"
                  disabled={countdown > 0} // Disable button while countdown is active
                >
                  {t[language].Verify}
                </button>

                <p
                  id="helper-text-explanation"
                  className="text-center mt-8 text-gray-500 text-sm"
                >
                  {t[language].DontRecieve}{" "}
                  <span className="text-[#0081FE]">
                    {t[language].SendAgain}
                    {countdown > 0 ? `${countdown} seconds` : ""}
                  </span>
                </p>
              </form>
            </div>
            <div className="mr-56 hidden lg:block">
              <img
                src={VerifyEmailImg}
                alt="Verify email"
                className="w-[350px]"
              />
            </div>
          </div>
        )}

        {/* Payment */}
        {activeIndex === 4 && (
          <div className="bg-[#F8F9F9] pt-15 pb-15 payment">
            <div className="flex items-center justify-center lg:justify-between mb-8 px-20 pt-5  gap-5 flex-wrap-reverse">
              <form className="flex self-start gap-5 flex-col">
                <div className="flex items-center gap-1 md:gap-3 justify-center sm:justify-start ">
                  {/* Radio Buttons for Category Selection */}
                  <div className="flex items-center ">
                    <input type="radio" id="upload" value="upload" />
                    <label htmlFor="upload" className="ml-2">
                      {t[language].Uplaod}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="online" value="online" />
                    <label htmlFor="online" className="ml-2">
                      {t[language].Online}
                    </label>
                  </div>
                  <Link
                    to="/login"
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base"
                  >
                    {t[language].Back}
                  </Link>
                </div>

                {/* Upload Receipt Section */}
                <label
                  htmlFor="dropzone-file"
                  className="relative flex flex-col items-center justify-center w-[350px] md:w-[450px] h-[300px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">{t[language].Click}</span>{" "}
                      {t[language].Or}
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>

                {/* Confirm Button */}
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 w-full text-white py-2 px-4 rounded self-center"
                >
                  {t[language].Confirm}
                </button>

                {/* Bank Details Section */}
                <div className="flex items-center space-x-4 pt-4">
                  <img src={QRCode} alt="QR Code" className="w-20 h-20" />
                  <div className="flex items-center space-x-4">
                    <span
                      className="text-lg font-semibold text-gray-800"
                      style={{ fontSize: "1.5rem", color: "#002b54" }}
                    >
                      {t[language].BankDetails}
                    </span>
                    <a
                      href="#"
                      className="text-blue-500 underline px-4"
                      style={{ fontSize: "1.5rem" }}
                    >
                      {t[language].View}
                    </a>
                  </div>
                </div>
              </form>

              {/* Promo Code Section */}
              <div className="w-[300px] flex flex-col gap-5 mx-auto">
                <div className="w-full max-w-md">
                  <div className="mb-4">
                    <p className="text-gray-500">
                      {t[language].Promo}{" "}
                      <span className="text-gray-400">
                        {t[language].NoDiscount}
                      </span>
                    </p>
                  </div>
                  <div className="flex border border-gray-300 rounded-md w-full p-2">
                    <input
                      placeholder={
                        language === "en"
                          ? "Enter Promo Code"
                          : "أدخل كود الخصم"
                      }
                      className="p-2 outline-none "
                    />
                    <button
                      type="button"
                      className="mt-2 bg-gray-800 w-full text-white py-2 px-4 rounded"
                    >
                      {t[language].Apply}
                    </button>
                  </div>
                </div>
                <h2 className="font-semibold">{t[language].Summary}</h2>
                <div className="text-[#8D8D8D] border-b-2 border border-[#DCDCDC] border-t-0 border-e-0 border-s-0 pb-5">
                  <p className="flex justify-between">
                    <span>{t[language].Subtotal}</span>
                    <span>500 $</span>
                  </p>
                  <p className="flex justify-between">
                    <span>{t[language].Subtotal}</span>
                    <span>500 $</span>
                  </p>
                  <p className="flex justify-between">
                    <span>{t[language].Subtotal}</span>
                    <span>500 $</span>
                  </p>
                </div>
                <div className="font-semibold">
                  <p className="flex justify-between">
                    <span>{t[language].Total}</span>
                    <span>500 $</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex justify-between text-gray-500 px-20">
              <span>Countdown: 30 seconds</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
