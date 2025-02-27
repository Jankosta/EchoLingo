import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// IMPORT ALL SCREENS HERE
import LaunchScreen from './LaunchScreen';
import HomeScreen from './HomeScreen';
import LearnScreen from './LearnScreen';
import PracticeScreen from './PracticeScreen';
import CommunityScreen from './CommunityScreen';
import PreferencesScreen from './PreferencesScreen';
import NavigateScreen from './NavigateScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
        name="Launch" 
        component={LaunchScreen} 
        />

        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ gestureEnabled: false }} // This is to ensure you can't swipe to return to the launch screen
        />

        <Stack.Screen 
          name="Learn" 
          component={LearnScreen} 
        />

        <Stack.Screen 
          name="Practice" 
          component={PracticeScreen} 
        />

        <Stack.Screen 
          name="Community" 
          component={CommunityScreen} 
        />

        <Stack.Screen 
          name="Preferences" 
          component={PreferencesScreen} 
        />

        <Stack.Screen 
          name="Navigate" 
          component={NavigateScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
