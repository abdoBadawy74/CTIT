import { useState, startTransition, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/image-2.png";
import useLanguage from "../../Context/useLanguage";
import t from "../../translation/translation";
import { FORGET_PASSWORD, LOGIN } from "../../Api/Api";

const Login = () => {
  // translate
  const { language, setLanguage } = useLanguage();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
    startTransition(() => {
      axios
        .post(`${LOGIN}`, {
          params: {
            email: formData.email,
            password: formData.password,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.result.login) {
            toast.success(
              language === "en"
                ? "Login successfully, redirecting to profile"
                : "تم تسجيل الدخول بنجاح ، يتم إعادة توجيهك إلى الملف الشخصي"
            );
            localStorage.setItem("LoginEmail", JSON.stringify(formData.email));
            setTimeout(() => {
              navigate("/profile");
            }, 2000);
          } else {
            toast.error(response.data.result.msg);
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);
          toast.error(language === "en" ? "Login failed" : "فشل تسجيل الدخول");
        });
    });
    if (formData.email === " " || formData.password === " ") {
      toast.error(
        language === "en"
          ? "Please enter your email and password"
          : "الرجاء إدخال بريدك الإلكتروني وكلمة المرور"
      );
    }
  };

  const handleForgetPassword = () => {
    setIsPopupOpen(true);
  };

  // Forgot password functionality

  const handleSendForgotPassword = () => {
    if (!forgotEmail) {
      toast.info(language === "en" ? "Please enter your email" : "الرجاء إدخال بريدك الإلكتروني");
      return;
    }

    axios
      .post(`${FORGET_PASSWORD}`, {
        params: {
          email: forgotEmail,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.result.sent) {
          toast.success(language === "en" ? "Please Check Your Email To Get Your New Password Code" : "يرجى التحقق من بريدك الإلكتروني للحصول على رمز كلمة المرور الجديد");
          setIsPopupOpen(false); // Close popup after successful response
          setForgotEmail(""); // Clear the email field
        } else {
          toast.error(language === "en" ? "Password reset failed" : "فشل إعادة تعيين كلمة المرور");
        }
      })
      .catch((error) => {
        console.error("Error during password reset:", error);
        toast.error(language === "en" ? "Password reset failed" : "فشل إعادة تعيين كلمة المرور");
      });
  };

  // translate language
  useEffect(() => {
    setLanguage(localStorage.getItem("language"));
  }, []);

  return (
    <section className="bg-gray-50">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="mr-2" src={logo} alt="logo" style={{ width: 300 }} />
        </a>
        <div className="w-full rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl mb-4">
              {t[language].WelcomeBack}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  {t[language]?.Email}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-white border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  {t[language]?.Password}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-0 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex items-center justify-end">
                <a
                  className="text-sm font-medium text-blue-600 dark:text-primary-500 cursor-pointer"
                  onClick={handleForgetPassword}
                >
                  {t[language]?.ForgetPassword}
                </a>
              </div>
              <button
                type="submit"
                className="block text-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
              >
                {t[language]?.Login}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {t[language]?.NoAccount}{" "}
                <Link
                  to="/landing"
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500 cursor-pointer"
                >
                  {" "}
                  {t[language]?.SignUP}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Popup for forget password */}
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-center text-lg font-bold mb-4">
              Forgot Password
            </h2>
            <div className="mb-4">
              <label htmlFor="forgotEmail" className="block text-gray-700">
                Email Address:
              </label>
              <input
                type="email"
                id="forgotEmail"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setIsPopupOpen(false);
                  setForgotEmail("");
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSendForgotPassword}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                change password
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
