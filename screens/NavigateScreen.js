import { Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from '../styles.js';
import { navigate, speak } from '../functions.js';

export default function NavigateScreen({ navigation }) {
  message = "Now viewing: Navigate. Press bottom banner to return home. Press top right banner to repeat this message."
  speak(message)

  return (
    <SafeAreaView style={styles.container}>
      {/* Title Banner */}
      <View style={styles.topBanner}>
        <Text style={styles.titleText}>Navigate</Text>

        <TouchableOpacity style={styles.topRightBannerButton} onPress={() => speak(message)}>
          <Image source={require('../assets/volume.png')}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.topLeftBannerButton} onPress={() => navigate(navigation, "Home")}>
          <Image source={require('../assets/back.png')}/>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonGrid}>
        {/* Leaves empty space. May be replaced with an image or icon. */}
        <View style={{ width: '98%', height: '49%' }} />

        <TouchableOpacity style={styles.gridButton2} onPress={() => speak("Placeholder.")}>
          <Text style={styles.buttonText}>Start Recording</Text>
        </TouchableOpacity>
      </View>

      {/* Return Button */}
      <TouchableOpacity style={styles.bottomButton} onPress={() => navigate(navigation, "Home")}>
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

