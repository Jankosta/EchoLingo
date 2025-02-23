import { StyleSheet, Text, View, Image, SafeAreaView, TouchableWithoutFeedback, ImageBackground } from 'react-native'; 

export default function LaunchScreen({ navigation }) {
  const handlePress = () => console.log("Launch Screen Interaction"); {/* Placeholder Function: Will be changed to allow navigation beyond the home screen. */}

  return ( 
    <TouchableWithoutFeedback onPress={handlePress}>
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
    color: "white",
  },
  subtitleText: {
    fontSize: 24,
    color: "white",
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
