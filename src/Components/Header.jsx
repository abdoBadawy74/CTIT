import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/image-2.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userData, setUserData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Added state for menu toggle
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = JSON.parse(localStorage.getItem("LoginEmail"));
    setEmail(savedEmail);
    console.log(savedEmail);
    setIsLoggedIn(savedEmail === null ? false : true);

    if (savedEmail) {
      getDataProfile(savedEmail);
    }
  }, []);

  const getDataProfile = async (email) => {
    const res = await axios.get(`API_ENDPOINT`, { params: { email } });
    setUserData(res.data.partner_details[0]);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("LoginEmail");
    navigate("/landing");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-white  w-full z-20 top-0 start-0  border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="w-[120px]" alt="Company Logo"></img>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <select className="text-[#002B5466] mr-2 outline-none">
              <option value="en">EN</option>
              <option value="ar">AR</option>
            </select>
            <Link
              to={isLoggedIn ? "/profile" : "/login"}
              className="text-white bg-[#0081FE] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </Link>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen ? "true" : "false"} // Update aria-expanded based on menu state
              onClick={toggleMenu} // Toggle menu on click
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
          {/* Updated visibility handling for mobile menu */}
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
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  className="block py-2 px-3 text-[#002B5466] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  md:dark:hover:bg-transparent transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="block py-2 px-3 text-[#002B5466] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  md:dark:hover:bg-transparent transition"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  className="block py-2 px-3 text-[#002B5466] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  md:dark:hover:bg-transparent transition"
                >
                  Work
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="block py-2 px-3 text-[#002B5466] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  md:dark:hover:bg-transparent transition"
                >
                  Pricing
                </a>
              </li>
              <li>
                <Link
                  to="/support"
                  className="block py-2 px-3 text-[#002B5466] rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500  md:dark:hover:bg-transparent transition"
                >
                  Contact Us
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
