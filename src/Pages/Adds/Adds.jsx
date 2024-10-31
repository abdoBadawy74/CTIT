import { useEffect, useState } from "react";
import Header from "../../Components/Header";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";
import axios from "axios";
import { ERP_PACKGAES } from "../../Api/Api";
import Payment from "../Erp System/Payment";
import { BeatLoader } from "react-spinners";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Adds() {
  // translate
  const { language } = useLanguage();
  // states
  const [activeIndex, setActiveIndex] = useState(0); // Step control
  const [selectedAdds, setSelectedAdds] = useState([]); // Array to hold selected cards with quantity and other details
  const [adds, setAdds] = useState();
  const location = useLocation();
  console.log(location.state);

  // move to the next step
  const goToTheNext = () => {
    setActiveIndex(activeIndex + 1);
  };
  const goToTheBack = () => {
    setActiveIndex(activeIndex - 1);
  };

  // Fetch package cards on component mount
  useEffect(() => {
    axios
      .post(`${ERP_PACKGAES}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setAdds(res.data.result.additional);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to toggle card selection
  const toggleSelectionAdd = (card) => {
    // Check if card is already selected
    const isSelected = selectedAdds.some((add) => add.id === card.id);

    if (isSelected) {
      // Remove the card from selectedAdds if it is already selected
      setSelectedAdds((prev) => prev.filter((add) => add.id !== card.id));
    } else {
      // Add the card to selectedAdds if it is not selected
      setSelectedAdds((prev) => [
        ...prev,
        { id: card.id, discount: card.discount, quantity: 1 }, // Initialize with quantity 1
      ]);
    }
  };

  // Function to handle quantity change for a specific card
  const handleQuantityChange = (cardId, delta) => {
    if (selectedAdds.length === 0) {
      toast.error(language === "en" ? "Please select add first !" : "الرجاء اختيار الاضافة أولاً");
    }
    setSelectedAdds((prev) =>
      prev.map((add) =>
        add.id === cardId
          ? { ...add, quantity: Math.max(1, add.quantity + delta) } // Ensure quantity is at least 1
          : add
      )
    );
  };

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
    <>
      {adds ? (
        <>
          <Header />
          <ToastContainer />
          {/* Navigation buttons */}
          <div
            className="px-20 mb-10"

          >
            <div className="">
              <h4 className="font-medium">{t[language].Adds}</h4>
              <p className="text-[#8D8D8D] text-sm">
                {t[language].NewAdds_desc}
              </p>
            </div>
            <div className={`my-3 flex ${activeIndex === 0 ? "justify-end" : "justify-start"} `}>
              <button
                className={`px-24 py-5 my-10 lg:my-0 text-lg rounded-lg focus:outline-none transition-all bg-[#0081FE] text-white ${selectedAdds.length > 0 && activeIndex !== 0
                  ? "opacity-100"
                  : "hidden"
                  }`}
                onClick={goToTheBack}
                disabled={activeIndex === 0}
              >
                Previous
              </button>
              <button
                className={`px-24 py-5 my-10 lg:my-0 text-lg rounded-lg focus:outline-none transition-all bg-[#0081FE] text-white ${selectedAdds.length > 0 && activeIndex === 0
                  ? "opacity-100"
                  : "opacity-0"
                  }`}
                onClick={goToTheNext}
                disabled={selectedAdds.length === 0}
              >
                Next
              </button>
            </div>
          </div>

          {/* Step content */}
          <div className="step-content">
            {/* Start Adds */}
            {activeIndex === 0 && (
              <div>
                <div className="pb-10 px-5 gap-10 flex justify-center flex-wrap mx-auto">
                  {adds.map((card) => {
                    // Check if the current card is selected
                    const isSelected = selectedAdds.some(
                      (add) => add.id === card.id
                    );
                    // Get current quantity for this card if selected
                    const selectedCard = selectedAdds.find(
                      (add) => add.id === card.id
                    );
                    const quantity = selectedCard ? selectedCard.quantity : 1;

                    return (
                      <div
                        key={card.id}
                        className={`card-add bg-white flex flex-col gap-5 border border-[#DCDCDC] rounded-lg py-5 px-7 w-[300px] justify-between ${isSelected ? "selected-card" : ""
                          }`}
                      >
                        <div className="title flex flex-col justify-center items-center">
                          <h2 className="py-2">{card.name}</h2>
                          <p className="text-[#0081FE] font-medium">
                            {card.price} {card.currency}
                            <span className="text-xs text-[#8D8D8D]">
                              {" "}
                              / monthly
                            </span>
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          {renderDescriptionWithIcons(card.description)}
                        </div>
                        {card.description2 && (
                          <div className="flex items-start gap-2">
                            <i
                              className="pi pi-check-circle"
                              style={{ color: "#0081fe" }}
                            ></i>
                            <p className="text-[#002B54] font-semibold text-sm">
                              {card.description}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-center mt-5">
                          <button
                            onClick={() => handleQuantityChange(card.id, 1)}
                            style={{
                              border: "none",
                              background: "#0081FE",
                              width: "20px",
                              height: "20px",
                              color: "white",
                              borderRadius: "5px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            +
                          </button>

                          <input
                            type="number"
                            value={quantity}
                            min={1}
                            readOnly
                            style={{
                              width: "50px",
                              paddingLeft: "10px",
                              textAlign: "center",
                              border: "none",
                              background: "transparent",
                              outline: "none",
                            }}
                          />
                          <button
                            onClick={() => handleQuantityChange(card.id, -1)}
                            disabled={quantity === 1}
                            style={{
                              border: "none",
                              background:
                                quantity === 1 ? "#D9D9D9" : "#0081FE",
                              width: "20px",
                              height: "20px",
                              color: "white",
                              borderRadius: "5px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            -
                          </button>
                        </div>

                        <button
                          className={`rounded-xl mt-7 py-3 px-2 min-w-36 text-white ${isSelected ? "bg-[#002b54]" : "bg-blue-500"
                            }`}
                          onClick={() => toggleSelectionAdd(card)}
                        >
                          {isSelected ? t[language].Selected : t[language].Select}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/* End Adds */}

            {/* Payment */}
            {activeIndex === 1 && <Payment type={location.state.type} addsSelected={selectedAdds} />}
          </div>
        </>
      ) : (
        <BeatLoader className="text-center mt-60" color="#0081FE" size={50} />
      )}
    </>
  );
}
