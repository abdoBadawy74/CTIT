import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
    setItems([
      {
        label: "Package",
        condition: checkPackageRoute,
      },
      {
        label: "Account",
        condition: checkAccountRoute,
      },
      {
        label: "Email",
        condition: checkEmailRoute,
      },
      {
        label: "confirm Email",
        condition: checkEmailRoute,
      },
      {
        label: "Payment",
        condition: checkPaymentRoute,
      },
    ]);
  }, []);

  useEffect(() => {
    setActiveSteps(items.map((item) => item.condition()));
  }, [items]);

  const onActiveIndexChange = (e) => {
    setActiveIndex(e.index);
  };

  console.log(activeIndex);

  const goToTheNext = () => {
    if (activeIndex === items.length - 1) {
      navigate("/erp/packages");
    } else {
      setActiveIndex(activeIndex + 1);
    }
    console.log(activeIndex);
  };

  const goToThePrevious = () => {
    if (activeIndex === 0) {
      navigate("/erp");
    } else {
      setActiveIndex(activeIndex - 1);
    }
    console.log(activeIndex);
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
          onClick={goToTheNext}
        >
          Next
        </button>
      </div>
      <Outlet />
    </>
  );
};

export default ErpComponent;
