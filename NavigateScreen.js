import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './styles.js';
import { navigate } from './functions.js';

export default function NavigateScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      {/* Title Banner */}
      <View style={styles.topBanner}>
        <Text style={styles.titleText}>Navigate</Text>
      </View>

      {/* Return Button */}
      <TouchableOpacity style={styles.bottomButton} onPress={() => navigate(navigation, "Home")}>
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

