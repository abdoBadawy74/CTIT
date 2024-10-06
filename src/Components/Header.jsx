import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/image-2.png";
import useLanguage from "../Context/useLanguage";
import t from "../translation/translation";
import PropTypes from "prop-types";
import { PROFILE } from "../Api/Api";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Added state for menu toggle
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = JSON.parse(localStorage.getItem("LoginEmail"));
    setIsLoggedIn(savedEmail === null ? false : true);
  }, []);

  // get profile data
  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    axios
      .post(`${PROFILE}`, {
        params: {
          email: JSON.parse(localStorage.getItem("LoginEmail")),
        },
      })
      .then((response) => {
        // console.log(response);
        setProfileData(response.data.result.partner_details[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Language context
  const { language, setLanguage } = useLanguage();
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value; // Get the selected language from the event
    setLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
    console.log("Language changed to:", selectedLanguage);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, [setLanguage]);

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("LoginEmail");
    navigate("/landing");
  };

  return (
    <>
      <nav className="bg-white w-full z-20 top-0 start-0 border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logo}
              className={`${language === "en" ? "w-[120px]" : "w-[100px]"} `}
              alt="Company Logo"
            />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <select
              className="text-[#002B5466] mr-2 outline-none"
              onChange={handleLanguageChange}
              value={language} // Bind the select value to the current language
            >
              <option value="en">EN</option>
              <option value="ar">AR</option>
            </select>
            {isLoggedIn ? (
              <div className="cursor-pointer relative" onClick={toggleMenu}>
                {profileData?.partner_image ? (
                  <img
                    src={`data:image/jpeg;base64,${profileData?.partner_image}`}
                    className="w-[40px] h-[40px] rounded-full"
                    alt="Profile Image"
                  />
                ) : (
                  <div className="bg-gray-400 w-[40px] h-[40px] rounded-full flex items-center justify-center font-bold">
                    <p>{profileData?.partner_name.slice(0, 1).toUpperCase()}</p>
                  </div>
                )}
                {/* Dropdown menu  */}
                {isMenuOpen && (
                  <div
                    className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-[fit-content] absolute top-8 right-0 px-2 py-2 "
                    id="user-dropdown"
                  >
                    <div className="px-4 py-3 border-b border-b-gray-300">
                      <span className="block text-sm text-gray-900 ">
                        {profileData?.partner_name}
                      </span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                        {profileData?.partner_email}
                      </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-200 rounded">
                          Edit Profile
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-200 rounded">
                          Change Password
                        </a>
                      </li>
                      <li>
                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-200 rounded">
                          Sign Out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Link
                  to={isLoggedIn ? "/profile" : "/login"}
                  className="text-white bg-[#0081FE] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {t[language].Login}
                </Link>
              </div>
            )}

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen ? "true" : "false"}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white text-black">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  {t[language].Home}
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className="block py-2 px-3 text-[#002B5466] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 md:dark:hover:bg-transparent transition"
                >
                  {t[language].About}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="block py-2 px-3 text-[#002B5466] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 md:dark:hover:bg-transparent transition"
                >
                  {t[language].Services}
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  className="block py-2 px-3 text-[#002B5466] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 md:dark:hover:bg-transparent transition"
                >
                  {t[language].Work}
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="block py-2 px-3 text-[#002B5466] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 md:dark:hover:bg-transparent transition"
                >
                  {t[language].Pricing}
                </a>
              </li>
              <li>
                <Link
                  to="/support"
                  className="block py-2 px-3 text-[#002B5466] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 md:dark:hover:bg-transparent transition"
                >
                  {t[language].Contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
