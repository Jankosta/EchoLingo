import { Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useEffect, useContext, useState } from 'react';
import { Settings } from '../settings.js';
import createStyles from '../styles.js';
import { navigate, speak } from '../functions.js';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

export default function AIChatScreen({ navigation }) {
  const { fontSize, isGreyscale, isAutoRead } = useContext(Settings);

  createStyles(fontSize, isGreyscale);
  
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [messageHistory, setMessageHistory] = useState([]);

  message = "Now viewing: AI Chat. Press bottom text field and type to enter your message. When you are finished, press the done button on your device's keyboard. Press bottom banner to return home. Press top right banner to repeat this message.";
  useEffect(() => { if (isAutoRead) {speak(message);} }, []);

  useEffect(() => { // When a change to outputText is detected, read the new outputText aloud
    if (outputText != "") { speak(outputText); }
  }, [outputText]);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const newHistory = [...messageHistory, { role: "user", content: inputText }]; // Add new message to history
    if (newHistory.length > 5) newHistory.shift(); // Remove oldest message

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
          <Text style={styles.titleText}>AI Chat</Text>

          <TouchableOpacity style={styles.topRightBannerButton} onPress={() => speak(message)}>
            <Image source={require('../assets/volume.png')} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.topLeftBannerButton} onPress={() => navigate(navigation, "Home")}>
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
            <TouchableOpacity style={styles.chatVoiceButton} onPress={() => console.log("English Voice")}>
              <Text style={styles.buttonText}>Eng.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chatVoiceButton} onPress={() => console.log("Spanish Voice")}>
              <Text style={styles.buttonText}>Span.</Text>
            </TouchableOpacity>
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

