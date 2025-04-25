import React, { useEffect, useContext } from 'react';
import { Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Settings } from '../settings.js';
import createStyles from '../styles.js';
import { navigate, speak } from '../functions.js';

export default function HomeScreen({ navigation }) {
  const { fontSize, isGreyscale, isAutoRead } = useContext(Settings);
  const styles = createStyles(fontSize, isGreyscale);

  const message =
    'Now viewing: Home. Press main buttons to navigate to Learn, Practice, Community, Preferences. Press bottom banner to visit Navigate. Press top right to repeat this message.';

  useEffect(() => {
    if (isAutoRead) speak(message);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Title Banner */}
      <View style={styles.topBanner}>
        <Text style={styles.titleText}>EchoLingo</Text>
        <TouchableOpacity
          style={styles.topRightBannerButton}
          onPress={() => speak(message)}
        >
          <Image source={require('../assets/volume.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Main Buttons */}
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={styles.gridButton4}
          onPress={() => navigate(navigation, 'Learn')}
        >
          <Text style={styles.buttonText}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gridButton4}
          onPress={() => navigate(navigation, 'Practice')}
        >
          <Text style={styles.buttonText}>Practice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gridButton4}
          onPress={() => navigate(navigation, 'Community')}
        >
          <Text style={styles.buttonText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gridButton4}
          onPress={() => navigate(navigation, 'Preferences')}
        >
          <Text style={styles.buttonText}>Preferences</Text>
        </TouchableOpacity>
      </View>

      {/* Navigate Button */}
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigate(navigation, 'Navigate')}
      >
        <Text style={styles.buttonText}>Navigate</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
