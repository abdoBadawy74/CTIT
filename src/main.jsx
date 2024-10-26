import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import LanguageProvider from "./Context/LanguageProvider.jsx";
import CountryContext from "./Context/CountryContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CountryContext>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </CountryContext>
  </BrowserRouter>
);
