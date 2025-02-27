import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './styles.js';

export default function NavigateScreen({ navigation }) {
  const navHome = () => navigation.navigate("Home");

  return (
    <SafeAreaView style={styles.container}>
      {/* Title Banner */}
      <View style={styles.topBanner}>
        <Text style={styles.titleText}>Navigate</Text>
      </View>

      {/* Return Button */}
      <TouchableOpacity style={styles.bottomButton} onPress={navHome}>
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

