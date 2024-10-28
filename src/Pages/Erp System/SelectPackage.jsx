import { useState, useEffect, useContext } from "react";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";
import axios from "axios";
import { SUBSCRIPTIONS, ERP_PACKGAES } from "../../Api/Api";
import "./ErpSystem.css";
import PropTypes from "prop-types";
import { BeatLoader } from "react-spinners";
import { Countries } from "../../Context/CountryContext";
import packageIcon from "../../assets/packageSvg.svg";

export default function SelectPackage({
  setFlag,
  setAdds,
  setSelectedPackageId,
}) {
  // translate
  const { language, setLanguage } = useLanguage();
  //packages
  //  get countries from context
  const { countries } = useContext(Countries);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [packeges, setPackeges] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [searchTerm, setSearchTerm] = useState("");


  //  get language from local storage
  useEffect(() => {
    setLanguage(localStorage.getItem("language"));
  }, [setLanguage]);




  // Update filtered countries when search term changes
  useEffect(() => {
    setFilteredCountries(
      countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, countries]);

  //   get selected country
  useEffect(() => {
    countries.map((country) => {
      if (country.is_default === true) {
        setSelectedCountry(country);

      }
    });
  }, [countries]);

  //   select country from dropdown
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    onSelectedCountry(country);
    setIsOpen(false); // close dropdown after selection
  };
  const onSelectedCountry = (country) => {
    setSelectedCountry(country);
    localStorage.setItem("selected_country_id", country.id);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  // subscription plans
  useEffect(() => {
    axios
      .post(`${SUBSCRIPTIONS}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSubscriptionPlans(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //  get selected plan by default
  useEffect(() => {
    subscriptionPlans?.map((plan) => {
      if (plan.is_default) {
        setSelectedPlan(plan);
        setSelectedPlanIndex(plan.id);
      }
    });
  }, [subscriptionPlans]);

  //   select plan function
  const onSelectedPlan = (plan, index) => {
    setSelectedPlan(plan);
    setSelectedPlanIndex(index);
    console.log(selectedPlanIndex);
    localStorage.setItem("selected_plan_id", plan.id);
  };

  //  get package cards
  useEffect(() => {
    axios
      .post(`${ERP_PACKGAES}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        setPackeges(res.data.result.main);
        setAdds(res.data.result.additional);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSelectPackage = (card) => {
    setSelectedPackage(card);
    setSelectedPackageId(card.id);
    localStorage.setItem("selected_package_id", card.id);
    // console.log(selectedPackage);
  };

  if (selectedPackage && selectedPlan && selectedCountry) {
    setFlag(true);
  }

  //   return loading if data is not fetched
  if (loading) {
    return (
      <BeatLoader className="text-center mt-20" color="#0081FE" size={50} />
    );
  }


//  render description with icons
  const renderDescriptionWithIcons = (description) => {
    // Convert the HTML string to HTML elements
    const parser = new DOMParser();
    const doc = parser.parseFromString(description, "text/html");
    const paragraphs = Array.from(doc.body.childNodes);

    // Wrap each line with a check icon
    return (
      <div>
        {paragraphs.map((paragraph, index) => (
          <div key={index} className="flex items-center gap-2">
            <i className="pi pi-check-circle" style={{ color: "#0081FE" }}></i>
            <span dangerouslySetInnerHTML={{ __html: paragraph.outerHTML }} />
          </div>
        ))}
      </div>
    );
  };



  return (
    <div>
      <div>
        <div className="flex items-center flex-col mb-8 px-44 space-y-5 packages">
          <h1 className="text-2xl font-medium">{t[language].SelectPackage}</h1>
          <p className="text-[#8D8D8D] text-base">
            {t[language].SelectPackage_desc}
          </p>

          <div className="bg-[#F8F9F9] flex gap-5 p-1 rounded-xl w-full flex-wrap items-center justify-center">
            {/* dropdown menu for countries */}
            <div className="custom-dropdown">
              <div
                className="dropdown-header"
                onClick={() => setIsOpen(!isOpen)}
              >
                <img
                  src={`data:image/png;base64,${selectedCountry?.image}`}
                  alt={selectedCountry?.name}
                  style={{ width: "20px", height: "15px", marginRight: "10px" }}
                />
                <p>{selectedCountry?.code}</p>

                <i className={isOpen ? "pi pi-chevron-up" : "pi pi-chevron-down"}></i>
              </div>

              {/* Dropdown menu */}


              {isOpen && (
                <div className="dropdown-menu relative">
                  {/* Search input with icon */}
                  <div className="sticky bg-white border-b  top-0 flex items-center  px-2 py-2">
                    <input
                      type="text"
                      placeholder="Search country"
                      className="w-[90%] border-none outline-none text-sm"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                    {
                      searchTerm ? <i className="pi pi-times text-gray-400 cursor-pointer text-sm" onClick={() => setSearchTerm("")}></i> : <i className="pi pi-search text-gray-400 text-sm"></i>
                    }

                  </div>

                  {/* Filtered country list */}
                  {filteredCountries.map((country) => (
                    <div
                      key={country.id}
                      className="dropdown-item"
                      onClick={() => handleCountrySelect(country)}
                    >
                      <img
                        src={`data:image/png;base64,${country?.image}`}
                        alt={country?.name}
                        style={{ width: "20px", height: "15px", marginRight: "10px" }}
                      />
                      <p>{country?.code}</p>
                    </div>
                  ))}
                </div>
              )}


            </div>

            <div className="flex grow gap-7 items-center plans">
              {subscriptionPlans.map((plan, i) => (
                <div key={plan.id} className="grow">
                  <button
                    onClick={() => onSelectedPlan(plan, i)}
                    className={`text-[#8D8D8D] px-5 py-4 flex gap-4 justify-center items-center rounded-xl w-full ${selectedPlanIndex === i + 1 ? "bg-[#002B54] text-white" : ""
                      }`}
                  >
                    {plan.name}
                    <span
                      className={`p-2 rounded-lg ${selectedPlanIndex === i + 1
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

          <div className="pb-8 px-2 gap-10 grid  grid-cols1 xl:grid-cols-3 md:max-w-[500px] lg:max-w-[1165px] mx-auto">
            {packeges.map((card) => (
              <div
                key={card.id}
                style={{
                  backgroundColor:
                    selectedPackage === card ? "#f2f8ff" : "white",
                  borderColor: selectedPackage === card ? "#0081FE" : "#DCDCDC",
                }}
                className="cardPackage flex flex-col gap-5 border border-[#DCDCDC] rounded-lg py-5 px-7 max-w-[355px] "
              >
                <div className="title flex flex-col justify-center items-center">

                  <img src={packageIcon} alt="package" />

                  <h2 className="py-2">{card.name}</h2>
                  <p className="text-[#0081FE] font-medium">
                    {card.price} {card.currency}{" "}
                    <span className="text-xs text-[#8D8D8D]">/ monthly</span>
                  </p>
                </div>

                {renderDescriptionWithIcons(card.description)}

                <div className="flex justify-between gap-5">
                  <button
                    className={`text-white rounded-xl mt-7 py-3 px-2 min-w-36 ${selectedPackage === card ? "bg-[#002b54]" : "bg-blue-500"
                      }`}
                    onClick={() => onSelectPackage(card)}
                  >
                    {selectedPackage === card
                      ? t[language].Selected
                      : t[language].Select}
                  </button>
                  <button className="rounded-xl mt-7 py-3 px-2 bg-white text-blue-500 min-w-36 border border-[#0081FE]">
                    {t[language].MoreDetails}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
SelectPackage.propTypes = {
  setFlag: PropTypes.func,
  setAdds: PropTypes.func,
  setSelectedPackageId: PropTypes.func,
};
