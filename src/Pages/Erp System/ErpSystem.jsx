import React, { useState, useEffect, useRef } from "react";
import "./ErpSystem.css";
import { useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import accountImg from "../../assets/account-image.svg";
import VerifyEmailImg from "../../assets/Mail.png";
import QRCode from "../../assets/qr-code-img.png";
import { Link } from "react-router-dom";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";
import axios from "axios";
import SelectPackage from "./SelectPackage";

export default function ErpSystem() {
  // translate
  const { language, setLanguage } = useLanguage();
  // states
  const [activeIndex, setActiveIndex] = useState(0); // Step control
  const [flag, setFlag] = useState(false);

  //   Adds
  const [selectedAddId, setSelectedAddId] = useState(null);
  //   create account
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      companyName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      taxId: "",
      subdomain: "",
      country: null,
      acceptPolicy: false,
      image: null,
    },
  });
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
  };

  //  move to the previous step
  const goToThePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };








  //   Adds
  const cards = [
    {
      id: 1,
      name: "ADD 1",
      price: 29.99,
      currency: "USD",
      description: "This is the description for ADD 1",
      selected: false,
    },
    {
      id: 2,
      name: "ADD 2",
      price: 49.99,
      currency: "USD",
      description: "This is the description for Card 2",
      selected: false,
    },
    {
      id: 3,
      name: "ADD 3",
      price: 79.99,
      currency: "USD",
      description: "This is the description for Card 3",
      selected: false,
    },
  ];

  const toggleSelectionAdd = (cardId) => {
    setSelectedAddId(cardId === selectedAddId ? null : cardId);
  };

  //   Create Account
  const onFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImageSrc(reader.result);
      reader.readAsDataURL(file);
      setValue("image", file);
    }
  };

  const resetImage = () => {
    setUploadedImageSrc(null);
    setValue("image", null);
  };

  const onSelectCountry = (country) => {
    setValue("country", country);
  };

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
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
          <SelectPackage setFlag={setFlag} />
        )}
        {/* End Erp Packages */}

        {/* Start Adds  */}
        {activeIndex === 1 && (
          <div>
            <div className="flex items-center flex-col mb-8 text-center">
              <h1 className="text-2xl mb-5 font-medium">
                {t[language].Add_head}{" "}
                <span className="text-[#0081FE]">
                  {t[language].Not_required}
                </span>
              </h1>
              <p className="text-[#8D8D8D] text-base">{t[language].Add_desc}</p>
            </div>

            <div className="pb-10 px-5 gap-10 flex justify-center flex-wrap mx-auto">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`card-add bg-white flex flex-col gap-5 border border-[#DCDCDC] rounded-lg py-5 px-7 w-[350px] ${
                    selectedAddId === card.id ? "selected-card" : ""
                  }`}
                >
                  <div className="title flex flex-col justify-center items-center">
                    <h2 className="py-2">{card.name}</h2>
                    <p className="text-[#0081FE] font-medium">
                      {card.price} {card.currency}
                      <span className="text-xs text-[#8D8D8D]"> / monthly</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <i
                      className="pi pi-check-circle"
                      style={{ color: "#0081fe" }}
                    ></i>
                    <p className="text-[#002B54] font-semibold text-sm">
                      {card.description}
                    </p>
                  </div>
                  <button
                    className={`rounded-xl mt-7 py-3 px-2 min-w-36 text-white ${
                      selectedAddId === card.id ? "bg-[#002b54]" : "bg-blue-500"
                    }`}
                    onClick={() => toggleSelectionAdd(card.id)}
                  >
                    {selectedAddId === card.id
                      ? t[language].Selected
                      : t[language].Select}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* End Adds */}

        {/* Start Create Account */}
        {activeIndex === 2 && (
          <div className="grid grid-cols-3 mx-20 items-center xl:gap-12 account">
            <div className="flex flex-col col-span-2">
              <Toast
                className="md:block hidden"
                life={2000}
                showTransformOptions="translateX(100%)"
                showTransitionOptions="500ms"
                hideTransitionOptions="100ms"
              />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-14 mb-10 self-center">
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="cursor-pointer">
                      <div className="flex flex-col items-center justify-center">
                        {uploadedImageSrc ? (
                          <img
                            src={uploadedImageSrc}
                            className="w-[200px] h-[200px] object-contain rounded-3xl"
                            alt="Uploaded"
                          />
                        ) : (
                          <svg
                            className="w-[200px] h-[200px] object-cover rounded-3xl"
                            viewBox="0 0 120 120"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="120"
                              height="120"
                              rx="10"
                              fill="#F3F5F5"
                            />
                            <path
                              d="M60.0003 73.6572C64.7995 73.6572 68.69 69.7667 68.69 64.9675C68.69 60.1683 64.7995 56.2778 60.0003 56.2778C55.2011 56.2778 51.3105 60.1683 51.3105 64.9675C51.3105 69.7667 55.2011 73.6572 60.0003 73.6572Z"
                              fill="white"
                            />
                            <path
                              d="M86.0757 43.8643H77.9346C77.4133 43.8644 76.9052 43.7005 76.4823 43.3956C76.0594 43.0908 75.7432 42.6607 75.5785 42.1661L74.7939 39.8099C74.464 38.8212 73.8314 37.9614 72.9856 37.3523C72.1399 36.7432 71.1239 36.4156 70.0816 36.416H49.9288C48.8867 36.4163 47.871 36.7444 47.0257 37.354C46.1804 37.9636 45.5483 38.8237 45.219 39.8124L44.4344 42.1661C44.2697 42.6607 43.9535 43.0908 43.5306 43.3956C43.1077 43.7005 42.5996 43.8644 42.0783 43.8643H33.9372C32.6203 43.8643 31.3573 44.3874 30.4261 45.3187C29.4948 46.2499 28.9717 47.5129 28.9717 48.8298V78.6229C28.9717 79.9398 29.4948 81.2028 30.4261 82.134C31.3573 83.0652 32.6203 83.5884 33.9372 83.5884H86.0757C87.3926 83.5884 88.6556 83.0652 89.5868 82.134C90.5181 81.2028 91.0412 79.9398 91.0412 78.6229V48.8298C91.0412 47.5129 90.5181 46.2499 89.5868 45.3187C88.6556 44.3874 87.3926 43.8643 86.0757 43.8643ZM60.0065 78.6229C52.4787 78.6229 46.3512 72.4954 46.3512 64.9677C46.3512 57.44 52.4787 51.3126 60.0065 51.3126C67.5342 51.3126 73.6618 57.44 73.6618 64.9677C73.6618 72.4954 67.5342 78.6229 60.0065 78.6229ZM74.9031 53.7953C74.2447 53.7953 73.6132 53.5337 73.1476 53.0681C72.6819 52.6025 72.4204 51.971 72.4204 51.3126C72.4204 50.6541 72.6819 50.0226 73.1476 49.557C73.6132 49.0914 74.2447 48.8298 74.9031 48.8298C75.5616 48.8298 76.1931 49.0914 76.6587 49.557C77.1244 50.0226 77.3859 50.6541 77.3859 51.3126C77.3859 51.971 77.1244 52.6025 76.6587 53.0681C76.1931 53.5337 75.5616 53.7953 74.9031 53.7953Z"
                              fill="white"
                            />
                            <path
                              d="M37.6601 41.3817H32.6945C32.3653 41.3817 32.0495 41.2509 31.8167 41.0181C31.5839 40.7853 31.4531 40.4695 31.4531 40.1403C31.4531 39.8111 31.5839 39.4953 31.8167 39.2625C32.0495 39.0297 32.3653 38.8989 32.6945 38.8989H37.6601C37.9893 38.8989 38.3051 39.0297 38.5379 39.2625C38.7707 39.4953 38.9015 39.8111 38.9015 40.1403C38.9015 40.4695 38.7707 40.7853 38.5379 41.0181C38.3051 41.2509 37.9893 41.3817 37.6601 41.3817Z"
                              fill="white"
                            />
                          </svg>
                        )}
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={onFileInputChange}
                        {...register("image")}
                      />
                    </label>
                    <div className="flex flex-col mx-6 space-y-3">
                      <i
                        onClick={resetImage}
                        className="pi pi-trash self-start text-red-600 border-red-600 p-2 border rounded-lg cursor-pointer"
                        style={{ fontSize: "1rem" }}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 mb-20 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[#8D8D8D]">
                      {t[language].Name}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      className="py-3 px-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t[language].Name}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#8D8D8D]">
                      {t[language].CompanyName}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      {...register("companyName", { required: true })}
                      type="text"
                      className="py-3 px-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t[language].CompanyName}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#8D8D8D]">
                      {t[language].Email}
                      <span className="text-red-600">*</span>
                    </label>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      className="py-3 px-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t[language].Email}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#8D8D8D]">
                      {t[language].PhoneNumber}
                      <span className="text-red-600">*</span>
                    </label>
                    <div className="flex">
                      <Dropdown
                        options={countries.map((c) => ({
                          label: c.code,
                          value: c,
                        }))}
                        onChange={(e) => onSelectCountry(e.value)}
                        {...register("country")}
                      />
                      <input
                        {...register("phoneNumber", { required: true })}
                        type="tel"
                        className="py-3 px-3 rounded-e-md w-full border border-s-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={t[language].PhoneNumber}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 input-container">
                    <label className="text-[#8D8D8D]">
                      {t[language].Password}
                      <span className="text-red-600">*</span>
                    </label>
                    <Password
                      {...register("password", { required: true })}
                      placeholder="•••••••••"
                      toggleMask
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2 input-container">
                    <label className="text-[#8D8D8D]">
                      {t[language].ConfirmPassword}
                      <span className="text-red-600">*</span>
                    </label>
                    <Password
                      {...register("confirmPassword", { required: true })}
                      placeholder="•••••••••"
                      toggleMask
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#8D8D8D]">
                      {t[language].TaxId}
                      {t[language].VAT}
                    </label>
                    <input
                      {...register("taxId")}
                      type="text"
                      className="py-3 px-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tax Id"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#8D8D8D]">
                      {t[language].SubDomain}
                      <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <input
                        {...register("subdomain", { required: true })}
                        type="text"
                        className="py-3 px-3 pr-32 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ex.user65"
                      />
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                        @ctit.com.sa
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register("acceptPolicy")}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="text-gray-700">
                        {t[language].AcceptTerms}
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-5 bg-blue-500 text-white rounded-md"
                  >
                    {t[language].Submit}
                  </button>
                </div>
              </form>
            </div>
            <div className="hidden lg:block">
              <img src={accountImg} alt="account photo" />
            </div>
          </div>
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
