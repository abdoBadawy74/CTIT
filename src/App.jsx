import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Auth/Login";
import ErpSystem from "./Pages/Erp System/ErpSystem";
import Profile from "./Pages/Profile/Profile";
import Adds from "./Pages/Adds/Adds";
import EditProfile from "./Pages/Edit-profile/EditProfile";
import Support from "./Pages/Support/Support";
import ChangePass from "./Pages/Change Pass/ChangePass";
import useLanguage from "./Context/useLanguage";
import UploadReciept from "./Pages/Upload Reciept/UploadReciept";

const App = () => {
  const { language } = useLanguage();
  return (
    <div dir={language === "ar" ? "rtl" : "ltr"}>
      <Routes>
        {/* Redirect to 'landing' if no specific path is provided */}
        <Route path="/" element={<Landing />} />

        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePass />} />
        <Route path="/support" element={<Support />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="edit-profile" element={<EditProfile />} />

        <Route path="/erp" element={<ErpSystem />}></Route>
        <Route path="/adds" element={<Adds />}></Route>
        <Route path="payment/:bill_id" element={<UploadReciept />}></Route>

        {/* Catch-all route (404 redirect) */}
        {/* <Route path="*" element={<Navigate to="/landing" replace />} /> */}
      </Routes>
    </div>
  );
};

export default App;
