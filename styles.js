import { StyleSheet } from 'react-native';

const createStyles = ( fontSize, isGreyscale ) => {

  let titleTextSize = 36;
  let buttonTextSize = 32;

  if (fontSize === "Small") {
    titleTextSize = 28;
    buttonTextSize = 24;
  } else if (fontSize === "Medium") {
    titleTextSize = 32;
    buttonTextSize = 28;
  } else if (fontSize === "Large") {
    titleTextSize = 36;
    buttonTextSize = 32;
  }

  let topBannerColor = 'pink';
  let buttonColor = 'red';
  let buttonColorToggled = 'blue';
  let bottomButtonColor = 'maroon';

  if (isGreyscale === true) {
    topBannerColor = 'lightgrey'
    buttonColor = 'darkgrey';
    buttonColorToggled = 'black';
    bottomButtonColor = 'grey';
  }

  return styles = StyleSheet.create({ 
      container: { // GENERAL CONTAINER
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      buttonText: { // BUTTON TEXT
        fontSize: buttonTextSize,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
      },
      topBanner: { // TOP BANNER CONTAINER
        width: '100%',
        height: '12.5%', // 1/8 of vertical screenspace
        backgroundColor: topBannerColor, 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1%',
      },
      titleText: { // TOP BANNER TEXT
        fontSize: titleTextSize,
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
        backgroundColor: buttonColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
      gridButtonBig: { // 1x2 GRID BUTTON
        width: '98%', // Nearly full horizontal screenspace
        height: '48%', // Almost half of available vertical screenspace
        margin: '1%',
        backgroundColor: buttonColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
      gridButtonBigToggled: { // 1x2 GRID BUTTON TOGGLED
        width: '98%', // Nearly full horizontal screenspace
        height: '48%', // Almost half of available vertical screenspace
        margin: '1%',
        backgroundColor: buttonColorToggled,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
      bottomButton: { // COMMON USE: NAVIGATE, RETURN TO HOME
        width: '98%',
        height: '20%', // 1/5th of vertical screenspace
        backgroundColor: bottomButtonColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
      learnScreen_scrollContent: {
        flexGrow: 1,
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
      },
      learnScreen_listContainer: {
        width: '100%',
        alignItems: 'center',
      },
      learnScreen_listItem: { 
        width: '100%', // Full width
        height: 70, // Fixed height
        backgroundColor: buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderRadius: 15, 
        marginBottom: 5,
      },
      learnScreen_dropdownItem: {  
        width: '100%',
        height: 60,
        backgroundColor: topBannerColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 15, 
        paddingHorizontal: 60,
      },
      learnScreen_dropdownText: { 
        fontSize: buttonTextSize - 12,
        color: 'black',
        fontWeight: '500',
      },
      chatOutputBox: {
        width: '98%',
        height: '30%',
        margin: '1%',
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        padding: 10, 
        flex: 1,
      },
      chatOutputText: { // AI RESPONSE TEXT
        fontSize: (buttonTextSize - 5),
      },
      chatInputBox: { // USER INPUT BOX
        width: '98%',
        height: '30%', 
        margin: '1%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10,
        
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'grey',
      },
      chatTextInput: { // USER INPUT FIELD
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 90,
        fontSize: (buttonTextSize - 5),
      },
      chatVoiceButtonContainer: { // CONTAINER FOR VOICE INPUT BUTTONS
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginLeft: 5,
      },
      chatVoiceButton: { // VOICE INPUT BUTTONS
        backgroundColor: buttonColor,
        width: 125,
        paddingVertical: 40, 
        borderRadius: 10,
        marginBottom: 5, 
        alignItems: 'center', 
        justifyContent: 'center',
      },
      chatVoiceButtonToggled: { // VOICE INPUT STOP BUTTON
        backgroundColor: buttonColorToggled,
        width: 125,
        paddingVertical: 100, 
        borderRadius: 10,
        marginBottom: 5, 
        alignItems: 'center', 
        justifyContent: 'center',
      },
      ExploreHeading: {
        flex: 1,
        justifyContent: 'center',  // centers vertically
        alignItems: 'center',      // centers horizontally
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
      },
    });
  };
  

  export default createStyles;