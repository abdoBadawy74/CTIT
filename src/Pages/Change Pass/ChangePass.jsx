import { useState } from "react";
import Header from "../../Components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { CHANGE_PASSWORD } from "../../Api/Api";
import { useNavigate } from "react-router-dom";

export default function ChangePass() {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: localStorage.getItem("LoginEmail").replace(/['"]+/g, ""),
    old_password: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState({
    old_password: false,
    password: false,
    confirm_password: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  // Function to validate if new password and confirm password match
  const validatePasswords = () => {
    if (formData.password !== formData.confirm_password) {
      toast.error("New password and confirm password don't match!");
      return false;
    }
    return true;
  };

  // Function to send the data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;
    console.log(formData);

    axios
      .post(`${CHANGE_PASSWORD}`, {
        params: {
          email: formData.email,
          old_password: formData.old_password,
          password: formData.password,
          confirm_password: formData.confirm_password,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.result.password_set) {
          toast.success("Password changed successfully");
          setTimeout(() => {
            Navigate("/profile");
          }, 2000);
        } else {
          toast.error("Error changing password, please try again");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <div className="w-[100%] h-[85vh] flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
          <h2 className="text-center text-lg font-bold mb-4">
            Change Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="old_password"
                className="block text-[#8D8D8D] text-[14px]"
              >
                Old Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.old_password ? "text" : "password"}
                  id="old_password"
                  name="old_password"
                  value={formData.old_password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("old_password")}
                  className="absolute right-3 top-2 text-sm text-gray-600"
                >
                  {showPassword.old_password ? (
                    <span className="pi pi-eye-slash"></span>
                  ) : (
                    <span className="pi pi-eye"></span>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-[#8D8D8D] text-[14px]"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.password ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute right-3 top-2 text-sm text-gray-600"
                >
                  {showPassword.password ? (
                    <span className="pi pi-eye-slash"></span>
                  ) : (
                    <span className="pi pi-eye"></span>
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirm_password"
                className="block text-[#8D8D8D] text-[14px]"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirm_password ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm_password")}
                  className="absolute right-3 top-2 text-sm text-gray-600"
                >
                  {showPassword.confirm_password ? (
                    <span className="pi pi-eye-slash"></span>
                  ) : (
                    <span className="pi pi-eye"></span>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#0081FE] text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
