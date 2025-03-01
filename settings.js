import React from 'react';
import { createContext, useState } from 'react';

// Create settings context object
export const Settings = createContext();

export const SettingsProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState("Large");
  const [isGreyscale, setGreyscale] = useState(false);

  const toggleFontSize = () => {
    if (fontSize === "Small") {
        setFontSize("Medium");
    } else if (fontSize === "Medium") {
        setFontSize("Large");
    } else if (fontSize === "Large") {
        setFontSize("Small");
    } 
  };

  const toggleGreyscale = () => {
    setGreyscale(!isGreyscale);
  };

  return (
    <Settings.Provider value={{ fontSize, isGreyscale, toggleFontSize, toggleGreyscale }}>
      {children}
    </Settings.Provider>
  );
};
