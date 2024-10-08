import React, { useEffect, useState } from "react";
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";
import QRCode from "../../assets/qr-code-img.png";
import { Link } from "react-router-dom";
import PDF from "../../assets/pdf_icon.svg";
import axios from "axios";
import {
  CHEK_PROMO_CODE,
  PAYMENT,
  PROFILE,
  SET_PROMO_CODE,
} from "../../Api/Api";
import { toast, ToastContainer } from "react-toastify";
import { set } from "react-hook-form";

export default function Payment() {
  const { language } = useLanguage();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("upload");
  const [filePreview, setFilePreview] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // Track the actual file
  const [bill_id, setBill_id] = useState(null);

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const onFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const reader = new FileReader();
      setSelectedFile(file); // Store the actual file for submission

      if (fileExtension === "pdf") {
        setFileType("pdf");
        setFilePreview(URL.createObjectURL(file));
      } else if (["png", "jpg", "jpeg", "gif"].includes(fileExtension)) {
        setFileType("image");
        reader.onload = () => {
          setFilePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Unsupported file type! Please select an image or a PDF.");
        setFilePreview(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setFilePreview(null);
    setFileType(null);
    setSelectedFile(null); // Clear the file
  };

  // get profile data to get bill_id for pre_subscription_id
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await axios.post(`${PROFILE}`, {
          params: {
            email: localStorage.getItem("LoginEmail"),
          },
        });
        // console.log("Profile data:", response.data);
        setBill_id(response.data?.result.billing_history[0]?.bill_id);
        // console.log(bill_id);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    getProfileData();
  }, [bill_id]);

  // Handle form submission (upload method)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append("pre_subscription_id", 5); // static value
    formData.append("attachment", selectedFile || ""); // include file if present

    if (selectedFile) {
      try {
        const response = await axios.post(`${PAYMENT}`, {
          params: {
            pre_subscription_id: bill_id, // static value
            attachment: selectedFile, // send attachment if file selected
          },
        });

        // Handle response (success)
        // console.log("Form submitted successfully:", response.data);
        if (response.data.result.success === true) {
          toast.success("Process completed successfully! ,redirecting...");
          setTimeout(() => {
            window.location.href = "/profile";
          }, 1500);
        } else {
          toast.error("Error submitting form!");
        }
      } catch (error) {
        // Handle error
        console.error("Error submitting form:", error);
      }
    } else {
      toast.error("Please select a file to upload!");
    }
  };

  // promo code
  const [promoCode, setPromoCode] = useState("");
  const [checked, setChecked] = useState(false);

  const handlePromoCode = () => {
    if (!checked) {
      try {
        axios
          .post(`${CHEK_PROMO_CODE}`, {
            params: {
              code: promoCode,
            },
          })
          .then((response) => {
            console.log(response);
            setPromoCode("");
            if (response.data.result.valid === true) {
              setChecked(true);
              toast.success("Promo code applied successfully!");
            } else {
              setChecked(false);
              toast.error("Invalid promo code!");
            }
          });
      } catch (error) {
        setPromoCode("");
        console.error("Error applying promo code:", error);
      }
    } else {
      try {
        axios
          .post(`${SET_PROMO_CODE}`, {
            params: {
              pre_subscription_id: bill_id,
              code: promoCode,
            },
          })
          .then((response) => {
            console.log(response);
            setPromoCode("");
            if (response.data.result.valid === true) {
              setChecked(true);
              toast.success("Promo code applied successfully!");
            } else {
              setChecked(false);
              toast.error("Invalid promo code!");
            }
          });
      } catch (error) {
        setPromoCode("");
        console.error("Error applying promo code:", error);
      }
    }
  };

  // return statement of the component
  return (
    <div className="bg-[#F8F9F9] pt-15 pb-15 payment">
      <ToastContainer />
      <div className="flex items-center justify-center lg:justify-between mb-8 px-20 pt-5 gap-5 flex-wrap-reverse">
        <form
          className="flex self-start gap-5 flex-col"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-1 md:gap-3 justify-center sm:justify-start">
            <div className="flex items-center">
              {" "}
              <input
                type="radio"
                id="upload"
                value="upload"
                checked={selectedPaymentMethod === "upload"}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="upload" className="ml-2">
                {t[language].Upload}
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="online"
                value="online"
                checked={selectedPaymentMethod === "online"}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="online" className="ml-2">
                {t[language].Online}
              </label>
            </div>
            {!localStorage.getItem("LoginEmail") && (
              <Link
                to="/login"
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base"
              >
                {t[language].Back}
              </Link>
            )}
          </div>

          {/* Conditionally render content based on the selected payment method */}
          {selectedPaymentMethod === "upload" ? (
            <>
              {/* Conditionally render the label or file preview */}
              {filePreview ? (
                <div className="flex flex-col w-[350px] md:w-[450px] h-[300px] items-center justify-center">
                  {fileType === "image" ? (
                    <img
                      src={filePreview}
                      alt="Selected"
                      className="h-[250px] w-50 object-cover mt-10 rounded"
                    />
                  ) : (
                    <a
                      href={filePreview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      <img src={PDF} alt="PDF" className="w-20 h-20" />
                      Preview PDF
                    </a>
                  )}
                  <button
                    onClick={handleRemoveFile}
                    className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="dropzone-file"
                  className="relative flex flex-col items-center justify-center w-[350px] md:w-[450px] h-[300px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">{t[language].Click}</span>{" "}
                      {t[language].Or}
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={onFileInputChange}
                  />
                </label>
              )}

              {/* Confirm Button */}
              <button
                type="submit"
                className="mt-4 bg-blue-500 w-full text-white py-2 px-4 rounded self-center"
              >
                {t[language].Confirm}
              </button>
            </>
          ) : (
            <>
              {/* Online Payment Section */}
              <div className="flex flex-col items-center">
                <p className="w-80 h-40 mb-4 text-center text-[20px] pt-10">
                  Will Avialable Soon...
                </p>
                {/* Add your online payment form or buttons here */}
                {/* <button className="mt-4 bg-blue-500 w-full text-white py-2 px-4 rounded">
                  {t[language].Online}
                </button> */}
              </div>
            </>
          )}
        </form>

        {/* Promo Code Section */}
        <div className="w-[300px] flex flex-col gap-5 mx-auto">
          <div className="w-full max-w-md">
            <div className="mb-4">
              <p className="text-gray-500">
                {t[language].Promo}{" "}
                <span className="text-gray-400">{t[language].NoDiscount}</span>
              </p>
            </div>
            <div className="flex border border-gray-300 rounded-md w-full p-2">
              <input
                placeholder={
                  language === "en" ? "Enter Promo Code" : "أدخل كود الخصم"
                }
                className="p-2 outline-none"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                type="button"
                onClick={handlePromoCode}
                className="mt-2 bg-gray-800 w-full text-white py-2 px-4 rounded"
              >
                {checked ? t[language].Apply : t[language].Check}
              </button>
            </div>
          </div>
          <h2 className="font-semibold">{t[language].Summary}</h2>
          <div className="text-[#8D8D8D] border-b-2 border border-[#DCDCDC] border-t-0 border-e-0 border-s-0 pb-5">
            <p className="flex justify-between">
              <span>{t[language].Subtotal}</span>
              <span>500 $</span>
            </p>
            <p className="flex justify-between">
              <span>{t[language].Discount}</span>
              <span>- 0 $</span>
            </p>
          </div>
          <p className="flex justify-between">
            <span className="text-[#303B49]">{t[language].Total}</span>
            <span className="text-[#303B49]">500 $</span>
          </p>
        </div>
      </div>
    </div>
  );
}
