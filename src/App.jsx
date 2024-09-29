import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Auth/Login";
import ErpSystem from "./Pages/Erp System/ErpSystem";
import Profile from "./Pages/Profile/Profile";
import Adds from "./Pages/Adds/Adds";
import EditProfile from "./Pages/Edit-profile/EditProfile";
import Support from "./Pages/Support/Support";
import LanguageProvider from "./Context/LanguageProvider";

const App = () => {
  return (
    <LanguageProvider>
      <Routes>
        {/* Redirect to 'landing' if no specific path is provided */}
        <Route path="/" element={<Navigate to="/landing" replace />} />

        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/support" element={<Support />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="edit-profile" element={<EditProfile />} />

        <Route path="/erp" element={<ErpSystem />}></Route>
        <Route path="adds" element={<Adds />}></Route>

        {/* Catch-all route (404 redirect) */}
        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </LanguageProvider>
  );
};

export default App;
