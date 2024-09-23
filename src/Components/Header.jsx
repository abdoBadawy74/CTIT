import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/image-2.png";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = JSON.parse(localStorage.getItem("LoginEmail"));
    setEmail(savedEmail);
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

  return (
    <nav className="bg-white border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3">
          <img src={logo} className="w-24" alt="Logo" />
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isLoggedIn ? (
            <button
              className="text-white bg-blue-700"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="/docs/images/people/profile-picture-3.jpg"
                  alt="user photo"
                />
              </button>
              {showDropdown && (
                <div className="absolute z-50 my-4 text-base list-none bg-white divide-y">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900">
                      {userData.partner_name}
                    </span>
                    <span className="block text-sm text-gray-500">
                      {userData.partner_email}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link to="/edit-profile" className="block px-4 py-2">
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="block px-4 py-2"
                        onClick={() => navigate("/change-password")}
                      >
                        Change Password
                      </button>
                    </li>
                    <li>
                      <button className="block px-4 py-2" onClick={logout}>
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:flex-row md:space-x-8">
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900">
                Home
              </a>
            </li>
            <li>
              <Link
                to="/landing#aboutSection"
                className="block py-2 px-3 text-gray-900"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/landing#pricingSection"
                className="block py-2 px-3 text-gray-900"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/landing#workSection"
                className="block py-2 px-3 text-gray-900"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                to="/landing#serviceSection"
                className="block py-2 px-3 text-gray-900"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/landing#contactSection"
                className="block py-2 px-3 text-gray-900"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
