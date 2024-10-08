import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const isLoggedIn = localStorage.getItem("LoginEmail");
  return <div>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</div>;
}
