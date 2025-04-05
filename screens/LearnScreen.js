import { Text, View, Image, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useContext } from 'react';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Settings } from '../settings.js';
import createStyles from '../styles.js';
import { navigate, speak } from '../functions.js';

export default function LearnScreen({ navigation }) {
  const { fontSize, isGreyscale, isAutoRead } = useContext(Settings);
  const styles = createStyles(fontSize, isGreyscale);

  const message =
    'Now viewing: Learn. Press the top left to return home. Choose Read and Learn, Watch and Learn, My Notes, or Pronunciation and Grammar. Press the top right to repeat this message.';

  useEffect(() => {
    if (isAutoRead) speak(message);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Banner */}
      <View style={styles.topBanner}>
        <TouchableOpacity style={styles.topLeftBannerButton} onPress={() => navigate(navigation, 'Home')}>
          <Image source={require('../assets/back.png')} style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.titleText}>Learn</Text>

        <TouchableOpacity style={styles.topRightBannerButton} onPress={() => speak(message)}>
          <Image source={require('../assets/volume.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Learn Options */}
      <ScrollView contentContainerStyle={styles.buttonGrid}>
        <TouchableOpacity style={styles.gridButton4} onPress={() => navigate(navigation, 'TextMaterials')}>
          <MaterialIcons name="menu-book" size={24} color="white" />
          <Text style={styles.buttonText}>Read & Learn</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridButton4} onPress={() => navigate(navigation, 'VideoMaterials')}>
          <FontAwesome5 name="video" size={24} color="white" />
          <Text style={styles.buttonText}>Watch & Learn</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridButton4} onPress={() => navigate(navigation, 'MyNotes')}>
          <FontAwesome5 name="sticky-note" size={24} color="white" />
          <Text style={styles.buttonText}>My Notes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridButton4} onPress={() => navigate(navigation, 'PronunciationGrammarScreen')}>
          <FontAwesome5 name="language" size={20} color="white" />
          <Text style={styles.buttonText}>Pronunciation & Grammar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
