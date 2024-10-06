import React, { useState, useEffect, useRef } from "react";
import Header from "../../Components/Header";
import editImg from "../../assets/edit-icon.svg";
import trash from "../../assets/deleteIcon.svg";
import "./Edit.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { EDIT_PROFILE } from "../../Api/Api";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer

function EditProfile() {
  // get the partner details from the location state
  const location = useLocation();
  const partnerDetails = location.state;
  const navigate = useNavigate();
  // set the initial state of the edit profile form
  const [editProfileForm, setEditProfileForm] = useState({
    email: "",
    partner_name: "",
    phone: "",
    partner_company_name: "",
    profile_img: "",
  });

  useEffect(() => {
    if (partnerDetails) {
      setEditProfileForm({
        email: partnerDetails[0].partner_email,
        partner_name: partnerDetails[0].partner_name,
        phone: partnerDetails[0].partner_phone,
        company: partnerDetails[0].partner_company_name,
        profile_img: partnerDetails[0].partner_image,
      });
    }
  }, []);

  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const imageInputRef = useRef(null);

  useEffect(() => {
    if (partnerDetails[0].partner_image) {
      setUploadedImageSrc(partnerDetails[0].partner_image);
    }
  }, [partnerDetails.partner_image]);

  console.log(uploadedImageSrc);

  const onFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Only take the Base64 part
        setUploadedImageSrc(reader.result); // Display the uploaded image
        setEditProfileForm({ ...editProfileForm, profile_img: base64String }); // Store the Base64 string in state
      };
      reader.readAsDataURL(file);
    }
  };

  const resetFileInput = () => {
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const resetImage = () => {
    setUploadedImageSrc(null);
    setEditProfileForm({ ...editProfileForm, profile_img: "" });
    resetFileInput();
  };

  const changeImage = () => {
    imageInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(editProfileForm);
    axios
      .post(
        `${EDIT_PROFILE}`,
        {
          params: {
            email: editProfileForm.email,
            partner_name: editProfileForm.partner_name,
            phone: editProfileForm.phone,
            profile_img: editProfileForm.profile_img,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.result.success) {
          toast.success("Profile updated successfully");
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
        } else {
          toast.error("Error updating profile, please try again");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(partnerDetails);

  return (
    <>
      <Header />
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="flex px-10 md:px-24 gap-10 flex-wrap editForm"
      >
        <div className="mt-14 mb-10 self-center">
          <div className="flex flex-col gap-5 items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center">
                {uploadedImageSrc ? (
                  <img
                    src={`data:image/jpeg;base64,${uploadedImageSrc}`}
                    className="w-[200px] h-[200px] object-cover rounded-full"
                    alt="Uploaded Image"
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
                ref={imageInputRef}
                onChange={onFileInputChange}
              />
            </label>
            <div className="flex items-center gap-3 mx-6 space-y-3">
              <div
                className="flex items-center gap-3 text-[#27AE60] border p-2 rounded-bl-lg border-[#27AE60] cursor-pointer"
                onClick={changeImage}
              >
                Change <img src={editImg} alt="edit" className="pr-3" />
              </div>
              <div
                className="flex items-center gap-3 text-[#C32B43] border p-2 rounded-br-lg border-[#C32B43] cursor-pointer"
                style={{
                  margin: 0,
                }}
                onClick={resetImage}
              >
                Delete <img src={trash} alt="trash" className="pr-3" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-14 items-center justify-center">
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-[#8D8D8D]">Name</label>
            <input
              value={editProfileForm?.partner_name}
              onChange={(e) =>
                setEditProfileForm({
                  ...editProfileForm,
                  partner_name: e.target.value,
                })
              }
              required
              type="text"
              style={{ width: "400px" }}
              className="py-3 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="name"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-[#8D8D8D]">Company Name</label>
            <input
              value={editProfileForm.company}
              onChange={(e) =>
                setEditProfileForm({
                  ...editProfileForm,
                  company: e.target.value,
                })
              }
              required
              type="text"
              style={{ width: "400px" }}
              className="py-3 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="name"
              placeholder="Company Name"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="block text-[#8D8D8D]">Phone Number</label>
            <input
              type="text"
              value={editProfileForm.phone}
              onChange={(e) =>
                setEditProfileForm({
                  ...editProfileForm,
                  phone: e.target.value,
                })
              }
              style={{ width: "400px" }}
              className="py-3 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Phone Number"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              style={{ width: "400px" }}
              className="px-5 py-5 bg-green-500 text-white rounded-md focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditProfile;
