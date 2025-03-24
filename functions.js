import * as TTS from "expo-speech";

export const navigate = (navigation, location) => {
  TTS.stop(); // Stop TTS
  navigation.navigate(location); // Navigate to screen at location
};

export const speak = (message, language = "english") => {
  TTS.stop();

  const supportedLanguages = {
    english: "en-US",  // English
    spanish: "es-ES",  // Spanish
    french: "fr-FR",  // French
  };

  const options = { language: supportedLanguages[language.toLowerCase()] || supportedLanguages.english }; 

  TTS.speak(message, options);
};
