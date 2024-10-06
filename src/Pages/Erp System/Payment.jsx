import React, { useEffect } from "react";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";
import QRCode from "../../assets/qr-code-img.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Payment() {
  // translate
  const { language } = useLanguage();

  useEffect(() => {
    axios
      .post("https://aldaifii.ctit.com.sa/saas/available_online_payment", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
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
                <span className="text-gray-400">{t[language].NoDiscount}</span>
              </p>
            </div>
            <div className="flex border border-gray-300 rounded-md w-full p-2">
              <input
                placeholder={
                  language === "en" ? "Enter Promo Code" : "أدخل كود الخصم"
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
  );
}
