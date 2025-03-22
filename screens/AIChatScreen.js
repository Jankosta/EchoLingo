import { Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useEffect, useContext, useState } from 'react';
import { Settings } from '../settings.js';
import createStyles from '../styles.js';
import { navigate, speak } from '../functions.js';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

console.log("API Key:", OPENAI_API_KEY);

export default function AIChatScreen({ navigation }) {
  const { fontSize, isGreyscale, isAutoRead } = useContext(Settings);

  createStyles(fontSize, isGreyscale);
  
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  message = "Now viewing: AI Chat. Press bottom text field and type to enter your message. When you are finished, press the done button on your device's keyboard. Press bottom banner to return home. Press top right banner to repeat this message.";
  useEffect(() => { if (isAutoRead) {speak(message);} }, []);

  useEffect(() => { // When a change to outputText is detected, read the new outputText aloud
    if (outputText != "AI response will appear here.") { speak(outputText); }
  }, [outputText]);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: "You are a helpful AI tutor assisting blind and vision-impaired English speakers in learning Spanish. Respond in a way that explains concepts clearly, provides examples, and encourages learning. Stay on topic and if it strays too far away politely guide the conversation back." },
            { role: 'user', content: inputText }
          ],
          max_tokens: 75,
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

    } catch (error) {
      console.error("sendMessage error: ", error);

      setOutputText("Sorry, your message was unable to be processed at this time. If the issue persists please contact the EchoLingo team.");
    }

    setInputText('');
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
          <Text style={styles.chatOutputText}>{outputText}</Text>
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
            onSubmitEditing={() => { console.log("Input message:", inputText); sendMessage(); setInputText('');}}
          />
        </View>

        {/* Return Button */}
        <TouchableOpacity style={styles.bottomButton} onPress={() => navigate(navigation, "Home")}>
          <Text style={styles.buttonText}>Return to Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

