import React, { useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/image-2.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Wrap the asynchronous task inside startTransition
    startTransition(() => {
      axios
        .post("https://aldaifii.ctit.com.sa/saas/partner_login", {
          params: {
            email: formData.email,
            password: formData.password,
          },
        })
        .then((response) => {
          if (response.data.login) {
            toast.success("Login successful");
            localStorage.setItem("LoginEmail", JSON.stringify(formData.email));
            navigate("/profile");
          } else {
            toast.error(response.data.msg);
          }
        })
        .catch((error) => {
          console.error("Error during login:", error);
          toast.error("Login failed");
        });
    });
  };

  const handleForgetPassword = () => {
    if (!formData.email) {
      toast.info("Please enter your email");
      return;
    }

    axios
      .post("https://aldaifii.ctit.com.sa/saas/forget_password", {
        params: {
          email: formData.email,
        },
      })
      .then((response) => {
        if (response.data.sent) {
          toast.success(response.data.msg);
        } else {
          toast.error(response.data.msg);
        }
      })
      .catch((error) => {
        console.error("Error during password reset:", error);
        toast.error("Password reset failed");
      });
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="mr-2" src={logo} alt="logo" style={{ width: 300 }} />
        </a>
        <div className="w-full rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-4">
              Welcome Back!
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="flex items-center justify-end">
                <a
                  className="text-sm font-medium text-blue-600 dark:text-primary-500 cursor-pointer"
                  onClick={handleForgetPassword}
                >
                  Forgot password?
                </a>
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/landing"
                  className="font-medium text-blue-600 hover:underline dark:text-primary-500 cursor-pointer"
                >
                  {" "}Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
