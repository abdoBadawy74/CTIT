import React, { useState, useEffect, useRef } from "react";
import "./ErpSystem.css";
import { useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import accountImg from "../../assets/account-image.svg";
import VerifyEmailImg from "../../assets/Mail.png";

export default function ErpSystem() {
  // states
  const [activeIndex, setActiveIndex] = useState(0); // Step control
  //packages
  const [packeges, setPackeges] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);
  const [loading, setLoading] = useState(false);
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
    { label: "Package" },
    { label: "Adds" },
    { label: "Create Account" },
    { label: "Email" },
    { label: "Payment" },
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

  //   start Packages of Erp
  const countries = [
    { id: 1, code: "SA" },
    { id: 2, code: "US" },
    { id: 3, code: "UK" },
  ];

  const subscriptionPlans = [
    { id: 1, name: "Basic", discount: 10 },
    { id: 2, name: "Standard", discount: 20 },
    { id: 3, name: "Premium", discount: 30 },
  ];

  useEffect(() => {
    setPackeges([
      {
        id: 1,
        name: "Basic",
        price: 100,
        description: "Basic package for small businesses",
        selected: false,
      },
      {
        id: 2,
        name: "Standard",
        price: 200,
        description: "Standard package for medium businesses",
        selected: false,
      },
      {
        id: 3,
        name: "Premium",
        price: 300,
        description: "Premium package for large businesses",
        selected: false,
      },
    ]);
  }, []);

  const onSelectedCountry = (country) => {
    setSelectedCountry(country);
    // retrieveMainPackages();
    localStorage.setItem("selected_country_id", country.id);
  };

  const toggleSelectionCard = (index) => {
    setPackeges((prevPackeges) =>
      prevPackeges.map((card, i) =>
        i === index ? { ...card, selected: !card.selected } : card
      )
    );
    setSelectedPlanIndex(index); // Select the card
  };

  const onSelectedPlan = (plan, index) => {
    setSelectedPlan(plan);
    setSelectedPlanIndex(index);
    // retrieveMainPackages();
    localStorage.setItem("selected_plan_id", plan.id);
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
        {/* ERP Packages */}
        {activeIndex === 0 && (
          <div>
            <div className="flex items-center flex-col mb-8 px-44 space-y-5 packages">
              <h1 className="text-2xl font-medium">Select Package</h1>
              <p className="text-[#8D8D8D] text-base">
                Please make sure that you will select the package .............
              </p>

              <div className="bg-[#F8F9F9] flex gap-5 p-1 rounded-xl w-full flex-wrap">
                <div>
                  {countries.length > 0 && (
                    <select
                      className="px-5 py-4"
                      onChange={(e) =>
                        onSelectedCountry(
                          countries.find((c) => c.id === e.target.value)
                        )
                      }
                      value={selectedCountry ? selectedCountry.id : ""}
                    >
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.code}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="flex grow gap-7 items-center plans">
                  {subscriptionPlans.map((plan, i) => (
                    <div key={plan.id} className="grow">
                      <button
                        onClick={() => onSelectedPlan(plan, i)}
                        className={`text-[#8D8D8D] px-5 py-4 flex gap-4 justify-center items-center rounded-xl w-full ${
                          selectedPlanIndex === i
                            ? "bg-[#002B54] text-white"
                            : ""
                        }`}
                      >
                        {plan.name}
                        <span
                          className={`p-2 rounded-lg ${
                            selectedPlanIndex === i
                              ? "bg-[#27AE60] text-white"
                              : "bg-[#DCDCDC] text-[#8D8D8D]"
                          }`}
                        >
                          {plan.discount}%
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pb-8 px-2 gap-10 grid justify-items-center grid-cols1 xl:grid-cols-3 md:max-w-[500px] lg:max-w-[1165px] mx-auto">
                {packeges.map((card, index) => (
                  <div
                    key={card.id}
                    style={{
                      backgroundColor: card.selected ? "#f2f8ff" : "white",
                      borderColor: card.selected ? "#0081FE" : "#DCDCDC",
                    }}
                    className="cardPackage bg-white flex flex-col gap-5 border border-[#DCDCDC] rounded-lg py-5 px-7 max-w-[355px]"
                  >
                    <div className="title flex flex-col justify-center items-center">
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M45 51.2501H42.5V50.6251C42.5 47.8751 40.25 45.6251 37.5 45.6251H31.875V39.9001C31.25 39.9751 30.625 40.0001 30 40.0001C29.375 40.0001 28.75 39.9751 28.125 39.9001V45.6251H22.5C19.75 45.6251 17.5 47.8751 17.5 50.6251V51.2501H15C13.975 51.2501 13.125 52.1001 13.125 53.1251C13.125 54.1501 13.975 55.0001 15 55.0001H45C46.025 55.0001 46.875 54.1501 46.875 53.1251C46.875 52.1001 46.025 51.2501 45 51.2501Z"
                          fill="#0081FE"
                        />
                        <path
                          opacity="0.4"
                          d="M13.8012 29.1C12.1512 28.475 10.7012 27.45 9.55117 26.3C7.22617 23.725 5.70117 20.65 5.70117 17.05C5.70117 13.45 8.52617 10.625 12.1262 10.625H13.5262C12.8762 11.95 12.5012 13.425 12.5012 15V22.5C12.5012 24.85 12.9512 27.075 13.8012 29.1Z"
                          fill="#0081FE"
                        />
                        <path
                          opacity="0.4"
                          d="M54.3012 17.05C54.3012 20.65 52.7762 23.725 50.4512 26.3C49.3012 27.45 47.8512 28.475 46.2012 29.1C47.0512 27.075 47.5012 24.85 47.5012 22.5V15C47.5012 13.425 47.1262 11.95 46.4762 10.625H47.8762C51.4762 10.625 54.3012 13.45 54.3012 17.05Z"
                          fill="#0081FE"
                        />
                        <path
                          d="M37.5 5H22.5C16.975 5 12.5 9.475 12.5 15V22.5C12.5 32.175 20.325 40 30 40C39.675 40 47.5 32.175 47.5 22.5V15C47.5 9.475 43.025 5 37.5 5ZM37.1 21.125L35.55 23.025C35.3 23.3 35.125 23.85 35.15 24.225L35.3 26.675C35.4 28.175 34.325 28.95 32.925 28.4L30.65 27.5C30.3 27.375 29.7 27.375 29.35 27.5L27.075 28.4C25.675 28.95 24.6 28.175 24.7 26.675L24.85 24.225C24.875 23.85 24.7 23.3 24.45 23.025L22.9 21.125C21.925 19.975 22.35 18.7 23.8 18.325L26.175 17.725C26.55 17.625 27 17.275 27.2 16.95L28.525 14.9C29.35 13.625 30.65 13.625 31.475 14.9L32.8 16.95C33 17.275 33.45 17.625 33.825 17.725L36.2 18.325C37.65 18.7 38.075 19.975 37.1 21.125Z"
                          fill="#0081FE"
                        />
                      </svg>
                      <h2 className="py-2">{card.name}</h2>
                      <p className="text-[#0081FE] font-medium">
                        {card.price}{" "}
                        <span className="text-xs text-[#8D8D8D]">
                          / monthly
                        </span>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <i
                        className="pi pi-check-circle"
                        style={{ color: "#0081FE" }}
                      ></i>
                      <p className="text-[#002B54] font-semibold text-sm">
                        {card.description}
                      </p>
                    </div>
                    <div className="flex justify-between gap-5">
                      <button
                        className={`text-white rounded-xl mt-7 py-3 px-2 min-w-36 ${
                          card.selected ? "bg-[#002b54]" : "bg-blue-500"
                        }`}
                        onClick={() => toggleSelectionCard(index)}
                      >
                        {card.selected ? "Selected" : "Select"}
                      </button>
                      <button className="rounded-xl mt-7 py-3 px-2 bg-white text-blue-500 min-w-36 border border-[#0081FE]">
                        More details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* End Erp Packages */}

        {/* Start Adds  */}
        {activeIndex === 1 && (
          <div>
            <div className="flex items-center flex-col mb-8">
              <h1 className="text-2xl mb-5 font-medium">
                What You Need To Add{" "}
                <span className="text-[#0081FE]">(not required)</span>
              </h1>
              <p className="text-[#8D8D8D] text-base">
                If you want to add more capacities or number of employees
              </p>
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
                    {selectedAddId === card.id ? "Selected" : "Select"}
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
                      Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      className="py-3 px-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#8D8D8D]">
                      Company Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      {...register("companyName", { required: true })}
                      type="text"
                      className="py-3 px-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#8D8D8D]">
                      Email<span className="text-red-600">*</span>
                    </label>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      className="py-3 px-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Email"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#8D8D8D]">
                      Phone Number<span className="text-red-600">*</span>
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
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 input-container">
                    <label className="text-[#8D8D8D]">
                      Password<span className="text-red-600">*</span>
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
                      Confirm Password<span className="text-red-600">*</span>
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
                      Tax Id (VAT - optional)
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
                      Sub Domain<span className="text-red-600">*</span>
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
                        I accept the terms and conditions
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-5 bg-blue-500 text-white rounded-md"
                  >
                    Submit
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
          <div className="lg:ml-60 sm:mb-4 mx-auto mt-28 flex flex-col lg:flex-row justify-between items-center">
            <div>
              <div className="flex flex-col gap-3">
                <h1 className="text-xl">Verify email</h1>
                <p className="text-[#8D8D8D] text-sm">
                  Please check your email{" "}
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
                  Verify
                </button>

                <p
                  id="helper-text-explanation"
                  className="text-center mt-8 text-gray-500 text-sm"
                >
                  Didn't receive anything?
                  <span className="text-[#0081FE]">
                    Send again {countdown > 0 ? `${countdown} seconds` : "Now"}
                  </span>
                </p>
              </form>
            </div>
            <div className="mr-56 hidden lg:block">
              <img
                src="assets/images/Mail.png"
                alt="Verify email"
                className="w-[350px]"
              />
            </div>
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
