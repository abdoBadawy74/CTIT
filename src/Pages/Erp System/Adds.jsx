import { useEffect, useState } from "react";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";

export default function Adds({ adds, setFlag, setAddsSelected }) {
  // translate
  const { language } = useLanguage();

  //   Adds
  const [selectedAdds, setSelectedAdds] = useState([]); // Array to hold selected cards with quantity and other details

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


  useEffect(() => {
    setAddsSelected(selectedAdds);
    setFlag(true);
  }, [selectedAdds,]);


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
    <div>
      <ToastContainer />
      <div className="flex items-center flex-col mb-8 text-center">
        <h1 className="text-2xl mb-5 font-medium">
          {t[language].Add_head}{" "}
          <span className="text-[#0081FE]">{t[language].Not_required}</span>
        </h1>
        <p className="text-[#8D8D8D] text-base">{t[language].Add_desc}</p>
      </div>

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
  );
}
Adds.propTypes = {
  adds: PropTypes.array,
  setFlag: PropTypes.func,
};
