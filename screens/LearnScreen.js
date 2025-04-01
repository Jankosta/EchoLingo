import React, { useEffect, useContext, useState } from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { Settings } from '../settings';
import createStyles from '../styles.js';
import { navigate, speak } from '../functions.js';
import { Audio } from 'expo-av';

export default function LearnScreen({ navigation }) {
  const { fontSize, isGreyscale, isAutoRead, selectedLanguage } = useContext(Settings);
  const [materials, setMaterials] = useState([]); 

  // Mapping font size strings to numeric values
  const fontSizeMapping = {
    Small: 12,
    Medium: 14,
    Large: 16,
    Large2: 18,
  };
  const numericFontSize = typeof fontSize === 'string' ? fontSizeMapping[fontSize] || 16 : fontSize;
  const styles = createStyles(numericFontSize, isGreyscale);

  const message = 'Now viewing: Learn.';
  useEffect(() => {
    if (isAutoRead) {
      speak(message);
    }
  }, []);

  // Fetch learning materials when selectedLanguage changes
  useEffect(() => {
    fetch(`http://localhost:5000/api/materials?type=text&language=${selectedLanguage}`)
      .then((response) => response.json())
      .then((data) => setMaterials(data))
      .catch((error) => console.error("Error fetching materials:", error));

      speak("Welcome to EchoLingo!", selectedLanguage);

  }, [selectedLanguage]);  

  const [dropdowns, setDropdowns] = useState({
    language: false,
    text: false,
    videos: false,
    notes: false,
  });

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteCategory, setNoteCategory] = useState('');
  const [noteTranscript, setNoteTranscript] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);

  const [isRecording, setIsRecording] = useState(false);
  let recordingRef = null; // Variable for the recording object

  async function startRecording() {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        alert('Microphone permission not granted!');
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      setIsRecording(true);
      speak('Recording started. Please speak your note.');
    } catch (err) {
      console.error('startRecording error:', err);
    }
  }

  async function stopRecording() {
    try {
      setIsRecording(false);
      speak('Recording stopped.');

      const simulatedTranscript = 'Simulated note transcript captured from your speech.';
      setNoteTranscript(simulatedTranscript);
    } catch (err) {
      console.error('stopRecording error:', err);
    } finally {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: false,
      });
    }
  }

  const handleRecord = async () => {
    if (!isRecording) {
      await startRecording();
    } else {
      await stopRecording();
    }
  };

  const handleSaveNote = () => {
    if (noteTranscript) {
      const newNote = {
        title: noteTitle || 'Untitled',
        category: noteCategory || 'General',
        transcript: noteTranscript,
        timestamp: new Date().toISOString(),
      };
      setSavedNotes([...savedNotes, newNote]);
      setNoteTitle('');
      setNoteCategory('');
      setNoteTranscript('');
      setNoteModalVisible(false);
      speak('Note saved successfully.');
    }
  };

  const handleCancel = async () => {
    if (isRecording) {
      await stopRecording();
    }
    setNoteTitle('');
    setNoteCategory('');
    setNoteTranscript('');
    setIsRecording(false);
    setNoteModalVisible(false);
    speak('Note creation cancelled.');
  };

  const modalStyles = {
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    modalTitle: {
      fontSize: numericFontSize + 2,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      fontSize: numericFontSize,
    },
    recordButton: {
      backgroundColor: '#007AFF',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      alignItems: 'center',
    },
    modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    saveButton: {
      backgroundColor: '#34C759',
      padding: 10,
      borderRadius: 5,
      flex: 1,
      marginRight: 5,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: '#FF3B30',
      padding: 10,
      borderRadius: 5,
      flex: 1,
      marginLeft: 5,
      alignItems: 'center',
    },
    noteItem: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
    },
    noteTitle: {
      fontSize: numericFontSize,
      fontWeight: 'bold',
    },
    noteTranscript: {
      fontSize: numericFontSize,
      marginVertical: 5,
    },
    playButtonText: {
      color: '#007AFF',
      textDecorationLine: 'underline',
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBanner}>
        <TouchableOpacity
          style={styles.topLeftBannerButton}
          onPress={() => navigate(navigation, 'Home')}
        >
          <Image source={require('../assets/back.png')} style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.titleText}>Learn</Text>

        <TouchableOpacity
          style={styles.topRightBannerButton}
          onPress={() => speak(message)}
        >
          <Image source={require('../assets/volume.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.learnScreen_scrollContent}>
        <View style={styles.learnScreen_listContainer}>
          {/* Text Materials */}
          <TouchableOpacity
            style={styles.learnScreen_listItem}
            onPress={() => navigate(navigation, 'Text Materials')}
          >
            <Text style={styles.buttonText}>Read & Learn</Text>
          </TouchableOpacity>

          {/* Display fetched learning materials */}
          {materials.length > 0 ? (
            materials.map((material, index) => (
              <View key={index} style={styles.learnScreen_listItem}>
                <Text style={styles.buttonText}>{material.title}</Text>
                <Text style={{ fontSize: numericFontSize - 2 }}>{material.type}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.learnScreen_dropdownText}>
              No learning materials available for {selectedLanguage}.
            </Text>
          )}

          {/* Videos */}
          <TouchableOpacity
            style={styles.learnScreen_listItem}
            onPress={() => {
              speak('Explore learning videos');
              navigate(navigation, 'VideoMaterials');
            }}
          >
            <Text style={styles.buttonText}>Watch & Learn</Text>
          </TouchableOpacity>

          {/* Grammar */}
          <TouchableOpacity
            style={styles.learnScreen_listItem}
            onPress={() => navigate(navigation, 'Grammar')}
          >
            <Text style={styles.buttonText}>Grammar</Text>
          </TouchableOpacity>

          {/* Vocab & Pronunciation */}
          <TouchableOpacity
            style={styles.learnScreen_listItem}
            onPress={() => navigate(navigation, 'VocabPronunciation')}
          >
            <Text style={styles.buttonText}>Vocabulary & Pronunciation</Text>
          </TouchableOpacity>

          {/* My Notes */}
          <TouchableOpacity
            style={styles.learnScreen_listItem}
            onPress={() => toggleDropdown('notes')}
          >
            <Text style={styles.buttonText}>My Notes</Text>
          </TouchableOpacity>
          {dropdowns.notes && (
            <>
              <TouchableOpacity
                style={styles.learnScreen_dropdownItem}
                onPress={() => {
                  speak('Create a note');
                  setNoteModalVisible(true);
                }}
                accessibilityLabel="Create a new note"
              >
                <Text style={styles.learnScreen_dropdownText}>+ Create a Note</Text>
              </TouchableOpacity>
              
              {/* Display saved notes */}
              {savedNotes.length > 0 ? (
                savedNotes.map((note, index) => (
                  <View key={index} style={modalStyles.noteItem}>
                    <Text style={modalStyles.noteTitle}>
                      {note.title} ({note.category})
                    </Text>
                    <Text style={modalStyles.noteTranscript}>{note.transcript}</Text>
                    <TouchableOpacity
                      onPress={() => speak(note.transcript)}
                      accessibilityLabel="Replay note"
                    >
                      <Text style={modalStyles.playButtonText}>Play Note</Text>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text style={styles.learnScreen_dropdownText}>
                  No notes saved yet.
                </Text>
              )}
            </>
          )}
        </View>
      </ScrollView>

      {/* Return Button */}
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigate(navigation, 'Home')}
      >
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>

      {/* Note Creation Modal */}
      <Modal
        visible={noteModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setNoteModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <Text style={modalStyles.modalTitle}>Create a Note</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="Note Title"
              value={noteTitle}
              onChangeText={setNoteTitle}
              accessibilityLabel="Note title input"
            />
            <TextInput
              style={modalStyles.input}
              placeholder="Note Category"
              value={noteCategory}
              onChangeText={setNoteCategory}
              accessibilityLabel="Note category input"
            />
            <TextInput
              style={[modalStyles.input, { height: 100 }]}
              placeholder="Your note will appear here..."
              value={noteTranscript}
              multiline={true}
              editable={false}
              accessibilityLabel="Note transcript"
            />
            <TouchableOpacity
              style={modalStyles.recordButton}
              onPress={handleRecord}
              accessibilityLabel={isRecording ? 'Stop recording' : 'Start recording'}
            >
              <Text style={styles.buttonText}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Text>
            </TouchableOpacity>
            <View style={modalStyles.modalButtonContainer}>
              <TouchableOpacity
                style={modalStyles.saveButton}
                onPress={handleSaveNote}
                disabled={isRecording || !noteTranscript}
                accessibilityLabel="Save note"
              >
                <Text style={styles.buttonText}>Save Note</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={modalStyles.cancelButton}
                onPress={handleCancel}
                accessibilityLabel="Cancel note creation"
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}