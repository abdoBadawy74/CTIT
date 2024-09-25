import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkPackageRoute,
  checkAccountRoute,
  checkEmailRoute,
  checkPaymentRoute,
} from "./packageSelectionService";
import "./Erp.css";
import "primereact/resources/themes/saga-blue/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { Steps } from "primereact/steps";

const ErpComponent = () => {
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSteps, setActiveSteps] = useState([]);
  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    const newItems = [
      {
        label: "Packages",
        routerLink: "/erp-packages",
        condition: () => checkPackageRoute(),
      },
      {
        label: "Adds",
        routerLink: "/erp-adds",
        condition: () => true,
      },
      {
        label: "Create Account",
        routerLink: "/erp-account",
        condition: () => checkAccountRoute(),
      },
      {
        label: "Confirm email",
        routerLink: "/erp-confirm-email",
        condition: () => checkEmailRoute(),
      },
      {
        label: "Payment",
        routerLink: "/erp-payment",
        condition: () => checkPaymentRoute(),
      },
    ];
    setItems(newItems);
  }, []);

  const onActiveIndexChange = (index) => {
    if (!activeSteps.includes(activeIndex)) {
      setActiveSteps([...activeSteps, activeIndex]);
    }
    setActiveIndex(index);
    if (!activeSteps.includes(index)) {
      setActiveSteps([...activeSteps, index]);
    }
  };

  const goToTheNext = () => {
    if (activeIndex < items.length - 1) {
      const currentRoute = items[activeIndex];
      const nextRoute = items[activeIndex + 1];
      if (currentRoute.condition()) {
        setActiveIndex((prevIndex) => prevIndex + 1);
        navigate(nextRoute.routerLink); // React router navigation
      } else {
        console.log(`Condition not met for ${currentRoute.label}`);
      }
    }
  };

  const goToThePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
      navigate(items[activeIndex - 1].routerLink); // Navigate to previous route
    }
  };

  return (
    <>
      <div className="card py-8 bg-[#f2f9ff] mb-8 transition">
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => onActiveIndexChange(e)}
        />
      </div>
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
            items[activeIndex]?.condition()
              ? "bg-[#0081FE] text-white"
              : "bg-gray-300 opacity-50"
          }`}
          disabled={!items[activeIndex]?.condition()}
          onClick={goToTheNext}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ErpComponent;
