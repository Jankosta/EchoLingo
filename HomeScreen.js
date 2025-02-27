import { Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import * as TTS from "expo-speech";
import styles from './styles.js';

export default function HomeScreen({ navigation }) {
  const navLearn = () => {
    TTS.stop();
    navigation.navigate("Learn");
  }
  const navPractice = () => {
    TTS.stop();
    navigation.navigate("Practice");
  }
  const navCommunity = () => {
    TTS.stop();
    navigation.navigate("Community");
  }
  const navPreferences = () => {
    TTS.stop();
    navigation.navigate("Preferences");
  }
  const navNavigate = () => {
    TTS.stop();
    navigation.navigate("Navigate");
  }

  const speech = () => {
    TTS.stop();
    TTS.speak("Now viewing: Home. Press top left to visit learn. Press top right to visit practice. Press bottom left to visit community. Press bottom right to visit preferences. Press bottom banner to visit navigate. Press top right banner to repeat this message.");
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Title Banner */}
      <View style={styles.topBanner}>
        <Text style={styles.titleText}>EchoLingo</Text>

        <TouchableOpacity style={styles.topRightBannerButton} onPress={speech}>
          <Image source={require('./assets/volume.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Main Buttons */}
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.gridButton4} onPress={navLearn}>
          <Text style={styles.buttonText}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton4} onPress={navPractice}>
          <Text style={styles.buttonText}>Practice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton4} onPress={navCommunity}>
          <Text style={styles.buttonText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton4} onPress={navPreferences}>
          <Text style={styles.buttonText}>Preferences</Text>
        </TouchableOpacity>
      </View>

      {/* Navigate Button */}
      <TouchableOpacity style={styles.bottomButton} onPress={navNavigate}>
        <Text style={styles.buttonText}>Navigate</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
