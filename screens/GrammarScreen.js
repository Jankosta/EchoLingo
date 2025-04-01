// GrammarScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Settings } from '../settings';
import createStyles from '../styles';
import { navigate, speak } from '../functions';
import { grammarLessons } from '../data/grammarData';

export default function GrammarScreen({ navigation }) {
  const { fontSize, isGreyscale, isAutoRead } = useContext(Settings);

  const fontSizeMapping = {
    Small: 12,
    Medium: 14,
    Large: 16,
    Large2: 18,
  };
  const numericFontSize = typeof fontSize === 'string' ? fontSizeMapping[fontSize] || 16 : fontSize;
  const styles = createStyles(numericFontSize, isGreyscale);

  const message = 'Now viewing: Grammar. Explore grammar explanations with examples. Press the bottom button to return home.';

  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedLesson, setExpandedLesson] = useState(null);

  useEffect(() => {
    if (isAutoRead) speak(message);
  }, []);

  const toggleCategory = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
    setExpandedLesson(null);
  };

  const toggleLesson = (index) => {
    setExpandedLesson(expandedLesson === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Banner */}
      <View style={styles.topBanner}>
        <TouchableOpacity
          style={styles.topLeftBannerButton}
          onPress={() => navigate(navigation, 'Learn')}
        >
          <Image source={require('../assets/back.png')} style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.titleText}>Grammar</Text>

        <TouchableOpacity
          style={styles.topRightBannerButton}
          onPress={() => speak(message)}
        >
          <Image source={require('../assets/volume.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Grammar Content */}
      <ScrollView contentContainerStyle={styles.learnScreen_scrollContent}>
        <View style={styles.learnScreen_listContainer}>
          {grammarLessons.map((category, catIndex) => (
            <View key={catIndex} style={{ marginBottom: 16 }}>
              <TouchableOpacity onPress={() => toggleCategory(catIndex)}>
                <Text style={[styles.buttonText, { fontSize: numericFontSize + 2, color: '#000' }]}>📂 {category.topic}</Text>
              </TouchableOpacity>

              {expandedCategory === catIndex && (
                <View style={{ marginLeft: 12, marginTop: 6 }}>
                  {category.lessons.map((lesson, lessonIndex) => (
                    <View key={lessonIndex} style={{ marginBottom: 10 }}>
                      <TouchableOpacity onPress={() => toggleLesson(lessonIndex)}>
                        <Text style={[styles.buttonText, { fontSize: numericFontSize, fontWeight: 'bold', color: '#000' }]}>🔽 {lesson.title}</Text>
                      </TouchableOpacity>

                      {expandedLesson === lessonIndex && (
                        <View style={{ marginLeft: 12, marginTop: 4 }}>
                          <Text style={[styles.learnScreen_dropdownText, { color: '#000' }]}><Text style={{ fontWeight: 'bold' }}>Explanation:</Text> {lesson.explanation}</Text>
                          <Text style={[styles.learnScreen_dropdownText, { color: '#000' }]}><Text style={{ fontWeight: 'bold' }}>Example:</Text> {lesson.example}</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Return Button */}
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigate(navigation, 'Home')}
      >
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}