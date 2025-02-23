import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  bottomButton: { // RETURN BUTTON
    width: '98%',
    height: '20%', // 1/5th of vertical screenspace
    backgroundColor: "maroon",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
});
