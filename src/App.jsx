import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import Profile from './shared/profile/Profile';
// import EditProfile from './shared/edit-profile/EditProfile';
// import ChangePassword from './modules/auth/ChangePassword';
// import NewSubscription from './shared/new-subscription/NewSubscription';
// import NewAdd from './shared/new-add/NewAdd';
import Landing from "./Pages/Landing";
import Login from "./Pages/Auth/Login";
import ErpSystem from "./Pages/Erp System/ErpSystem";
import Profile from "./Pages/Profile/Profile";
import Adds from "./Pages/Adds/Adds";
// import AuthGuard from './auth/AuthGuard'; // AuthGuard can be a custom hook for route protection

// import DataTransferModule from './modules/data-transfer/DataTransferModule';
// import EmailHostingModule from './modules/email-hosting/EmailHostingModule';

const App = () => {
  return (
    <Routes>
      {/* Redirect to 'landing' if no specific path is provided */}
      <Route path="/" element={<Navigate to="/landing" replace />} />

      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route path="/profile" element={<Profile />} />

      <Route path="/erp" element={<ErpSystem />}></Route>
      <Route path="adds" element={<Adds/>}></Route>

      {/* Catch-all route (404 redirect) */}
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
};

export default App;
