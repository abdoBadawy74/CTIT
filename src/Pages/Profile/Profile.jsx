import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import "./Profile.css";
import profileImg from "../../assets/profile_img.png";
import exportImg from "../../assets/export.png";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [partnerDetails, setPartnerDetails] = useState([]);
  const [subscriptionDetails, setSubscriptionDetails] = useState([]);
  const [billingHistory, setBillingHistory] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Simulating fetching profile data
    fetchProfileData();
  }, []);

  const fetchProfileData = () => {
    // Mock function to simulate data fetching
    setTimeout(() => {
      setPartnerDetails([
        {
          partner_name: "Partner 1",
          partner_phone: "123-456-789",
          partner_email: "partner@example.com",
          partner_company_name: "Company XYZ",
        },
      ]);
      setSubscriptionDetails([
        {
          subs_name: "Basic Plan",
          subs_amount: "100$",
          subs_state: "Active",
          subs_renew_date: "01/01/2025",
          db_link: "https://db-link.com",
        },
      ]);
      setBillingHistory([
        {
          bill_state: "Paid",
          bill_name: "Invoice #1",
          bill_creation_date: "01/01/2024",
          bill_amount: "100$",
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const toggleDetails = () => setShowDetails(!showDetails);

  const goToPackage = () => {
    // Logic to navigate to new package
    navigate("/erp");
    console.log("Navigate to new package");
  };

  const goToPayment = () => {
    // Logic for payment
    console.log("Payment initiated");
  };

  const goToAdd = () => {
    navigate("/adds");
  };

  return (
    <>
      <Header />
      {loading ? (
        <div className="text-center">
          <div>Loading...</div> {/* Replace with spinner component */}
        </div>
      ) : (
        <div className="bg-[#F8F9F9]">
          <div className="max-w-6xl mx-auto rounded-lg pt-4">
            {partnerDetails.map((partner, index) => (
              <div key={index} className="flex items-center mb-5 mr-4 info">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="rounded-lg"
                  style={{ width: "100px", height: "100px" }}
                />
                <div>
                  <h2 className="text-xl font-semibold pl-4">
                    {partner.partner_name}
                  </h2>
                  <div className="flex flex-row">
                    <p className="p-4">
                      <i className="pi pi-phone"></i> {partner.partner_phone}
                    </p>
                    <p className="p-4">
                      <i className="pi pi-envelope"></i> {partner.partner_email}
                    </p>
                    <p className="p-4">
                      <i className="pi pi-briefcase"></i>{" "}
                      {partner.partner_company_name}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="top-table flex justify-between pt-8 m-2">
              <h3 className="text-lg font-medium">Subscription Details</h3>
              <button
                className="mb-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={goToPackage}
              >
                Add new Subscription
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-6 gap-4 mb-4 font-bold bg-gray-200">
                <div>Subscription Name</div>
                <div>Package Name</div>
                <div>Amount</div>
                <div>Status</div>
                <div>Renewal Date</div>
                <div>DB Link</div>
              </div>

              {subscriptionDetails.map((subs, index) => (
                <div key={index} className="mb-4">
                  <div className="grid grid-cols-6 gap-4 items-center border-b pb-2">
                    <div className="flex items-center">
                      <button className="mr-2" onClick={toggleDetails}>
                        {showDetails ? "▼" : "▶"}
                      </button>
                      <span>{subs.subs_name}</span>
                    </div>
                    <div>{subs.main_packages_info?.name || "N/A"}</div>
                    <div>{subs.subs_amount}</div>
                    <div>{subs.subs_state}</div>
                    <div>{subs.subs_renew_date}</div>
                    <div>
                      <a
                        style={{ color: "rgb(11, 153, 241)" }}
                        href={subs.db_link}
                      >
                        {subs.db_link}
                      </a>
                    </div>
                  </div>

                  {showDetails && (
                    <div className="ml-6 mt-2">
                      {/* Add further details rendering here */}
                    </div>
                  )}
                </div>
              ))}
              <button className="text-sm text-[#8D8D8D]" onClick={goToAdd}>
                New Add +
              </button>
            </div>

            {/* Billing History */}
            <div className="max-w-6xl mx-auto mb-5 pb-5">
              <div className="bg-white rounded-lg pt-5 m-5 shadow-lg">
                <div className="flex justify-between top">
                  <h1>Billing History</h1>
                  <button className="ml-auto btn-export flex flex-row mb-2">
                    Export
                    <img src={exportImg} alt="Export" />
                  </button>
                </div>

                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Invoice</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistory.map((bill, index) => (
                      <tr key={index} className="text-center">
                        <td className="py-3 ">
                          <p className="bg-[#27AE601A] p-2 rounded text-[#27AE60] w-fit m-auto">
                            {bill.bill_state}
                          </p>
                        </td>
                        <td className="py-3">{bill.bill_name}</td>
                        <td className="py-3">{bill.bill_creation_date}</td>
                        <td className="py-3">{bill.bill_amount}</td>
                        <td>
                          <button onClick={goToPayment} className="p-2 rounded">
                            Upload a Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mb-5 pb-5">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-lg p-5 m-5 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex flex-row p-2">
                    <div className="text-lg font-semibold p-2">
                      Enable auto renew
                    </div>
                    <div className="text-blue-500 p-2">
                      <a href="#">(renews on May 2nd, 2023)</a>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input
                      type="checkbox"
                      name="toggle"
                      id="toggle"
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                    <label
                      htmlFor="toggle"
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                    ></label>
                  </div>
                </div>

                <p className="mt-2 text-gray-600 p-2">
                  will renew your subscription auto, if the current plan
                  expires, however; this may prevent you from:
                </p>
                <div className="mt-4 flex space-x-4 p-2">
                  <div className="flex items-center px-4 py-2 bg-gray-100 rounded-md">
                    <img
                      src="https://img.icons8.com/color/48/000000/visa.png"
                      alt="Visa"
                      className="w-20 h-20"
                    />
                    <span className="ml-2 text-gray-700">**** 2315</span>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-gray-100 rounded-md">
                    <img
                      src="https://img.icons8.com/color/48/000000/mastercard.png"
                      alt="Mastercard"
                      className="w-20 h-20"
                    />
                    <span className="ml-2 text-gray-700">**** 2315</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Profile;
