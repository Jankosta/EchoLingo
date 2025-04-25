import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsProvider } from './settings.js';

// Screens
import LaunchScreen from './screens/LaunchScreen';
import LoginScreen from './screens/LoginScreen.js';
import HomeScreen from './screens/HomeScreen';
import LearnScreen from './screens/LearnScreen';
import PracticeScreen from './screens/PracticeScreen';
import CommunityScreen from './screens/CommunityScreen';
import FriendsScreen from './screens/FriendsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import PreferencesScreen from './screens/PreferencesScreen';
import VisualSettingsScreen from './screens/VisualSettingsScreen';
import AudioSettingsScreen from './screens/AudioSettingsScreen';
import NavigateScreen from './screens/NavigateScreen';
import TextMaterialsScreen from './screens/TextMaterialsScreen';
import VideoMaterialsScreen from './screens/VideoMaterialsScreen';
import MyNotesScreen from './screens/MyNotesScreen';
import QuizScreen from './screens/QuizScreen';
import ExamScreen from './screens/ExamScreen';
import GrammarScreen from './screens/GrammarScreen';
import VocabPronunciationScreen from './screens/VocabPronunciationScreen';
import AIChatScreen from './screens/AIChatScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
          <Stack.Screen name="Launch" component={LaunchScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Learn" component={LearnScreen} />
          <Stack.Screen name="Practice" component={PracticeScreen} />
          <Stack.Screen name="Community" component={CommunityScreen} />
          <Stack.Screen name="Friends" component={FriendsScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Preferences" component={PreferencesScreen} />
          <Stack.Screen name="Visual Settings" component={VisualSettingsScreen} />
          <Stack.Screen name="Audio Settings" component={AudioSettingsScreen} />
          <Stack.Screen name="Navigate" component={NavigateScreen} />
          <Stack.Screen name="TextMaterials" component={TextMaterialsScreen} />
          <Stack.Screen name="VideoMaterials" component={VideoMaterialsScreen} />
          <Stack.Screen name="MyNotes" component={MyNotesScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Exam" component={ExamScreen} />
          <Stack.Screen name="Grammar" component={GrammarScreen} options={{ headerShown: false }} />
          <Stack.Screen name="VocabPronunciation" component={VocabPronunciationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AI Chat" component={AIChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}