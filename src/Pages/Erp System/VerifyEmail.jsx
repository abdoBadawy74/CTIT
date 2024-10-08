import { useState, useEffect, useRef } from "react";
import "./ErpSystem.css";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";
import VerifyEmailImg from "../../assets/Mail.png";
import axios from "axios";
import { VERIFY_EMAIL } from "../../Api/Api";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();
  // translate
  const { language } = useLanguage();
  //   verify email
  //   const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef([]);
  //   Verify Email

  const handleInputChange = (index, event) => {
    const value = event.target.value;

    // Move focus to the next input field if a character is typed
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // remove double quotes from email
    const email = localStorage.getItem("email").replace(/['"]+/g, "");
    console.log(email);
    axios
      .post(
        `${VERIFY_EMAIL}`,
        {
          params: {
            email: email,
            code: inputRefs.current.map((el) => el.value).join(""),
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.result.verified) {
          toast.success(language === "en" ? "Email verified successfully, redirecting to profile" : "تم التحقق من البريد الإلكتروني بنجاح ، يتم إعادة توجيهك إلى الملف الشخصي");
          setTimeout(()=>{
            navigate("/profile")
          },1000)
        } else {
          toast.error(language === "en" ? "Wrong or expired code entered, back to register again" : "تم إدخال رمز خاطئ أو منتهي الصلاحية ، عد إلى التسجيل مرة أخرى");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div className="lg:ml-60 sm:mb-4 mx-auto mt-28 flex flex-col lg:flex-row justify-between items-center verify">
      <ToastContainer />
      <div>
        <div className="flex flex-col gap-3">
          <h1 className="text-xl">{t[language].VerifyEmail}</h1>
          <p className="text-[#8D8D8D] text-sm">
            {t[language].check}{" "}
            <span className="text-[#002B54]">{/* email variable */}</span>
          </p>
        </div>
        <form className="max-w-[426px]" onSubmit={handleSubmit}>
          <div className="flex  items-center my-12 gap-6" >
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <label htmlFor={`code-${index + 1}`} className="sr-only">
                  {`${index + 1} code`}
                </label>
                <input
                  type="text"
                  maxLength="1"
                  id={`code-${index + 1}`}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="block font-semibold w-20 h-20 text-2xl text-center text-gray-900 bg-[#ebf0f3] rounded-lg focus:ring-0 outline-0 border-0"
                  required
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center py-4 rounded-lg text-white bg-[#002B54]"
          >
            {t[language].Verify}
          </button>

          <p
            id="helper-text-explanation"
            className="text-center mt-8 text-gray-500 text-sm"
          >
            {t[language].DontRecieve}{" "}
            <span className="text-[#0081FE]">
              {t[language].SendAgain}
              {/* {countdown > 0 ? `${countdown} seconds` : ""} */}
            </span>
          </p>
        </form>
      </div>
      <div className="mr-56 hidden lg:block">
        <img src={VerifyEmailImg} alt="Verify email" className="w-[350px]" />
      </div>
    </div>
  );
}

VerifyEmail.propTypes = {
  setFlag: PropTypes.func.isRequired,
};
