// LanguageProvider.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import LanguageContext from "./LanguageContext";

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Default language

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LanguageProvider;
