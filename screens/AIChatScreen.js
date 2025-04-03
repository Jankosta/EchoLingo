import { Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useEffect, useContext, useState } from 'react';
import { Settings } from '../settings.js';
import createStyles from '../styles.js';
import { navigate, speak } from '../functions.js';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';
import * as TTS from "expo-speech"; // TTS needs to be manually imported here so that TTS.stop() can be used
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { recordStart, recordStop, getTranscription } from "../voice.js";

export default function AIChatScreen({ navigation }) {
  const { fontSize, isGreyscale, isAutoRead } = useContext(Settings);

  createStyles(fontSize, isGreyscale);
  
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);
  const [messageLog, setMessageLog] = useState([]);

  message = "Now viewing: AI Chat. Press bottom text field and type to enter your message. When you are finished, press the done button on your device's keyboard. Use the buttons to the right of text entry for voice input. To save a log of your chat, please press the middle of the top banner.";
  useEffect(() => { if (isAutoRead) {speak(message);} }, []);

  const [recording, setRecording] = useState(false); // Recording state hook
  const [language, setLanguage] = useState("english");

  const exportMessageLog = async (messageLog) => {
    if (messageLog.length === 0) { // Don't create empty log
      speak("There is no message history to save. Please press the bottom text field to type your message.");
      return;
    }
  
    const formattedLog = messageLog
      .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`) // Format each message entry
      .join("\n\n"); // Newline between each message

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString()
      .replace(/:/g, '-') // Replace colon with hyphen
      .replace('T', '_') // Replace T with underscore
      .slice(0, 16); // End at minute

    const uri = FileSystem.documentDirectory + `EchoLingo_AI_Chat_Log_${formattedDate}.txt`; // File path
  
    try {
      await FileSystem.writeAsStringAsync(uri, formattedLog, { encoding: FileSystem.EncodingType.UTF8 }); // Create the txt file
  
      if (await Sharing.isAvailableAsync()) { // Check for sharing permission
        await Sharing.shareAsync(uri); // Open phone's share screen
      } else {
        console.error("Error exporting chat history: Sharing is not available on this device."); // No access
        speak("Error exporting chat log. Please check your phone's file sharing permissions for EchoLingo.");
      }
    } catch (error) {
      console.error("Error exporting chat history:", error); // Other error
      speak("Error exporting chat log.");
    }
  };
  
  const handleRecord = async () => { // Recording handler
    TTS.stop();
    if (await recordStart()) {
      setRecording(true);
      console.log("Recording started!");
    } else {
      console.error("handleRecord error: Recording did not start.");
    }
  };

  const handleTranscribe = async () => { // Transcription handler
    setRecording(false);
    const uri = await recordStop();
    if (!uri) {
      console.error("handleTranscribe error: Recording URI not located.");
      return false;
    }

    const transcriptText = (await getTranscription(uri, language)).toLowerCase();
    
    setInputText(transcriptText); 
    console.log(transcriptText);
  };

  const handleNavigation = async () => { // If the user tries to leave the page during recording it will first stop the recording
    if (recording) {
      await recordStop();
      setRecording(false);
    }
    navigate(navigation, "Home");
  };

  useEffect(() => { // When a change to outputText is detected, read the new outputText aloud
    if (outputText != "") { speak(outputText); }
  }, [outputText]);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const newHistory = [...messageHistory, { role: "user", content: inputText }]; // Add new message to history
    if (newHistory.length > 5) newHistory.shift(); // Remove oldest message

    const newLog = [...messageLog, { role: "user", content: inputText }];

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: "You are a helpful AI tutor assisting blind and vision-impaired English speakers in learning Spanish. Your goal is to provide both English and Spanish sentences, but avoid simple repetitions. Start with an English sentence, and only use Spanish if the user asks or you feel it is. Always enclose language switches within tags, such as <english> or <spanish>. For mixed responses, tag each sentence appropriately. Example:\n\n<english> Hello! How are you today? <spanish> ¡Hola! ¿Cómo estás hoy?" },
            ...newHistory
          ],
          max_tokens: 100,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const aiOutput = response.data.choices[0].message.content.trim();
      
      console.log("Ouput message:", aiOutput);

      setOutputText(aiOutput);

      const updatedHistory = [...newHistory, { role: "assistant", content: aiOutput }]; // Add new message to history
      if (updatedHistory.length > 5) updatedHistory.shift(); // Remove oldest message
      setMessageHistory(updatedHistory);

      const updatedLog = [...newLog, { role: "assistant", content: removeTags(aiOutput) }];
      setMessageLog(updatedLog);

    } catch (error) {
      console.error("sendMessage error: ", error);

      setOutputText("Sorry, your message was unable to be processed at this time. If the issue persists please contact the EchoLingo team.");
    }

    setInputText('');
  };

  const removeTags = (message) => {
    return message.replace(/<[^>]+>/g, '').trim();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {/* Title Banner */}
        <View style={styles.topBanner}>
          <TouchableOpacity onPress={() => exportMessageLog(messageLog)}>
            <Text style={styles.titleText}>AI Chat</Text>
          </TouchableOpacity>

          {recording ? ( // If the user presses the TTS button during recording it will act as if they stopped the recording
            <TouchableOpacity style={styles.topRightBannerButton} onPress={handleTranscribe}>
              <Image source={require('../assets/volume.png')} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.topRightBannerButton} onPress={() => speak(message)}>
              <Image source={require('../assets/volume.png')} />
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.topLeftBannerButton} onPress={handleNavigation}>
            <Image source={require('../assets/back.png')} />
          </TouchableOpacity>
        </View>

        {/* Output Box */}
        <View style={styles.chatOutputBox}>
          <ScrollView showsVerticalScrollIndicator={true}>
            <Text style={styles.chatOutputText}>{removeTags(outputText)}</Text>
          </ScrollView>
        </View>

        {/* Input Box */}
        <View style={styles.chatInputBox}>
          <TextInput
            style={styles.chatTextInput}
            placeholder="Type your message here..."
            value={inputText}
            onChangeText={setInputText}

            multiline={true}
            returnKeyType="done" // Changes return on keyboard to done
            blurOnSubmit={true}
            onSubmitEditing={() => { sendMessage(); setInputText('');}}
          />

          <View style={styles.chatVoiceButtonContainer}>

            {recording ? (
              <TouchableOpacity style={styles.chatVoiceButtonToggled} onPress={handleTranscribe}>
                <Text style={styles.buttonText}>Stop</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.chatVoiceButton}
                onPress={() => {
                  handleRecord();  // Start recording
                  setLanguage("english");  // Set language
                }}
              >
                <Text style={styles.buttonText}>Eng.</Text>
              </TouchableOpacity>
            )}
            
            {recording ? (
              <TouchableOpacity>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.chatVoiceButton}
                onPress={() => {
                  handleRecord();  // Start recording
                  setLanguage("spanish");  // Set language
                }}
              >
                <Text style={styles.buttonText}>Span.</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Return Button */}
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigate(navigation, "Home")}>
          <Text style={styles.buttonText}>Return to Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

