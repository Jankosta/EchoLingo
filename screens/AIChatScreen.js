import { Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useEffect, useContext, useState } from 'react';
import { Settings } from '../settings.js';
import createStyles from '../styles.js';
import { navigate, speak } from '../functions.js';

export default function AIChatScreen({ navigation }) {
  const { fontSize, isGreyscale, isAutoRead } = useContext(Settings);

  createStyles(fontSize, isGreyscale);
  
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('AI response will appear here. And it can wrap if it becomes too long as well. Cool!');

  message = "Now viewing: AI Chat. Press bottom text field and type to enter your message. When you are finished, press the done button on your device's keyboard. Press bottom banner to return home. Press top right banner to repeat this message.";
  useEffect(() => { if (isAutoRead) {speak(message);} }, []);

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
            onSubmitEditing={() => { console.log("Input message:", inputText); setOutputText(`What you typed: ${inputText}`); setInputText('');}}
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

