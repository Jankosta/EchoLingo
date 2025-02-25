import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import * as TTS from "expo-speech";

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

        <TouchableOpacity style={styles.speechButton} onPress={speech}>
          <Image source={require('./assets/volume.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Main Buttons */}
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.gridButton} onPress={navLearn}>
          <Text style={styles.buttonText}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton} onPress={navPractice}>
          <Text style={styles.buttonText}>Practice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton} onPress={navCommunity}>
          <Text style={styles.buttonText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton} onPress={navPreferences}>
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

const styles = StyleSheet.create({ //Order styles from top of screen to bottom of screen
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  topBanner: {
    width: '100%',
    height: '12.5%', // 1/8 of vertical screenspace
    backgroundColor: 'pink', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1%',
  },
  titleText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: "black",
  },
  speechButton: {
    position: 'absolute',
    right: '3%',
  },
  buttonGrid: { // CONTAINER FOR THE GRID BUTTONS
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  gridButton: { // THE ACTUAL GRID BUTTONS
    width: '48%', // Nearly half of horizontal screenspace
    height: '48%', // Almost half of available vertical screenspace
    margin: '1%', // Spacing between grid buttons
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  bottomButton: { // NAVIGATE BUTTON
    width: '98%',
    height: '20%', // 1/5th of vertical screenspace
    backgroundColor: "maroon",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
