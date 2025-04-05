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

  const fontSizeMapping = {
    Small: 12,
    Medium: 14,
    Large: 16,
    Large2: 18,
  };
  const numericFontSize = typeof fontSize === 'string' ? fontSizeMapping[fontSize] || 16 : fontSize;
  const styles = createStyles(numericFontSize, isGreyscale);

  const message = 'Now viewing: Learn. Scroll to explore reading materials, videos, grammar lessons, vocabulary and pronunciation, and notes. Tap on each item to begin learning. Press top left to go back. Press bottom banner to return home. Press top right to repeat this message.';

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const response = await fetch(`http://localhost:5000/api/materials?type=text&language=${selectedLanguage}`);
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.log("Fetch failed silently:", error);
        setMaterials([]);
      }
    }

    fetchMaterials();
    if (isAutoRead) speak(message);
  }, [selectedLanguage]);

  useEffect(() => {
    if (materials.length === 0 && isAutoRead) {
      speak(`No learning materials available for ${selectedLanguage}`);
    }
  }, [materials]);

  const [dropdowns, setDropdowns] = useState({
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

  async function startRecording() {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return alert('Microphone permission not granted!');
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
    if (!isRecording) await startRecording();
    else await stopRecording();
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
    if (isRecording) await stopRecording();
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

  const buttonCommon = {
    alignSelf: 'center',
    width: '90%',
    marginVertical: 10,
    paddingVertical: 16,
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
          {/* Buttons */}
          {[
            { label: 'Read & Learn', screen: 'Text Materials' },
            { label: 'Watch & Learn', screen: 'VideoMaterials' },
            { label: 'Grammar', screen: 'Grammar' },
            { label: 'Vocabulary & Pronunciation', screen: 'VocabPronunciation' },
          ].map(({ label, screen }) => (
            <TouchableOpacity
              key={label}
              style={[styles.learnScreen_listItem, buttonCommon]}
              onPress={() => navigate(navigation, screen)}
            >
              <Text style={[styles.buttonText, { fontSize: 20, textAlign: 'center' }]}>{label}</Text>
            </TouchableOpacity>
          ))}

          {/* Notes */}
          <TouchableOpacity
            style={[styles.learnScreen_listItem, buttonCommon]}
            onPress={() => toggleDropdown('notes')}
          >
            <Text style={[styles.buttonText, { fontSize: 20, textAlign: 'center' }]}>My Notes</Text>
          </TouchableOpacity>

          {dropdowns.notes && (
            <>
              <TouchableOpacity
                style={styles.learnScreen_dropdownItem}
                onPress={() => {
                  speak('Create a note');
                  setNoteModalVisible(true);
                }}
              >
                <Text style={styles.learnScreen_dropdownText}>+ Create a Note</Text>
              </TouchableOpacity>

              {savedNotes.length > 0 &&
                savedNotes.map((note, index) => (
                  <View key={index} style={modalStyles.noteItem}>
                    <Text style={modalStyles.noteTitle}>{note.title} ({note.category})</Text>
                    <Text style={modalStyles.noteTranscript}>{note.transcript}</Text>
                    <TouchableOpacity onPress={() => speak(note.transcript)}>
                      <Text style={modalStyles.playButtonText}>Play Note</Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigate(navigation, 'Home')}
      >
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>

      {/* Note Modal */}
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
            />
            <TextInput
              style={modalStyles.input}
              placeholder="Note Category"
              value={noteCategory}
              onChangeText={setNoteCategory}
            />
            <TextInput
              style={[modalStyles.input, { height: 100 }]}
              placeholder="Your note will appear here..."
              value={noteTranscript}
              multiline
              editable={false}
            />
            <TouchableOpacity
              style={modalStyles.recordButton}
              onPress={handleRecord}
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
              >
                <Text style={styles.buttonText}>Save Note</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={modalStyles.cancelButton}
                onPress={handleCancel}
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