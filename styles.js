import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({ 
    container: { // GENERAL CONTAINER
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    buttonText: { // BUTTON TEXT
      fontSize: 32,
      color: 'white',
      fontWeight: 'bold',
    },
    topBanner: { // TOP BANNER CONTAINER
      width: '100%',
      height: '12.5%', // 1/8 of vertical screenspace
      backgroundColor: 'pink', 
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '1%',
    },
    titleText: { // TOP BANNER TEXT
      fontSize: 42,
      fontWeight: 'bold',
      color: "black",
    },
    topRightBannerButton: { // COMMON USE: VOLUME BUTTON
      position: 'absolute',
      right: '3%',
    },
    topLeftBannerButton: { // COMMON USE: BACK BUTTON
      position: 'absolute',
      left: '3%',
    },
    buttonGrid: { // CONTAINER FOR THE GRID BUTTONS
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '100%',
      flex: 1,
      justifyContent: 'flex-start',
    },
    gridButton4: { // 2x2 GRID BUTTONS
      width: '48%', // Nearly half of horizontal screenspace
      height: '48%', // Almost half of available vertical screenspace
      margin: '1%', // Spacing between grid buttons
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    gridButton2: { // 1x2 GRID BUTTONS
      width: '98%', // Nearly full horizontal screenspace
      height: '48%', // Almost half of available vertical screenspace
      margin: '1%',
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    bottomButton: { // COMMON USE: NAVIGATE, RETURN TO HOME
      width: '98%',
      height: '20%', // 1/5th of vertical screenspace
      backgroundColor: "maroon",
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
  });

  export default styles;
