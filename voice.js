import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

const audioOptions = { // Google Cloud Voice-to-Text requires .WAV files.
  ios: {
    extension: ".wav",
  },
  android: {
    extension: ".wav",
  },
};

let recordingPointer = null; // Holds active recording object.

export const recordStart = async () => {
  try {
    await Audio.requestPermissionsAsync(); // Ask for audio permissions. Will simply be ignored if permission is already granted.
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true }); // Additional settings for IOS.

    const {recording} = await Audio.Recording.createAsync(audioOptions); // Create recording object (will use .WAV)
    recordingPointer = recording; // Store recording object in recordingPointer so that if multiple recordings are somehow started only the most recent one is referred to.

    return true; // Recording success
  } catch (error) {
    console.error("recordStart error: ", error);

    return false; // Recording failure
  }
};

export const recordStop = async () => {
  if (!recordingPointer) return false; // If no recording is active abort the function.

  await recordingPointer.stopAndUnloadAsync(); // Stop recording and release resources
  const uri = recordingPointer.getURI(); // Store recordings location in device cache as uri
  recordingPointer = null; // Empty recordingPointer

  return uri; // Return location of recording
};
