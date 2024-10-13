import { useEffect, useState } from "react";
import Header from "../../Components/Header";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";
import axios from "axios";
import { ERP_PACKGAES } from "../../Api/Api";
import Payment from "../Erp System/Payment";
import { BeatLoader } from "react-spinners";

export default function Adds() {
  // translate
  const { language } = useLanguage();
  // states
  const [activeIndex, setActiveIndex] = useState(0); // Step control
  const [selectedAddId, setSelectedAddId] = useState(null);

  //   move to the next step
  const goToTheNext = () => {
    setActiveIndex(activeIndex + 1);
  };

  const [adds, setAdds] = useState();
  //  get package cards
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

  const toggleSelectionAdd = (cardId) => {
    setSelectedAddId(cardId === selectedAddId ? null : cardId);
  };

  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(0, prev + delta));
  };

  return (
    <>
      {adds ? (
        <>
          <Header />
          {/* Navigation buttons */}
          <div
            className="flex px-20 flex-wrap mb-10"
            style={{
              justifyContent: activeIndex == 0 ? "space-between" : "flex-end",
            }}
          >
            <div className="pl-7">
              <h4 className="font-medium">{t[language].Adds}</h4>
              <p className="text-[#8D8D8D] text-sm">
                {t[language].NewAdds_desc}
              </p>
            </div>
            <button
              className={`px-24 py-5 my-10 lg:my-0 text-lg rounded-lg focus:outline-none transition-all bg-[#0081FE] text-white ${
                selectedAddId && activeIndex === 0 ? "opacity-100" : "opacity-0"
              }`}
              onClick={goToTheNext}
              disabled={!selectedAddId}
            >
              Next
            </button>
          </div>

          {/* End of Steps  */}

          {/* Step content */}
          <div className="step-content">
            {/* Start Adds  */}
            {activeIndex === 0 && (
              <div>
                <div className="pb-10 px-5 gap-10 flex justify-center flex-wrap mx-auto">
                  {adds.map((card) => (
                    <div
                      key={card.id}
                      className={`card-add bg-white flex flex-col gap-5 border border-[#DCDCDC] rounded-lg py-5 px-7 w-[300px] justify-between ${
                        selectedAddId === card.id ? "selected-card" : ""
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
                        <i
                          className="pi pi-check-circle"
                          style={{ color: "#0081fe" }}
                        ></i>
                        <p className="text-[#002B54] font-semibold text-sm">
                          {card.description}
                        </p>
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
                          onClick={() => handleQuantityChange(1)}
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
                          id="numberofadults"
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
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity === 1}
                          style={{
                            border: "none",
                            background: quantity === 1 ? "#D9D9D9" : "#0081FE",
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
                        className={`rounded-xl mt-7 py-3 px-2 min-w-36 text-white ${
                          selectedAddId === card.id
                            ? "bg-[#002b54]"
                            : "bg-blue-500"
                        }`}
                        onClick={() => toggleSelectionAdd(card.id)}
                      >
                        {selectedAddId === card.id
                          ? t[language].Selected
                          : t[language].Select}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* End Adds */}

            {/* Payment */}
            {activeIndex === 1 && <Payment />}
          </div>
        </>
      ) : (
        <BeatLoader className="text-center mt-60" color="#0081FE" size={50} />
      )}
    </>
  );
}
