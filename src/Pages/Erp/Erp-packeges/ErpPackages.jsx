import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom"; // Import useOutletContext

function ErpPackages() {
  const [cards, setCards] = useState([]);
  //   const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  //   const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);
  const [loading, setLoading] = useState(false);
 

  const onSelectedCountry = (country) => {
    setSelectedCountry(country);
    // retrieveMainPackages();
    localStorage.setItem("selected_country_id", country.id);
  };

  const toggleSelectionCard = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
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
    setCards([
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

  return (
    <div className="flex items-center flex-col mb-8 px-44 space-y-5">
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

        <div className="flex grow gap-7 items-center">
          {subscriptionPlans.map((plan, i) => (
            <div key={plan.id} className="grow">
              <button
                onClick={() => onSelectedPlan(plan, i)}
                className={`text-[#8D8D8D] px-5 py-4 flex gap-4 justify-center items-center rounded-xl w-full ${
                  selectedPlanIndex === i ? "bg-[#002B54] text-white" : ""
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
        {cards.map((card, index) => (
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
                <span className="text-xs text-[#8D8D8D]">/ monthly</span>
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
  );
}

export default ErpPackages;
