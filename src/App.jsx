import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import Profile from './shared/profile/Profile';
// import EditProfile from './shared/edit-profile/EditProfile';
// import ChangePassword from './modules/auth/ChangePassword';
// import NewSubscription from './shared/new-subscription/NewSubscription';
// import NewAdd from './shared/new-add/NewAdd';
import Landing from './Pages/Landing';  
import Login from './Pages/Auth/Login';
import Erp from './Pages/Erp/Erp';
import ErpPackages from './Pages/Erp/Erp-packeges/ErpPackages';
// import AuthGuard from './auth/AuthGuard'; // AuthGuard can be a custom hook for route protection

// import DataTransferModule from './modules/data-transfer/DataTransferModule';
// import EmailHostingModule from './modules/email-hosting/EmailHostingModule';

const App = () => {
  return (

      <Routes>
        {/* Redirect to 'landing' if no specific path is provided */}
        <Route path="/" element={<Navigate to="/landing" replace />} />

        {/* Lazy loading equivalent in React can be handled via dynamic import */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login/>} />

        {/* Guarded route example */}
        {/* <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} /> */}
        {/* <Route path="/edit-profile" element={<EditProfile />} /> */}
        {/* <Route path="/new-subs" element={<NewSubscription />} /> */}
        {/* <Route path="/new-add" element={<NewAdd />} /> */}
        {/* <Route path="/change-password" element={<ChangePassword />} /> */}

        {/* Lazy loaded modules */}
        <Route path="/erp" element={<Erp />} >
          <Route path="packages" element={<ErpPackages />} />
        </Route>
        {/* <Route path="/data-transfer" element={<DataTransferModule />} /> */}
        {/* <Route path="/email-hosting" element={<EmailHostingModule />} /> */}

        {/* Catch-all route (404 redirect) */}
        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>

  );
};

export default App;

