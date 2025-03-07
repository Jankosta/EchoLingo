import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../backend/config/firebaseConfig';
import { recordStart, recordStop, getTranscription } from '../voice';
import { navigate, speak } from '../functions.js';

// LoginScreen component
export default function LoginScreen({ navigation }) {
  message = "Now viewing: Login. Press mid-upper left to enter email. Press mid-upper right to speak email. Press mid-lower left to enter password. Press mid-lower right to speak password. Press bottom left to login or sign up. Press bottom right to switch between login and sign up. Press top right banner to repeat this message.";
  useEffect(() => {speak(message);}, []);
  
  // State variables for email, password, error message, sign-up mode, and recording state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isRecordingEmail, setIsRecordingEmail] = useState(false);
  const [isRecordingPassword, setIsRecordingPassword] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    if (!validatePassword(password)) {
      setError('Invalid password.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.replace('Home');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Function to handle sign-up
  const handleSignUp = () => {
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long and contain a number.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.replace('Home');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // Function to validate password
  const validatePassword = (password) => {
    return password.length >= 6 && /\d/.test(password);
  };

  // Function to handle email speech recognition
  const handleEmailSpeech = async () => {
    if (isRecordingEmail) {
      const uri = await recordStop();
      if (uri) {
        let recognizedEmail = (await getTranscription(uri)).trim();
        // replate "at" with '@', "dot" with '.', and delete spaces between characters
        recognizedEmail = recognizedEmail.replace(/at/g, '@').replace(/dot/g, '.').replace(/\s+/g, '');
        setEmail(recognizedEmail);
      }
      setIsRecordingEmail(false);
    } else {
      const recordingStarted = await recordStart();
      if (recordingStarted) {
        setIsRecordingEmail(true);
      }
    }
  };

  // Function to handle password speech recognition
  const handlePasswordSpeech = async () => {
    if (isRecordingPassword) {
      const uri = await recordStop();
      if (uri) {
        let recognizedPassword = (await getTranscription(uri)).trim();
        // replace "capital (letter)" with the uppercase version said letter, and delete spaces between characters
        recognizedPassword = recognizedPassword.replace(/capital\s([a-z])/gi, (match, p1) => p1.toUpperCase()).replace(/\s+/g, '');
        setPassword(recognizedPassword);
      }
      setIsRecordingPassword(false);
    } else {
      const recordingStarted = await recordStart();
      if (recordingStarted) {
        setIsRecordingPassword(true);
      }
    }
  };

  // Display everything on the screen
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.topRightBannerButton} onPress={() => speak(message)}>
        <Image source={require('../assets/volume.png')} />
      </TouchableOpacity>
      <TextInput
        style={[styles.input, styles.emailInput]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={[styles.button, styles.speakEmailButton]} onPress={handleEmailSpeech}>
        <Text style={styles.buttonText}>{isRecordingEmail ? "Stop Recording" : "Start Recording"}</Text>
      </TouchableOpacity>
      <TextInput
        style={[styles.input, styles.passwordInput]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={[styles.button, styles.speakPasswordButton]} onPress={handlePasswordSpeech}>
        <Text style={styles.buttonText}>{isRecordingPassword ? "Stop Recording" : "Start Recording"}</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={isSignUp ? handleSignUp : handleLogin}>
        <Text style={styles.buttonText}>{isSignUp ? "Sign Up" : "Login"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.switchButton]}
        onPress={() => setIsSignUp(!isSignUp)}
      >
        <Text style={styles.buttonText}>{isSignUp ? "Switch to Login" : "Switch to Sign Up"}</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: { // style for container
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  topRightBannerButton: { // style for top right banner button
    position: 'absolute',
    top: 75,
    right: 25,
  },
  input: { // style for input fields
    height: '25%',
    width: '45%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  emailInput: { // style for email input
    position: 'absolute',
    top: 200,
    left: 10,
  },
  speakEmailButton: { // style for speak email button
    position: 'absolute',
    top: 200,
    right: 10,
  },
  passwordInput: { // style for password input
    position: 'absolute',
    bottom: 200,
    left: 10,
  },
  speakPasswordButton: { // style for speak password button
    position: 'absolute',
    bottom: 200,
    right: 10,
  },
  button: { // style for speach and login/sign up buttons
    backgroundColor: 'red',
    height: '25%',
    width: '45%',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { // style for button text
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  error: { // error messages
    color: 'red',
    marginBottom: 12,
  },
  loginButton: { // style for login button
    position: 'absolute',
    height: 150,
    bottom: 20,
    left: 10,
  },
  switchButton: { // style for switch button
    position: 'absolute',
    height: 150,
    bottom: 20,
    right: 10,
  },
});
