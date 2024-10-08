import React from "react";
import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";
import discount from "../../assets/header-discount.png";
import "./Hero.css";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";

const Hero = () => {
  // translate
  const { language, setLanguage } = useLanguage();
  return (
    <div className="px-20 pt-16 hero">
      <div className="container flex flex-wrap flex-col md:flex-row items-center">
        {/* Left Column */}
        <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
          <p className="uppercase tracking-loose w-full welcome">
            {t[language].Welcome} <span className="text-main ms-1">ctit</span>
          </p>
          <h1 className="my-4 text-5xl font-bold leading-tight">
            {t[language].Head1}{" "}
            <span className="text-main">{t[language].Business}</span>
            <br />
            <span className="text-main">{t[language].Head2}</span>{" "}
            {t[language].Easy}
          </h1>
          <p className="leading-normal text-lg mb-6">{t[language].Hero_desc}</p>
          <a
            href="#"
            className="bg-main mx-auto lg:mx-0 text-white font-bold rounded-md my-3 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            {t[language].Download}
          </a>
        </div>
        {/* Right Column */}
        <div className="w-full md:w-3/5 py-2 text-center">
          <img
            className="w-full md:w-4/5 z-50 md:pl-10"
            src={hero}
            alt="Hero"
          />
        </div>
      </div>

      {/* Second Section */}
      <div className="container-box bg-white mb-10 rounded-lg shadow-lg flex justify-bet flex- wrap">
        <div
          className={`lg:w-full flex items-center ${
            language === "en" ? "" : "text-end"
          } `}
        >
          <div className="first lg:w-1/3 w-full mt-6 pl-6 pb-3">
            <button className="rounded-full text-gray-700">
              {" "}
              {t[language].Erp}
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              {t[language].Offer}
            </h1>
          </div>

          <div
            className={`discount w-fit sm:w-1/4 mt-6 ${
              language === "en" ? "text-center" : "text-start"
            }`}
          >
            {t[language].Off}
          </div>

          <div className="w-full lg:w-1/3 img-btn justify-self-end">
            <div className="img">
              <img
                className="inset-0 h-full w-full object-cover object-center"
                src={discount}
                alt="Discount"
              />
            </div>
            <div
              className="btn"
              style={{
                left: language === "en" ? "20%" : "unset",
                right: language === "ar" ? "-20%" : "",
              }}
            >
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-12 border border-blue-700 rounded"
                onClick={() => alert("Subscribed!")}
              >
                {t[language].Subscribe}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
