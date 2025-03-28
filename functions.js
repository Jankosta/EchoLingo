import * as TTS from "expo-speech";

export const navigate = (navigation, location) => {
  TTS.stop(); // Stop TTS
  navigation.navigate(location); // Navigate to screen at location
};

export const speak = (message) => {
  TTS.stop();

  const supportedLanguages = {
    english: "en-US",  // English
    spanish: "es-ES",  // Spanish
    french: "fr-FR",  // French
  };

  const splits = message.match(/<(\w+)> ([^<]+)/g); // Create array of lang tags with their text

  if (!splits) { // If no tags, speak in English
    TTS.speak(message, { language: supportedLanguages.english });
    return;
  }

  const speakSplits = async () => {
    for (const split of splits) {
      const [, lang, text] = split.match(/<(\w+)> (.+)/) || [];
      const readLang = supportedLanguages[lang.toLowerCase()] || supportedLanguages.english;

      await new Promise((resolve) => {
        TTS.speak(text, {
          language: readLang,
          onDone: resolve, // Wait for each before finishing.
        });
      });
    }
  };

  speakSplits();
};
