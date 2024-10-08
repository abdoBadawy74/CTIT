import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PresistLogin() {
  const isLoggedIn = localStorage.getItem("LoginEmail");
  const location = useLocation();

  // If the user is already logged in and trying to access the login page, redirect to the dashboard
  if (isLoggedIn && location.pathname === "/login") {
    // Redirect to the dashboard
    return <Navigate to="/" />;
  }

  // Otherwise, if the user is not logged in, navigate to the login page
  return (
    <div>
      {isLoggedIn ? <Outlet /> : <Navigate to="/login" />}
    </div>
  );
}
