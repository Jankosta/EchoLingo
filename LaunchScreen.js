import { StyleSheet, Text, View, Image, SafeAreaView, TouchableWithoutFeedback, ImageBackground } from 'react-native'; 

export default function LaunchScreen({ navigation }) {
  const navHome = () => navigation.navigate("Home");

  return ( 
    <TouchableWithoutFeedback onPress={navHome}>
      <View style={styles.fullScreen}>
        <ImageBackground 
          source={require('./assets/launch-bg.png')} 
          style={styles.background} 
          resizeMode="cover">
          <SafeAreaView style={styles.container}>
            <Image source={require('./assets/echolingo-logo-white.png')} />
            <Text style={styles.titleText}>EchoLingo</Text>
            <Text style={styles.subtitleText}>Language Learning for All!</Text>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1, 
    width: '100%', 
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: "white",
  },
  subtitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "white",
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
