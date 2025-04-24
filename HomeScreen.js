import React, { useEffect, useContext } from 'react';
import { Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Settings } from '../settings.js';
import createStyles from '../styles.js';
import { navigate, speak } from '../functions.js';

export default function HomeScreen({ navigation }) {
  const { fontSize, isGreyscale, isAutoRead } = useContext(Settings);

  // Apply global styles
  const styles = createStyles(fontSize, isGreyscale);

  const message =
    'Now viewing: Home. Press profile icon to view your profile. Press top right to repeat this message. Press main buttons to navigate to Learn, Practice, Community, Preferences. Press bottom banner to visit Navigate.';

  useEffect(() => {
    if (isAutoRead) speak(message);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Title Banner with Profile Icon */}
      <View style={styles.topBanner}>
        {/* Profile Icon positioned absolute on left */}
        <TouchableOpacity
          onPress={() => navigate(navigation, 'Profile')}
          style={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: [{ translateY: -12 }], 
            zIndex: 1,
          }}
        >
          <Image
            source={require('../assets/profile.png')}
            style={{ width: 80, height: 80 }}
          />
        </TouchableOpacity>

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
