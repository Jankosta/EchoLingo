import * as TTS from "expo-speech";

export const navigate = (navigation, location) => {
  TTS.stop(); // Stop TTS
  navigation.navigate(location); // Navigate to screen at location
};

export const speak = (message) => {
  TTS.stop();
  TTS.speak(message);
};
