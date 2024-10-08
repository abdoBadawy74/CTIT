import { useState } from "react";
import "./Contact.css";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";

const ContactComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // translate
  const { language } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, email, message });
  };

  return (
    <div
      id="contactSection"
      className="mb-5 px-4 lg:px-16 flex gap-3 flex-col lg:flex-row"
    >
      <div className="bg-[#0081FE] px-11 flex justify-center flex-col lg:mt-24 py-10 lg:py-36 rounded-3xl custom-bg w-full">
        <h1
          className={`uppercase text-2xl md:text-4xl  ${
            language === "en" ? "text-white" : " text-white md:text-black"
          }  pb-4`}
        >
          {t[language].Contact}
        </h1>
        <p
          className={`${
            language === "en" ? "text-white" : "text-white md:text-black"
          } max-w-[557px] lg:text-lg text-base`}
        >
          {t[language].Contact_desc}
        </p>
      </div>

      <div
        className={`flex h-fit flex-col ${
          language === "en" ? "right-48" : "left-48"
        }  items-start shadow-lg bg-[#eff6ff] rounded-lg p-7 justify-between md:block lg:absolute z-20`}
      >
        <form onSubmit={handleSubmit} className="p-2 w-full h-full">
          <div className="mt-5">
            <input
              type="text"
              className="w-full p-inputtext p-component p-element"
              placeholder={t[language].Name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <input
              type="email"
              className="w-full p-inputtext p-component p-element"
              placeholder={t[language].Email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <textarea
              placeholder={t[language].Message}
              className="p-inputtext p-component p-element h-[200px] resize-none"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="mt-2 lg:w-[428px]">
            <button
              type="submit"
              className="rounded-lg py-3 px-10 bg-blue-500 text-white"
            >
              {t[language].Send}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactComponent;
