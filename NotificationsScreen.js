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

const dummyNotifications = [
  { id: 'a', text: 'Gojo commented on your note.' },
  { id: 'b', text: 'New language lesson available.' },
  { id: 'c', text: 'Muffin Man sent you a friend request.' },
];

export default function NotificationsScreen({ navigation }) {
  const { fontSize, isGreyscale, isAutoRead } = useContext(Settings);
  const styles = createStyles(fontSize, isGreyscale);

  const message =
    'Now viewing: Notifications. Your recent alerts are listed below. Press back to return to Community. Press top right to repeat this message.';

  useEffect(() => {
    if (isAutoRead) speak(message);
  }, []);

  const renderNotification = ({ item }) => (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 12,
        marginVertical: 6,
        marginHorizontal: 16,
        borderRadius: 10,
        elevation: 2,
      }}
    >
      <Text style={[styles.buttonText, { color: '#000' }]}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Banner */}
      <View style={styles.topBanner}>
        <TouchableOpacity
          style={styles.topLeftBannerButton}
          onPress={() => navigate(navigation, 'Community')}
        >
          <FontAwesome5 name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.titleText}>Notifications</Text>

        <TouchableOpacity
          style={styles.topRightBannerButton}
          onPress={() => speak(message)}
        >
          <FontAwesome5 name="volume-up" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={dummyNotifications}
        keyExtractor={n => n.id}
        renderItem={renderNotification}
        contentContainerStyle={{ paddingVertical: 8 }}
      />

      {/* Return Button */}
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigate(navigation, 'Community')}
      >
        <Text style={styles.buttonText}>Return to Community</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
