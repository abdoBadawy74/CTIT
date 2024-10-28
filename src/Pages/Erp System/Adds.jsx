import { useEffect, useState } from "react";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";
import PropTypes from "prop-types";

export default function Adds({ adds, setFlag }) {
  // translate
  const { language } = useLanguage();

  //   Adds
  const [selectedAddId, setSelectedAddId] = useState(null);

  const toggleSelectionAdd = (cardId) => {
    setSelectedAddId(cardId === selectedAddId ? null : cardId);
  };

  useEffect(() => {
    setFlag(true);
  }, [selectedAddId]);

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
      <div className="flex items-center flex-col mb-8 text-center">
        <h1 className="text-2xl mb-5 font-medium">
          {t[language].Add_head}{" "}
          <span className="text-[#0081FE]">{t[language].Not_required}</span>
        </h1>
        <p className="text-[#8D8D8D] text-base">{t[language].Add_desc}</p>
      </div>

      <div className="pb-10 px-5 gap-10 flex justify-center flex-wrap mx-auto">
        {adds.map((add) => (
          <div
            key={add.id}
            className={`card-add bg-white flex flex-col gap-5 border border-[#DCDCDC] rounded-lg py-5 px-7 w-[350px] ${
              selectedAddId === add.id ? "selected-card" : ""
            }`}
          >
            <div className="title flex flex-col justify-center items-center">
              <h2 className="py-2">{add.name}</h2>
              <p className="text-[#0081FE] font-medium">
                {add.price} {add.currency}
                <span className="text-xs text-[#8D8D8D]"> / monthly</span>
              </p>
            </div>
            <div className="flex items-start gap-2">

              {renderDescriptionWithIcons(add.description)}
            </div>
            <button
              className={`rounded-xl mt-7 py-3 px-2 min-w-36 text-white ${
                selectedAddId === add.id ? "bg-[#002b54]" : "bg-blue-500"
              }`}
              onClick={() => toggleSelectionAdd(add.id)}
            >
              {selectedAddId === add.id
                ? t[language].Selected
                : t[language].Select}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
Adds.propTypes = {
  adds: PropTypes.array,
  setFlag: PropTypes.func,
};
