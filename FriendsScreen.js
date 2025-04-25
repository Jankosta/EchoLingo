import React, { useEffect, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Settings } from '../settings.js';
import createStyles from '../styles.js';
import { navigate, speak } from '../functions.js';
import { FontAwesome5 } from '@expo/vector-icons';

const dummyFriends = [
  { id: '1', name: 'Gojo', languages: ['Spanish'] },
  { id: '2', name: 'Muffin Man',    languages: ['French','German'] },
  { id: '3', name: 'Meow',  languages: ['Meow'] },
];

export default function FriendsScreen({ navigation }) {
  const { fontSize, isGreyscale, isAutoRead } = useContext(Settings);
  const styles = createStyles(fontSize, isGreyscale);

  const message =
    'Now viewing: Friends. Your connections are listed below. Tap back to return to Community. Press top right to repeat this message.';
  useEffect(() => { if (isAutoRead) speak(message); }, []);

  const renderFriend = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: '#fff',
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 16,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
      }}
      onPress={() => {/* you could navigate to a detailed profile if you want */}}
    >
      <FontAwesome5 name="user-circle" size={32} color="#007AFF" style={{ marginRight: 12 }} />
      <View>
        <Text style={[styles.titleText, { marginBottom: 4 }]}>{item.name}</Text>
        <Text style={{ color: '#555' }}>
          {item.languages.length
            ? item.languages.join(', ')
            : 'No languages added'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBanner}>
        <TouchableOpacity
          style={styles.topLeftBannerButton}
          onPress={() => navigate(navigation, 'Community')}
        >
          <FontAwesome5 name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.titleText}>Friends</Text>
        <TouchableOpacity
          style={styles.topRightBannerButton}
          onPress={() => speak(message)}
        >
          <FontAwesome5 name="volume-up" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={dummyFriends}
        keyExtractor={f => f.id}
        renderItem={renderFriend}
        contentContainerStyle={{ paddingVertical: 8 }}
      />

      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigate(navigation, 'Community')}
      >
        <Text style={styles.buttonText}>Return to Community</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
