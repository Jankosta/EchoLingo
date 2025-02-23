import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>EchoLingo</Text>
      <Image source={require('./assets/echolingo-logo-black.png')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 48,
    color: "black",
  },
});
