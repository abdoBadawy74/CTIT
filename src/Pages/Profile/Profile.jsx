import { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer/Footer";
import "./Profile.css";
import exportImg from "../../assets/export.png";
import { Link, useNavigate } from "react-router-dom";
import editIcon from "../../assets/edit-icon.svg";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";
import axios from "axios";
import { PROFILE } from "../../Api/Api";
import { BeatLoader } from "react-spinners";

const Profile = () => {
  // translate
  const { language } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [partnerDetails, setPartnerDetails] = useState([]);
  const [subscriptionDetails, setSubscriptionDetails] = useState([]);
  const [billingHistory, setBillingHistory] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  // console.log(billingHistory);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post(
          `${PROFILE}`,
          {
            params: {
              email: localStorage?.getItem("email")?.replace(/['"]+/g, ""),
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setPartnerDetails(response.data.result.partner_details);
        setSubscriptionDetails(response.data.result.subscription_details);
        setBillingHistory(response.data.result.billing_history);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const toggleDetails = () => setShowDetails(!showDetails);

  const goToPackage = () => {
    // Logic to navigate to new package
    navigate("/erp");
    // console.log("Navigate to new package");
  };

  const goToAdd = () => {
    navigate("/adds");
  };

  return (
    <>
      {loading ? (
        <div className="text-center">
          <BeatLoader className="text-center mt-60" color="#0081FE" size={50} />
        </div>
      ) : (
        <>
          <Header />
          <div className="bg-[#F8F9F9] overflow-hidden">
            <div className="max-w-6xl mx-auto rounded-lg pt-4">
              {partnerDetails.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between flex-wrap px-3"
                >
                  <div className="flex items-center mb-5 mr-4 info flex-wrap">
                    {partner.partner_image ? (
                      <img
                        src={`data:image/jpeg;base64,${partner.partner_image}`}
                        alt="Profile"
                        className="rounded-lg object-cover"
                        style={{ width: "100px", height: "100px" }}
                      />
                    ) : (
                      <img
                        src={`https://ui-avatars.com/api/?name=${partner.partner_name}`}
                        alt="Profile"
                        className="rounded-lg object-cover"
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                    <div>
                      <h2
                        className={`text-xl font-semibold ${
                          language === "en" ? "pl-4" : "pr-4"
                        } `}
                      >
                        {partner.partner_name}
                      </h2>
                      <div className="flex flex-row flex-wrap">
                        <p className="p-4">
                          <i className="pi pi-phone"></i>{" "}
                          {partner.partner_phone}
                        </p>
                        <p className="p-4">
                          <i className="pi pi-envelope"></i>{" "}
                          {partner.partner_email}
                        </p>
                        <p className="p-4">
                          <i className="pi pi-briefcase"></i>{" "}
                          {partner.partner_company_name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/edit-profile"
                    className="flex gap-2 items-center border border-[#27AE60] w-fit p-2 rounded text-[#27AE60] cursor-pointer"
                    state={partnerDetails[0]}
                  >
                    {t[language].EditProfile}
                    <img src={editIcon} alt="" />
                  </Link>
                </div>
              ))}

              <div className="top-table flex md:justify-between gap-3 items-center flex-wrap pt-8 m-2">
                <h3 className="text-lg font-medium">
                  {t[language].SubscriptionDetials}
                </h3>
                <button
                  className="mb-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={goToPackage}
                >
                  {t[language].AddSubscription}
                </button>
              </div>

              <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
                <div className="min-w-[900px] text-center  grid grid-cols-8 justify-center gap-4 mb-4 font-bold bg-gray-200">
                  <div className="text-xs md:text-base ">
                    {t[language].SubscriptionName}
                  </div>

                  <div className="text-xs md:text-base">
                    {t[language].Status}
                  </div>

                  <div className="text-xs md:text-base">
                    {t[language].CreatedDate}
                  </div>

                  <div className="text-xs md:text-base">
                    {t[language].RenewalDate}
                  </div>

                  <div className="text-xs md:text-base">
                    {t[language].Amount_Untax}
                  </div>
                  <div className="text-xs md:text-base">
                    {t[language].Amount_Tax}
                  </div>
                  <div className="text-xs md:text-base">
                    {t[language].Amount_Total}
                  </div>
                  <div className="text-xs md:text-base">
                    {t[language].DBLink}
                  </div>
                </div>

                {subscriptionDetails.map((subs, index) => (
                  <div key={index}>
                    <div className="min-w-[900px] text-center mb-4 grid grid-cols-8 gap-4 items-center border-b pb-2">
                      <div className="flex items-center">
                        <button className="mr-2" onClick={toggleDetails}>
                          {showDetails ? "▼" : "▶"}
                        </button>
                        <span>{subs.subs_name}</span>
                      </div>

                      <div>{subs.subs_state}</div>
                      <div>{subs.subs_date_order.split(" ")[0]}</div>
                      <div>{subs.subs_renew_date}</div>
                      <div>{subs.amount_untaxed}</div>
                      <div>{subs.amount_tax}</div>
                      <div>{subs.amount_total}</div>

                      <div>
                        <a
                          style={{
                            color: "rgb(11, 153, 241)",
                            fontSize: "12px",
                          }}
                          href={subs.db_link}
                          target="_blank"
                        >
                          {subs.db_link}
                        </a>
                      </div>
                    </div>
                    {showDetails && (
                      <div className="mt-5">
                        <div className="min-w-[900px] ml-3 flex justify-between px-5 gap-4 mb-4 font-bold bg-gray-200">
                          <div className="text-xs md:text-base">
                            {t[language].PackageName}
                          </div>

                          <div className="text-xs md:text-base">
                            {t[language].Description}
                          </div>

                          <div className="text-xs md:text-base">
                            {t[language].Price_Unit}
                          </div>

                          <div className="text-xs md:text-base">
                            {t[language].Amount_Untax}
                          </div>
                          <div className="text-xs md:text-base">
                            {t[language].Amount_Tax}
                          </div>
                          <div className="text-xs md:text-base">
                            {t[language].Amount_Total}
                          </div>
                        </div>

                        <div className="mx-4 min-w-[900px] flex justify-between px-5 gap-4 text-center">
                          <div className="flex items-center">
                            <span>
                              {subs.main_packages_info?.name + "" ||
                                subs.main_packages_info?.name}
                            </span>
                          </div>

                          <div>
                            <span>
                              {subs.main_packages_info?.description + "" ||
                                subs.main_packages_info?.description}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <span>{subs.main_packages_info.price_unit}</span>
                          </div>

                          <div className="flex items-center">
                            <span>
                              {subs.main_packages_info.amount_untaxed}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span>
                              {subs.main_packages_info.amount_tax.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span>{subs.main_packages_info.amount_total}</span>
                          </div>
                        </div>

                        <hr className="my-4" />

                        <div className="min-w-[900px] text-center mt-5 ml-3 flex justify-between px-5 gap-4 mb-4 font-bold bg-gray-200">
                          <div className="text-xs md:text-base">
                            {t[language].AddName}
                          </div>

                          <div className="text-xs md:text-base">
                            {t[language].Description}
                          </div>

                          <div className="text-xs md:text-base">
                            {t[language].Price_Unit}
                          </div>

                          <div className="text-xs md:text-base">
                            {t[language].Amount_Untax}
                          </div>
                          <div className="text-xs md:text-base">
                            {t[language].Amount_Tax}
                          </div>
                          <div className="text-xs md:text-base">
                            {t[language].Amount_Total}
                          </div>
                          <div className="text-xs md:text-base">
                            {t[language].Quantity}
                          </div>
                        </div>

                        <div className="min-w-[900px] ml-3 flex justify-between px-5 gap-4 text-center">
                          <div className="flex items-center  ">
                            <span>
                              {subs.additional_packages_info[index]?.name +
                                "" ||
                                subs.additional_packages_info[index]?.name}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  subs.additional_packages_info[index]
                                    ?.description,
                              }}
                            />
                          </div>

                          <div className="flex items-center">
                            <span>
                              {subs.additional_packages_info[index]?.price_unit}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <span>
                              {
                                subs.additional_packages_info[index]
                                  ?.amount_untaxed
                              }
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span>
                              {subs.additional_packages_info[
                                index
                              ]?.amount_tax.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span>
                              {subs.additional_packages_info[
                                index
                              ]?.amount_total.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span>
                              {subs.additional_packages_info[index]?.quantity}
                            </span>
                          </div>
                        </div>

                        <hr className="my-4" />

                        <h3 className="ml-5 mb-0 capitalize font-bold text-blue-400">
                          users count :
                        </h3>

                        <div className="min-w-[900px] mt-5 ml-3 flex justify-between px-5 gap -4 mb-4 font-bold bg-gray-200">
                          <div className="text-xs md:text-base">
                            {t[language].Additional_Count}
                          </div>

                          <div className="text-xs md:text-base">
                            {t[language].Defualt_Count}
                          </div>

                          <div className="text-xs md:text-base">
                            {t[language].Total_Count}
                          </div>
                        </div>

                        <div className="mx-4 min-w-[900px] flex justify-between px-5 gap-4 text-center">
                          <div className="flex items-center">
                            <span>
                              {subs.users_details.users_count.additional_count}
                            </span>
                          </div>

                          <div>
                            <span>
                              {subs.users_details.users_count.default_count}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <span>
                              {subs.users_details.users_count.total_count}
                            </span>
                          </div>
                        </div>
                        <hr className="my-4" />
                      </div>
                    )}
                  </div>
                ))}

                <button className="text-sm text-[#8D8D8D]" onClick={goToAdd}>
                  {t[language].NewADD} +
                </button>
              </div>

              {/* Billing History */}
              <div className="max-w-6xl mx-auto mb-5 pb-5">
                <div className="bg-white rounded-lg pt-5 m-3 md:m-5 shadow-lg">
                  <div className="flex justify-between top">
                    <h1>{t[language].Billing} </h1>
                    <button
                      className={`${
                        language === "en" ? "ml-auto" : "mr-auto"
                      } btn-export flex flex-row mb-2`}
                    >
                      {t[language].Export}{" "}
                      <img src={exportImg} alt="Export" className="mx-1" />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    {" "}
                    {/* Add overflow-x-auto here */}
                    <table className="min-w-full leading-normal overflow-x-auto">
                      <thead>
                        <tr>
                          <th>{t[language].Status}</th>
                          <th>{t[language].Invioce}</th>
                          <th>{t[language].Date}</th>
                          <th>{t[language].Amount}</th>
                          <th>{t[language].Pay}</th>
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
                            <td className="py-3">
                              {bill.amount_total.toFixed(3)}
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  navigate(`/payment/${bill.bill_id}`);
                                }}
                                className="p-1 rounded"
                                style={{
                                  borderColor: "#27AE60",
                                  color: "#27AE60",
                                }}
                              >
                                {t[language].Upload}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>{" "}
                  {/* Close the overflow container here */}
                </div>
              </div>
            </div>
            <div className="max-w-6xl mx-auto mb-5 pb-5">
              <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg p-5 m-5 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-row p-2">
                      <div className="text-lg font-semibold p-2">
                        {t[language].Enable}
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
                    {t[language].Renew_Desc}
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
          <Footer />
        </>
      )}
    </>
  );
};

export default Profile;
