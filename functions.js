import * as TTS from "expo-speech";

export const navigate = (navigation, location) => {
  TTS.stop(); // Stop TTS
  navigation.navigate(location); // Navigate to screen at location
};

// UPDATED FUNCTION TO DYNAMICALLY USE THE SELECTED LANGUAGE
export const speak = (message, selectedLanguage = "English") => {
  TTS.stop();
  
  const languageMap = {
    "English": "en-US",
    "Spanish": "es-ES",
    "French": "fr-FR",
    "German": "de-DE",
    "Mandarin": "zh-CN"
  };

  const langCode = languageMap[selectedLanguage] || "en-US"; // Default to English if not found
  TTS.speak(message, { language: langCode });
};
