import { Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useContext, useState } from 'react';
import { Settings } from '../settings.js';
import createStyles from '../styles.js';
import { navigate, speak } from '../functions.js';

export default function LearnScreen({ navigation }) {
  const { fontSize, isGreyscale, isAutoRead } = useContext(Settings);
  const styles = createStyles(fontSize, isGreyscale);

  const message = "Now viewing: Learn.";
  useEffect(() => { if (isAutoRead) { speak(message); } }, []);

  // States to toggle dropdowns
  const [dropdowns, setDropdowns] = useState({
    language: false,
    text: false,
    videos: false,
    notes: false,
  });

  // Function to toggle dropdown
  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title Banner */}
      <View style={styles.topBanner}>
        <TouchableOpacity style={styles.topLeftBannerButton} onPress={() => navigate(navigation, "Home")}>
          <Image source={require('../assets/back.png')} style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.titleText}>Learn</Text>

        <TouchableOpacity style={styles.topRightBannerButton} onPress={() => speak(message)}>
          <Image source={require('../assets/volume.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.learnScreen_scrollContent}>
        <View style={styles.learnScreen_listContainer}>
          {/* Language */}
          <TouchableOpacity style={styles.learnScreen_listItem} onPress={() => toggleDropdown("language")}>
            <Text style={styles.buttonText}>Language</Text>
          </TouchableOpacity>
          {dropdowns.language && (
            <TouchableOpacity style={styles.learnScreen_dropdownItem} onPress={() => speak("Add a language")}>
              <Text style={styles.learnScreen_dropdownText}>+ Add a Language</Text>
            </TouchableOpacity>
          )}

          {/* Text Materials */}
          <TouchableOpacity style={styles.learnScreen_listItem} onPress={() => toggleDropdown("text")}>
            <Text style={styles.buttonText}>Text Materials</Text>
          </TouchableOpacity>
          {dropdowns.text && (
            <TouchableOpacity style={styles.learnScreen_dropdownItem} onPress={() => speak("Explore learning text materials")}>
              <Text style={styles.learnScreen_dropdownText}>+ Explore Learning Text Materials</Text>
            </TouchableOpacity>
          )}

          {/* Videos */}
          <TouchableOpacity style={styles.learnScreen_listItem} onPress={() => toggleDropdown("videos")}>
            <Text style={styles.buttonText}>Videos</Text>
          </TouchableOpacity>
          {dropdowns.videos && (
            <TouchableOpacity style={styles.learnScreen_dropdownItem} onPress={() => speak("Explore learning videos")}>
              <Text style={styles.learnScreen_dropdownText}>+ Explore Learning Videos</Text>
            </TouchableOpacity>
          )}

          {/* My Notes */}
          <TouchableOpacity style={styles.learnScreen_listItem} onPress={() => toggleDropdown("notes")}>
            <Text style={styles.buttonText}>My Notes</Text>
          </TouchableOpacity>
          {dropdowns.notes && (
            <TouchableOpacity style={styles.learnScreen_dropdownItem} onPress={() => speak("Create a note")}>
              <Text style={styles.learnScreen_dropdownText}>+ Create a Note</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Return Button */}
      <TouchableOpacity style={styles.bottomButton} onPress={() => navigate(navigation, "Home")}>
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
