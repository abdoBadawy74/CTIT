import { Password } from "primereact/password";
import { set, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import accountImg from "../../assets/account-image.svg";
// translate
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";
import PropTypes from "prop-types";
import axios from "axios";
import { REGISTER , CHEK_SUBDOMIAN } from "../../Api/Api";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css';


export default function CreateAccount({
  countriesNames,
  setFlag,
  SelectedPackageId,
}) {
  console.log(SelectedPackageId);
  // translate
  const { language } = useLanguage();

  //   create account
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [error, setError] = useState("");
  const [matchesErr, setMatchesErr] = useState("")
  const [note, setNote] = useState(false);
  const [subDomianNote, setSubDomianNote] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,

    formState: { errors },
  } = useForm({
    defaultValues: {
      partner_name: "",
      company_name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
      taxId: "",
      sub_domain: "",
      country_id: selectedCountryId,
      acceptPolicy: false,
      profile_img: null,
      subscription_type: "new",
      plan_id: 3,
      pre_subscription_line_ids: {
        product_id: SelectedPackageId,
        discount: "",
        quantity: "",
      },
    },
  });

  // Password validation function
  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /[0-9]/;
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      minLength.test(password) &&
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasNumber.test(password) &&
      hasSymbol.test(password)
    );
  };

  // function to handle image upload
  const onFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);

      setValue("profile_img", file);
    }
  };

  // function to reset image
  const resetImage = () => {
    setUploadedImageSrc(null);
    setValue("profile_img", null);
  };

  // function to check if all required fields are filled
  useEffect(() => {
    // show toast if any field required not write

    if (getValues("partner_name") && getValues("company_name") && getValues("email") && getValues("phone") && getValues("password") && getValues("confirm_password") && getValues("sub_domain") && getValues("acceptPolicy")) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }

    if (!getValues) {
      toast.error(language === "en" ? "Please fill all required fields" : "يرجى ملء جميع الحقول المطلوبة");
    }
  }, [getValues, language]);



  // function to check valid sub domain
  const checkSubDomain = (subDomain) => {
    axios.post(`${CHEK_SUBDOMIAN}/`, {
      params: {
        subdomain: subDomain
      }
    }).then((res) => {
      console.log(res);
      if (res.data.result.valid) {
        toast.success(language === "en" ? "Valid Sub Domain" : "نطاق فرعي صالح")
        setBtnDisabled(false)
      } else {
        toast.error(language === "en" ? "Invalid Sub Domain" : "نطاق فرعي غير صالح")
        toast.error(res.data.result.msg)

        setBtnDisabled(true)
      }

    }).catch((err) => {
      console.log(err);
    })
  }




  // function to submit the form
  const onSubmit = (formData) => {
    // Check if password is valid
    if (!validatePassword(formData.password)) {
      setError(
        language === "en"
          ? "Password must be at least 8 characters, with uppercase, lowercase, number, and symbol."
          : "يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل وتحتوي على أحرف كبيرة وصغيرة ورقم ورمز."
      );
      return; // Stop the submission if password is invalid
    }

    // Check if passwords match
    if (formData.password !== formData.confirm_password) {
      setMatchesErr("Passwords do not match")
      return; // Stop the submission if passwords don't match
    }


    // Ensure required fields are included and formatted
    const data = {
      ...formData,
      country_id: selectedCountryId || formData.country_id, // use selected country ID
      subscription_type: "new", // set default value if not selected
      plan_id: formData.plan_id || 3, // default plan ID
      pre_subscription_line_ids: [
        {
          product_id: SelectedPackageId, // hardcoded or dynamic product ID
          discount: 0,
          quantity: 1,
        },
      ],
    };

    if (!data.acceptPolicy) {
      toast.error(language === "en" ? "Please accept the terms and conditions" : "يرجى قبول الشروط والأحكام");
    } else {
      console.log("Submitting Data:", data);

      // Send data to the server
    //   axios
    //     .post(
    //       REGISTER, // Correct API endpoint
    //       { params: data }, // Send `data` directly as body, not inside `params`
    //       {
    //         headers: {
    //           "Content-Type": "application/json", // Correct header field
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       console.log("Response:", res);
    //       if (res.data.result.sent) {
    //         toast.success(language === "en" ? "Account created, Click next to verify your email" : "تم إنشاء الحساب ، انقر فوق التالي للتحقق من بريدك الإلكتروني");
    //         localStorage.setItem("email", JSON.stringify(data.email));
    //         setFlag(true);
    //       } else {
    //         toast.error(language === "en" ? "Error creating account" : "خطأ في إنشاء الحساب");
    //       }
    //     })
    //     .catch((err) => {
    //       console.error("Error:", err);
    //     });
    // }
  };





  return (
    <div className="grid grid-cols-3 mx-20 items-center xl:gap-12 account">
      <div className="flex flex-col col-span-2">
        <ToastContainer />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-14 mb-10 self-center">
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  {uploadedImageSrc ? (
                    <img
                      src={uploadedImageSrc}
                      {...register("profile_img")}
                      className="w-[200px] h-[200px] rounded-full  object-cover"
                      alt="Uploaded"
                    />
                  ) : (
                    <svg
                      className="w-[200px] h-[200px] object-cover rounded-3xl"
                      viewBox="0 0 120 120"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="120" height="120" rx="10" fill="#F3F5F5" />
                      <path
                        d="M60.0003 73.6572C64.7995 73.6572 68.69 69.7667 68.69 64.9675C68.69 60.1683 64.7995 56.2778 60.0003 56.2778C55.2011 56.2778 51.3105 60.1683 51.3105 64.9675C51.3105 69.7667 55.2011 73.6572 60.0003 73.6572Z"
                        fill="white"
                      />
                      <path
                        d="M86.0757 43.8643H77.9346C77.4133 43.8644 76.9052 43.7005 76.4823 43.3956C76.0594 43.0908 75.7432 42.6607 75.5785 42.1661L74.7939 39.8099C74.464 38.8212 73.8314 37.9614 72.9856 37.3523C72.1399 36.7432 71.1239 36.4156 70.0816 36.416H49.9288C48.8867 36.4163 47.871 36.7444 47.0257 37.354C46.1804 37.9636 45.5483 38.8237 45.219 39.8124L44.4344 42.1661C44.2697 42.6607 43.9535 43.0908 43.5306 43.3956C43.1077 43.7005 42.5996 43.8644 42.0783 43.8643H33.9372C32.6203 43.8643 31.3573 44.3874 30.4261 45.3187C29.4948 46.2499 28.9717 47.5129 28.9717 48.8298V78.6229C28.9717 79.9398 29.4948 81.2028 30.4261 82.134C31.3573 83.0652 32.6203 83.5884 33.9372 83.5884H86.0757C87.3926 83.5884 88.6556 83.0652 89.5868 82.134C90.5181 81.2028 91.0412 79.9398 91.0412 78.6229V48.8298C91.0412 47.5129 90.5181 46.2499 89.5868 45.3187C88.6556 44.3874 87.3926 43.8643 86.0757 43.8643ZM60.0065 78.6229C52.4787 78.6229 46.3512 72.4954 46.3512 64.9677C46.3512 57.44 52.4787 51.3126 60.0065 51.3126C67.5342 51.3126 73.6618 57.44 73.6618 64.9677C73.6618 72.4954 67.5342 78.6229 60.0065 78.6229ZM74.9031 53.7953C74.2447 53.7953 73.6132 53.5337 73.1476 53.0681C72.6819 52.6025 72.4204 51.971 72.4204 51.3126C72.4204 50.6541 72.6819 50.0226 73.1476 49.557C73.6132 49.0914 74.2447 48.8298 74.9031 48.8298C75.5616 48.8298 76.1931 49.0914 76.6587 49.557C77.1244 50.0226 77.3859 50.6541 77.3859 51.3126C77.3859 51.971 77.1244 52.6025 76.6587 53.0681C76.1931 53.5337 75.5616 53.7953 74.9031 53.7953Z"
                        fill="white"
                      />
                      <path
                        d="M37.6601 41.3817H32.6945C32.3653 41.3817 32.0495 41.2509 31.8167 41.0181C31.5839 40.7853 31.4531 40.4695 31.4531 40.1403C31.4531 39.8111 31.5839 39.4953 31.8167 39.2625C32.0495 39.0297 32.3653 38.8989 32.6945 38.8989H37.6601C37.9893 38.8989 38.3051 39.0297 38.5379 39.2625C38.7707 39.4953 38.9015 39.8111 38.9015 40.1403C38.9015 40.4695 38.7707 40.7853 38.5379 41.0181C38.3051 41.2509 37.9893 41.3817 37.6601 41.3817Z"
                        fill="white"
                      />
                    </svg>
                  )}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={onFileInputChange}
                />
              </label>
              <div className="flex flex-col mx-6 space-y-3">
                <i
                  onClick={resetImage}
                  className="pi pi-trash self-start text-red-600 border-red-600 p-2 border rounded-lg cursor-pointer"
                  style={{ fontSize: "1rem" }}
                ></i>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 mb-20 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[#8D8D8D]">
                {t[language].Name}
                <span className="text-red-600">*</span>
              </label>
              <input
                {...register("partner_name", { required: true })}
                type="text"
                className="py-3 px-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t[language].Name}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#8D8D8D]">
                {t[language].CompanyName}
                <span className="text-red-600">*</span>
              </label>
              <input
                {...register("company_name", { required: true })}
                type="text"
                className="py-3 px-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t[language].CompanyName}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#8D8D8D]">
                {t[language].Email}
                <span className="text-red-600">*</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="py-3 px-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t[language].Email}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#8D8D8D]">
                {t[language].PhoneNumber}
                <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <PhoneInput
                  placeholder={t[language].Phone}
                  {...register("phone", { required: true })}
                  className="flex items-center py-3 px-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultCountry="SA"
                  international
                  value={selectedCountry}
                  onChange={(value) => {
                    setValue("phone", value);
                    setSelectedCountryId(value);
                  }}
                  limitMaxLength={true}
                />
              </div>

            </div>

            <div className="flex flex-col gap-2 input-container relative">
              <i className="pi pi-exclamation-circle text-gray-500 text-sm cursor-pointer absolute top-2 right-2"
                onClick={() => {
                  setNote(true)
                  setTimeout(() => {
                    setNote(false)
                  }, 1000);
                }}
              ></i>
              {
                note &&
                <span className="text-sm text-blue-500 absolute right-7 top-1">
                  {t[language].PasswordNote}
                </span>}
              <label className="text-[#8D8D8D]">
                {t[language].Password}
                <span className="text-red-600">*</span>
              </label>
              <Password
                feedback={false}
                onChange={(e) => setValue("password", e.target.value)}
                placeholder={t[language].Password}
                className={`${language === "ar" ? "ar-pass" : ""}`}
                toggleMask
                required
              />
              {
                error && <span className="text-red-600 text-xs">
                  {error}
                </span>
              }

            </div>

            <div className="flex flex-col gap-2 input-container">
              <label className="text-[#8D8D8D]">
                {t[language].ConfirmPassword}
                <span className="text-red-600">*</span>
              </label>
              <Password
                feedback={false}
                onChange={(e) => setValue("confirm_password", e.target.value)}
                placeholder={t[language].ConfirmPassword}
                className={`${language === "ar" ? "ar-pass" : ""}`}
                toggleMask
              />
              {
                matchesErr && <span className="text-red-600 text-xs">
                  {matchesErr}
                </span>
              }
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[#8D8D8D]">
                {t[language].TaxId}
                {t[language].VAT}
              </label>
              <input
                {...register("taxId")}
                type="text"
                className="py-3 px-3 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tax Id"
              />
            </div>
            <div className="flex flex-col gap-2 relative">


              <i className="pi pi-exclamation-circle text-gray-500 text-sm cursor-pointer absolute top-2 right-2"
                onClick={() => {
                  setSubDomianNote(true)
                  setTimeout(() => {
                    setSubDomianNote(false)
                  }, 1000);
                }}
              ></i>
              {
                subDomianNote &&
                <span className="text-sm text-blue-500 absolute right-7 -top-2 w-[65%]">
                  {t[language].SubDomainNote}
                </span>}


              <label className="text-[#8D8D8D]">
                {t[language].SubDomain}
                <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  {...register("sub_domain", { required: true })}
                  type="text"
                  className="py-3 px-3 pr-32 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ex.user65"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-16 text-gray-500">
                  @ctit.com.sa
                </span>
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-md absolute right-1 top-1/2 transform -translate-y-1/2 transition"
                  onClick={() => checkSubDomain(getValues("sub_domain"))}
                >
                  check
                </button>
              </div>
            </div>
            <div className="p-6">
              <label className="flex item space-x-2">
                <input
                  type="checkbox"
                  {...register("acceptPolicy")}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700">{t[language].AcceptTerms}</span>
              </label>
            </div>
            <button
              type="submit"
              className={`py-3 px-6 rounded-md w-full text-white font-bold
                ${btnDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
                }
              `}
              disabled={btnDisabled}
            >
              {t[language].Submit}
            </button>
          </div>
        </form>
      </div>
      <div className="hidden lg:block">
        <img src={accountImg} alt="account photo" />
      </div>
    </div>
  );
}

CreateAccount.propTypes = {
  countriesNames: PropTypes.array.isRequired,
  setFlag: PropTypes.func.isRequired,
  SelectedPackageId: PropTypes.object.isRequired,
};
