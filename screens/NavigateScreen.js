/*
~~TODO~~
-Fix issue that causes TTS to become really quiet after first recording.
-Handle the situation where the user starts the recording and then clicks off the page.
-Actually implement the navigation from the transcript.
*/

import { Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from '../styles.js';
import { navigate, speak } from '../functions.js';
import * as TTS from "expo-speech"; // TTS needs to be manually imported here so that TTS.stop() can be used
import { recordStart, recordStop, getTranscription } from "../voice.js";

export default function NavigateScreen({ navigation }) {
  const message = "Now viewing: Navigate. Press bottom button to start and stop voice recording. Press bottom banner to return home. Press top right banner to repeat this message.";
  speak(message);

  const [recording, setRecording] = useState(false); // Recording state hook

  const navigateRecord = async () => { // Recording handler
    TTS.stop();
    if (await recordStart()) {
      setRecording(true);
      console.log("Recording started!");
    } else {
      console.error("navigateRecord error: Recording did not start.");
    }
  };

  const navigateTranscribe = async () => { // Transcription handler
    setRecording(false);
    const uri = await recordStop();
    if (!uri) {
      console.error("navigateTranscribe error: Recording URI not located.");
      return false;
    }

    const transcriptText = await getTranscription(uri);
    console.log(transcriptText);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title Banner */}
      <View style={styles.topBanner}>
        <Text style={styles.titleText}>Navigate</Text>

        <TouchableOpacity style={styles.topRightBannerButton} onPress={() => speak(message)}>
          <Image source={require('../assets/volume.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.topLeftBannerButton} onPress={() => navigate(navigation, "Home")}>
          <Image source={require('../assets/back.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonGrid}>
        {/* Empty space. */}
        <View style={{ width: '98%', height: '49.5%' }} />
        
        {/* Microphone image. */}
        <Image source={require('../assets/mic.png')} style={{ position: 'absolute', top: '0%', left: '25%', width: '50%', height: '50%' }} />

        {/* Recording Button */}
          {recording ? (
            <TouchableOpacity style={[styles.gridButton2, { backgroundColor: 'blue' }]} onPress={navigateTranscribe}>
              <Text style={styles.buttonText}>Stop Recording</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.gridButton2, { backgroundColor: 'red' }]} onPress={navigateRecord}>
              <Text style={styles.buttonText}>Start Recording</Text>
            </TouchableOpacity>
          )}
      </View>

      {/* Return Button */}
      <TouchableOpacity style={styles.bottomButton} onPress={() => navigate(navigation, "Home")}>
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
