import React, { useState } from 'react';
import Header from '../../Components/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChangePass() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  // Function to validate if new password and confirm password match
  const validatePasswords = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password don't match!");
      return false;
    }
    return true;
  };

  // Function to send the data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Password changed successfully!');
      } else {
        toast.error(result.message || 'Failed to change password.');
      }
    } catch (error) {
      toast.error('Error occurred. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className='w-[100%] h-[85vh] flex items-center justify-center'>
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
          <h2 className="text-center text-lg font-bold mb-4">Change Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="oldPassword" className="block text-gray-700">Old Password:</label>
              <div className="relative">
                <input
                  type={showPassword.oldPassword ? 'text' : 'password'}
                  id="oldPassword"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('oldPassword')}
                  className="absolute right-3 top-2 text-sm text-gray-600"
                >
                  {showPassword.oldPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700">New Password:</label>
              <div className="relative">
                <input
                  type={showPassword.newPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('newPassword')}
                  className="absolute right-3 top-2 text-sm text-gray-600"
                >
                  {showPassword.newPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">Confirm New Password:</label>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-3 top-2 text-sm text-gray-600"
                >
                  {showPassword.confirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Change Password
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
