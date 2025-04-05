import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Settings } from '../settings.js';
import createStyles from '../styles.js';
import { navigate, speak } from '../functions.js';

export default function ExamScreen({ navigation }) {
  const { fontSize, isGreyscale, isAutoRead } = useContext(Settings);
  createStyles(fontSize, isGreyscale);

  let dropdownColor = 'red';
  let generateColor = 'green';
  if (isGreyscale === true) {
    dropdownColor = 'darkgrey';
    generateColor = 'grey';
  }

  const message = "Now viewing: Exam page. Use the mode selector to choose between AI Generated and Premade exams. Press bottom banner to return home. Press top right banner to repeat this message.";
  useEffect(() => { if (isAutoRead) { speak(message); } }, []);

 
  const [examMode, setExamMode] = useState("AI");

  const [aiPrompt, setAiPrompt] = useState('');
  const [numQuestions, setNumQuestions] = useState('10');
  const [examResult, setExamResult] = useState('');


  const premadeTopics = ["Numbers", "Colors", "Greeting/Introduction", "Days/Months/Seasons", "Family"];
  const [premadeTopic, setPremadeTopic] = useState("Numbers");
  const premadeExams = {
    "Numbers": [
      { question: "What is '6' in Spanish?", answer: "seis" },
      { question: "Write '50' in Spanish.", answer: "cincuenta" },
      { question: "Listening Comprehension: (For demo, type 'N/A')", answer: "n/a" },
      { question: "In the sentence 'Yo tengo tres manzanas.', how many apples does the speaker have?", answer: "three" },
      { question: "Translate 'diez' into English.", answer: "ten" }
    ],
    "Colors": [
      { question: "What does 'azul' mean in English?", answer: "blue" },
      { question: "Choose the correct form: 'La camisa es (rojo/roja).' Which is correct?", answer: "roja" },
      { question: "Listening Comprehension: (For demo, type 'N/A')", answer: "n/a" },
      { question: "In the sentence 'El coche es negro.', what color is the car?", answer: "black" },
      { question: "Translate 'verde' into English.", answer: "green" }
    ],
    "Greeting/Introduction": [
      { question: "What does 'Hola' mean?", answer: "hello" },
      { question: "Translate 'My name is Anna' into Spanish.", answer: "me llamo anna" },
      { question: "Listening Comprehension: (For demo, type 'N/A')", answer: "n/a" },
      { question: "In the sentence 'Hola, me llamo Ana. ¿Cómo estás?', what is Ana's name?", answer: "ana" },
      { question: "Translate 'Buenos días' into English.", answer: "good morning" }
    ],
    "Days/Months/Seasons": [
      { question: "What is 'lunes' in English?", answer: "monday" },
      { question: "Identify the article: Why is 'mayo' used with 'el' in 'el mes de mayo'?", answer: "because mes is masculine" },
      { question: "Listening Comprehension: (For demo, type 'N/A')", answer: "n/a" },
      { question: "In the sentence 'Hoy es jueves y estamos en el mes de septiembre.', what day and month are mentioned?", answer: "thursday and september" },
      { question: "Translate 'invierno' into English.", answer: "winter" }
    ],
    "Family": [
      { question: "What is the English translation of 'madre'?", answer: "mother" },
      { question: "Explain the gender difference between 'hermano' and 'hermana'.", answer: "hermano is masculine and hermana is feminine" },
      { question: "Listening Comprehension: (For demo, type 'N/A')", answer: "n/a" },
      { question: "In the sentence 'Tengo dos hermanos y una hermana.', how many siblings does the speaker have and what are their genders?", answer: "three siblings: two brothers and one sister" },
      { question: "Translate 'padre' into English.", answer: "father" }
    ]
  };

  const [userAnswers, setUserAnswers] = useState(Array(5).fill(""));
  const [premadeResult, setPremadeResult] = useState("");

  const handleGenerateExam = () => {
    if (examMode === "AI") {
      const total = parseInt(numQuestions);
      const score = Math.floor(total / 2);
      let resultMessage = `Exam Generated. You scored ${score} out of ${total}.`;
      if (aiPrompt.trim() !== "") {
        resultMessage += " (AI-generated)";
      }
      setExamResult(resultMessage);
      speak(resultMessage);
    }
  };

  const handlePremadeSubmit = () => {
    const questions = premadeExams[premadeTopic];
    let correctCount = 0;
    let resultsText = `You got `;
    questions.forEach((q, index) => {
      const userAnswer = userAnswers[index].trim().toLowerCase();
      const correctAnswer = q.answer.trim().toLowerCase();
      if (userAnswer === correctAnswer) correctCount++;
    });
    resultsText += `${correctCount} out of ${questions.length} correct.\n`;
    questions.forEach((q, index) => {
      resultsText += `Question ${index + 1}: Your answer: ${userAnswers[index]} | Correct: ${q.answer}\n`;
    });
    setPremadeResult(resultsText);
    speak(resultsText);
  };

  
  const readAllQuestions = () => {
    const questions = premadeExams[premadeTopic];
    let combinedText = "";
    questions.forEach((q, index) => {
      combinedText += `Question ${index + 1}: ${q.question}. `;
    });
    speak(combinedText);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title Banner */}
      <View style={styles.topBanner}>
        <Text style={styles.titleText}>Exam</Text>
        <TouchableOpacity style={styles.topRightBannerButton} onPress={() => speak(message)}>
          <Image source={require('../assets/volume.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topLeftBannerButton} onPress={() => navigate(navigation, 'Practice')}>
          <Image source={require('../assets/back.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ width: '100%', paddingBottom: 100, paddingTop: 10 }}>
        {/* Mode Selector */}
        <Text style={{ paddingHorizontal: 10, fontSize: 18 }}>Select Mode</Text>
        <Picker
          selectedValue={examMode}
          onValueChange={(itemValue) => {
            setExamMode(itemValue);
            setExamResult("");
            setPremadeResult("");
          }}
          style={[styles.picker, { color: 'black' }]}
        >
          <Picker.Item label="AI Generated" value="AI" />
          <Picker.Item label="Premade" value="Premade" />
        </Picker>
        {examMode === "AI" ? (
          <>
            {/* AI Generated Exam */}
            <Text style={{ paddingHorizontal: 10 }}>AI Exam Generator</Text>
            <View style={styles.chatInputBox}>
              <TextInput
                style={[styles.Input, { width: '90%' }]}
                placeholder="Ex: Generate an exam with 10 multiple-choice questions about basic food items"
                value={aiPrompt}
                onChangeText={setAiPrompt}
              />
            </View>
            <TouchableOpacity style={[styles.dropdownContainer, { paddingHorizontal: 16, paddingVertical: 10, margin: '1%', backgroundColor: dropdownColor, borderRadius: 10 }]} >
              <Text style={[styles.labelText, { color: 'white', fontWeight: 'bold', fontSize: 18 }]}># of Questions</Text>
              <Picker
                selectedValue={numQuestions}
                onValueChange={(itemValue) => setNumQuestions(itemValue)}
                style={[styles.picker, { color: 'white' }]}
              >
                <Picker.Item label="10" value="10" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="30" value="30" />
              </Picker>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 35, margin: '1%', backgroundColor: generateColor, borderRadius: 10 }} onPress={handleGenerateExam}>
              <Text style={[styles.labelText, { color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }]}>Generate Exam</Text>
            </TouchableOpacity>
            {examResult !== "" && (
              <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 18, color: 'black', textAlign: 'center' }}>{examResult}</Text>
              </View>
            )}
          </>
        ) : (
          <>
            {/* Premade Exam */}
            <Text style={{ paddingHorizontal: 10, fontSize: 18 }}>Select Topic</Text>
            <Picker
              selectedValue={premadeTopic}
              onValueChange={(itemValue) => {
                setPremadeTopic(itemValue);
                setUserAnswers(Array(5).fill(""));
                setPremadeResult("");
              }}
              style={[styles.picker, { color: 'black' }]}
            >
              {premadeTopics.map(topic => (
                <Picker.Item key={topic} label={topic} value={topic} />
              ))}
            </Picker>
            {/* Read Aloud Questions Button */}
            <TouchableOpacity onPress={readAllQuestions} style={{ margin: '1%', padding: 10, backgroundColor: dropdownColor, borderRadius: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Read Aloud Questions</Text>
            </TouchableOpacity>
            {premadeExams[premadeTopic].map((q, index) => (
              <View key={index} style={{ marginVertical: 10, paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 16 }}>{`Q${index+1}: ${q.question}`}</Text>
                <TextInput
                  style={[styles.Input, { marginTop: 5 }]}
                  placeholder="Your answer"
                  value={userAnswers[index]}
                  onChangeText={(text) => {
                    const newAnswers = [...userAnswers];
                    newAnswers[index] = text;
                    setUserAnswers(newAnswers);
                  }}
                />
              </View>
            ))}
            <TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 35, margin: '1%', backgroundColor: generateColor, borderRadius: 10 }} onPress={handlePremadeSubmit}>
              <Text style={[styles.labelText, { color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }]}>Submit Exam</Text>
            </TouchableOpacity>
            {premadeResult !== "" && (
              <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 16, color: 'black', textAlign: 'left' }}>{premadeResult}</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
      <View style={[styles.topBanner, { marginBottom: '0%', marginTop: '1%' }]}>
        <TouchableOpacity style={[styles.bottomButton, { height: '95%' }]} onPress={() => navigate(navigation, 'Home')}>
          <Text style={styles.buttonText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
