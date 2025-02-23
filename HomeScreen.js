import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const navNavigate = () => navigation.navigate("Navigate");

  return (
    <SafeAreaView style={styles.container}>
      {/* Title Banner */}
      <View style={styles.topBanner}>
        <Text style={styles.titleText}>EchoLingo</Text>
      </View>

      {/* Navigate Button */}
      <TouchableOpacity style={styles.bottomButton} onPress={() => navNavigate}>
        <Text style={styles.buttonText}>Navigate</Text>
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
    height: '12.5%', // 1/8 of screenspace
    backgroundColor: 'pink', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: "black",
  },
  bottomButton: {
    width: '100%',
    height: '16.66%', // 1/6th of screenspace
    backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
