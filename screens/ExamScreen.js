/*
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Modal, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Settings } from '../settings.js';
import createStyles from '../styles.js';
import { navigate, speak } from '../functions.js';

// Custom Checkbox Component
const CustomCheckBox = ({ value, onValueChange }) => (
  <TouchableOpacity
    onPress={() => onValueChange(!value)}
    style={{
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: 'gray',
      backgroundColor: value ? 'blue' : 'white',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {value && <Text style={{ color: 'white', fontSize: 18 }}>✔</Text>}
  </TouchableOpacity>
);

export default function ExamScreen({ navigation }) {
  const { fontSize, isGreyscale, isAutoRead } = useContext(Settings);

  createStyles(fontSize, isGreyscale);

  let dropdownColor = 'red';
  let generateColor = 'green';

  if (isGreyscale === true) {
    dropdownColor = 'darkgrey';
    generateColor = 'grey';
  }

  const message = "Now viewing: Exam page. Exam buttons from top to bottom: AI Exam Generator, number of questions, question format, exam topics, generate exam. Press bottom banner to return home. Press top right banner to repeat this message.";
  useEffect(() => {
    if (isAutoRead) {
      speak(message);
    }
  }, []);

  const [aiPrompt, setAiPrompt] = useState('');
  const [numQuestions, setNumQuestions] = useState('10'); // Single selection
  const [questionFormat, setQuestionFormat] = useState([]); // Multi-selection
  const [examTopic, setExamTopic] = useState([]); // Multi-selection
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSelection, setCurrentSelection] = useState('');
  const [options, setOptions] = useState([]);

  const dropdownOptions = {
    questionFormat: ['Basic Vocabulary', 'Grammar', 'Listening Comprehension', 'Translating'],
    examTopic: ['Food', 'Animals', 'Colors', 'Numbers'],
  };

  const handleSelection = (item) => {
    const current = currentSelection === 'questionFormat' ? questionFormat : examTopic;
    const setCurrent = currentSelection === 'questionFormat' ? setQuestionFormat : setExamTopic;

    if (current.includes(item)) {
      setCurrent(current.filter((i) => i !== item));
    } else {
      setCurrent([...current, item]);
    }
  };

  const openModal = (type) => {
    setCurrentSelection(type);
    setOptions(dropdownOptions[type]);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Title Banner /}
      <View style={styles.topBanner}>
        <Text style={styles.titleText}>Exam</Text>

        <TouchableOpacity style={styles.topRightBannerButton} onPress={() => speak(message)}>
          <Image source={require('../assets/volume.png')} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.topLeftBannerButton} onPress={() => navigate(navigation, 'Practice')}>
          <Image source={require('../assets/back.png')} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content /}
      <ScrollView contentContainerStyle={{ width: '100%', paddingBottom: 100, paddingTop: 10 }}>
        {/* AI Prompt Input /}
        <Text style={{ paddingHorizontal: 10 }}>AI Exam Generator</Text>
        <View style={styles.chatInputBox}>
          <TextInput
            style={[styles.Input, { width: '90%' }]}
            placeholder="Ex: Generate an exam with 10 multiple-choice questions about basic food items"
            value={aiPrompt}
            onChangeText={setAiPrompt}
          />
        </View>

        {/* Single-Select for Number of Questions /}
        <TouchableOpacity style={[styles.dropdownContainer, { paddingHorizontal: 16, paddingVertical: 10, margin: '1%', backgroundColor: dropdownColor, borderRadius: 10 }]}>
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

        {/* Multi-Select for Question Format /}
        <TouchableOpacity onPress={() => openModal('questionFormat')} style={[styles.dropdownContainer, { paddingHorizontal: 16, paddingVertical: 35, margin: '1%', backgroundColor: dropdownColor, borderRadius: 10 }]}>
          <Text style={[styles.labelText, { color: 'white', fontWeight: 'bold', fontSize: 18 }]}>Question Format: {questionFormat.join(', ') || 'Select'}</Text>
        </TouchableOpacity>

        {/* Multi-Select for Exam Topics /}
        <TouchableOpacity onPress={() => openModal('examTopic')} style={[styles.dropdownContainer, { paddingHorizontal: 16, paddingVertical: 35, margin: '1%', backgroundColor: dropdownColor, borderRadius: 10 }]}>
          <Text style={[styles.labelText, { color: 'white', fontWeight: 'bold', fontSize: 18 }]}>Exam Topics: {examTopic.join(', ') || 'Select'}</Text>
        </TouchableOpacity>

        {/* Generate Exam Button /}
        <TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 35, margin: '1%', backgroundColor: generateColor, borderRadius: 10 }}>
        <Text style={[styles.labelText, { color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }]}>Generate Exam</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal for Multi-Select /}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                  <CustomCheckBox
                    value={
                      currentSelection === 'questionFormat'
                        ? questionFormat.includes(item)
                        : examTopic.includes(item)
                    }
                    onValueChange={() => handleSelection(item)}
                  />
                  <Text style={{ fontSize: 18, marginLeft: 10 }}>{item}</Text>
                </View>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20, alignSelf: 'center' }}>
              <Text style={{ color: 'blue', fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Return Button /}
      <View style={[styles.topBanner, { marginBottom: '0%', marginTop: '1%' }]}>
        <TouchableOpacity style={[styles.bottomButton, { height: '95%' }]} onPress={() => navigate(navigation, 'Home')}>
          <Text style={styles.buttonText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
*/

import { Text, View, Image, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useEffect, useContext, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Settings } from '../settings.js';
import createStyles from '../styles.js';
import { navigate, speak } from '../functions.js';

// Custom Checkbox Component
const CustomCheckBox = ({ value, onValueChange }) => (
  <TouchableOpacity
    onPress={() => onValueChange(!value)}
    style={{
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: 'gray',
      backgroundColor: value ? 'blue' : 'white',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {value && <Text style={{ color: 'white', fontSize: 18 }}>✔</Text>}
  </TouchableOpacity>
);

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
  const [questionFormat, setQuestionFormat] = useState('Multiple Choice');
  const [examTopic, setExamTopic] = useState('Numbers');
  const [examResult, setExamResult] = useState('');
  const [generatedExam, setGeneratedExam] = useState([]);

  const premadeTopics = ["Numbers", "Colors", "Greeting/Introduction", "Days/Months/Seasons", "Family"];
  const [premadeTopic, setPremadeTopic] = useState("Numbers");
  const premadeExams = {
    "Numbers": [
      { question: "What is '6' in Spanish?", answer: ["seis"] },
      { question: "Write '50' in Spanish.", answer: ["cincuenta"] },
      { question: "Listening Comprehension: (For demo, type 'N/A')", answer: ["n/a"] },
      { question: "In the sentence 'Yo tengo tres manzanas.', how many apples does the speaker have?", answer: ["three", "3"] },
      { question: "Translate 'diez' into English.", answer: ["ten"] }
    ],
    "Colors": [
      { question: "What does 'azul' mean in English?", answer: ["blue"] },
      { question: "Choose the correct form: 'La camisa es (rojo/roja).' Which is correct?", answer: ["roja"] },
      { question: "Listening Comprehension: (For demo, type 'N/A')", answer: ["n/a"] },
      { question: "In the sentence 'El coche es negro.', what color is the car?", answer: ["black"] },
      { question: "Translate 'verde' to English.", answer: ["green"] }
    ],
    /*"Greeting/Introduction": [
      { question: "What does 'Hola' mean?", answer: "hello" },
      { question: "Translate 'My name is Anna' into Spanish.", answer: "me llamo anna" },
      { question: "Listening Comprehension: (For demo, type 'N/A')", answer: "n/a" },
      { question: "In the sentence 'Hola, me llamo Ana. ¿Cómo estás?', what is Ana's name?", answer: "ana" },
      { question: "Translate 'Buenos días' to English.", answer: "good morning" }
    ],*/
    "Greeting/Introduction": [
      { question: "What does 'Hola' mean?", answer: ["hello"] },
      { question: "Translate 'My name is Anna' into Spanish.", answer: ["me llamo anna", "mi nombre es anna"] },
      { question: "Listening Comprehension: (For demo, type 'N/A')", answer: ["n/a"] },
      { question: "In the sentence 'Hola, me llamo Ana. ¿Cómo estás?', what is Ana's name?", answer: ["ana"] },
      { question: "Translate 'Buenos días' to English.", answer: ["good morning"] }
    ],
    "Days/Months/Seasons": [
      { question: "What is 'lunes' in English?", answer: ["monday"] },
      { question: "Identify the article: Why is 'mayo' used with 'el' in 'el mes de mayo'?", answer: ["because mes is masculine"] },
      { question: "Listening Comprehension: (For demo, type 'N/A')", answer: "n/a" },
      { question: "In the sentence 'Hoy es jueves y estamos en el mes de septiembre.', what day and month are mentioned?", answer: ["thursday and september"] },
      { question: "Translate 'invierno' into English.", answer: ["winter"] }
    ],
    "Family": [
      { question: "What is the English translation of 'madre'?", answer: ["mother", "mom"] },
      { question: "Explain the gender difference between 'hermano' and 'hermana'.", answer: ["hermano is masculine and hermana is feminine"] },
      { question: "Listening Comprehension: (For demo, type 'N/A')", answer: ["n/a"] },
      { question: "In the sentence 'Tengo dos hermanos y una hermana.', how many siblings does the speaker have and what are their genders?", answer: ["three siblings: two brothers and one sister"] },
      { question: "Translate 'padre' into English.", answer: ["father", "dad"] }
    ]
  };

  const [userAnswers, setUserAnswers] = useState(Array(5).fill(""));
  const [premadeResult, setPremadeResult] = useState("");

  /*const handleGenerateExam = () => {
    if (examMode === "AI") {
      const total = parseInt(numQuestions);
      const score = Math.floor(total / 2); // Simulate half correct
      let resultMessage = `Exam Generated. You answered ${score} out of ${total} questions correctly.`;
      if (aiPrompt.trim() !== "") {
        resultMessage += " (AI-generated)";
      }
      setExamResult(resultMessage);
      speak(resultMessage);
    }
  };*/

  const handleGenerateExam = () => {
    if (examMode === "AI") {
      const total = parseInt(numQuestions);
      const topic = examTopic.toLowerCase();
      const format = questionFormat.toLowerCase();
  
      // Example question templates for AI generation
      const questionTemplates = {
        "basic vocabulary": {
          "numbers": [
            { question: "What is '{number}' in Spanish?", answer: (num) => [num.toString(), translateNumberToSpanish(num)] },
            { question: "Translate '{number}' into Spanish.", answer: (num) => [num.toString(), translateNumberToSpanish(num)] },
          ],
          "colors": [
            { question: "What is '{color}' in Spanish?", answer: (color) => [translateColorToSpanish(color)] },
            { question: "Translate '{color}' into Spanish.", answer: (color) => [translateColorToSpanish(color)] },
          ],
        },
        // Add more formats and topics as needed
      };
  
      // Generate questions dynamically
      const generatedQuestions = [];
      const templates = questionTemplates[format]?.[topic];
      const usedVariables = new Set(); // Initialize usedVariables as a Set
      if (templates) {
        for (let i = 0; i < total; i++) {
          const template = templates[i % templates.length];
          const variable = generateVariableForTopic(topic, usedVariables); // Pass usedVariables to ensure uniqueness
          const questionText = template.question.replace("{number}", variable).replace("{color}", variable);
          const answers = template.answer(variable);
          generatedQuestions.push({ question: questionText, answer: answers });
        }
      }
  
      // Display the generated exam
      if (generatedQuestions.length > 0) {
        setGeneratedExam(generatedQuestions);
        setUserAnswers(Array(generatedQuestions.length).fill(""));
        setExamResult("");

        // Read the questions aloud
        let combinedText = "Here are your questions: ";
        generatedQuestions.forEach((q, index) => {
          combinedText += `Question ${index + 1}: ${q.question}. `;
        });
        speak(combinedText); // Use the speak function to read the questions aloud
      } else {
        let errorMessage = "Failed to generate exam. Please check your settings.";
        setExamResult(errorMessage);
        speak(errorMessage);
      }
    }
  };

  /*const handleSubmitGeneratedExam = () => {
    let correctCount = 0;
    let resultsText = `You got `;
    generatedExam.forEach((q, index) => {
      const userAnswer = userAnswers[index].trim().toLowerCase();
      const correctAnswers = q.answer.map(ans => ans.trim().toLowerCase());
      if (correctAnswers.includes(userAnswer)) correctCount++;
    });
    resultsText += `${correctCount} out of ${generatedExam.length} correct.\n`;
    generatedExam.forEach((q, index) => {
      resultsText += `Question ${index + 1}: Your answer: ${userAnswers[index]} | Correct: ${q.answer.join(" or ")}\n`;
    });
    setExamResult(resultsText);
    speak(resultsText);
  };*/

  const handleSubmitGeneratedExam = () => {
    let correctCount = 0;
    let incorrectQuestions = [];
  
    // Check each question and determine if the user's answer is correct
    generatedExam.forEach((q, index) => {
      const userAnswer = userAnswers[index].trim().toLowerCase();
      const correctAnswers = q.answer.map(ans => ans.trim().toLowerCase());
      if (correctAnswers.includes(userAnswer)) {
        correctCount++;
      } else {
        incorrectQuestions.push({
          questionIndex: index + 1, // Store the original question number
          question: q.question,
          userAnswer: userAnswers[index],
          correctAnswers: q.answer,
        });
      }
    });
  
    // Build the results text
    let resultsText = `You got ${correctCount} out of ${generatedExam.length} correct.\n\n`;
    if (incorrectQuestions.length > 0) {
      resultsText += "Here are the questions you got wrong:\n";
      incorrectQuestions.forEach((q) => {
        resultsText += `Q${q.questionIndex}: ${q.question}\n`; // Use the original question number
        resultsText += `Your answer: ${q.userAnswer || "No answer"}\n`;
        resultsText += `Correct answers: ${q.correctAnswers.join(" or ")}\n\n`;
      });
    } else {
      resultsText += "Great job! You answered all questions correctly!";
    }
  
    // Update the state with the results
    setExamResult(resultsText);
    speak(resultsText);
  };
  
  // Helper function to translate numbers to Spanish
  const translateNumberToSpanish = (number) => {
    const numberMap = {
      0: "cero",
      1: "uno",
      2: "dos",
      3: "tres",
      4: "cuatro",
      5: "cinco",
      6: "seis",
      7: "siete",
      8: "ocho",
      9: "nueve",
      10: "diez",
      20: "veinte",
      30: "treinta",
      40: "cuarenta",
      50: "cincuenta",
      60: "sesenta",
      70: "setenta",
      80: "ochenta",
      90: "noventa",
      100: "cien",
      // Add more numbers as needed
    };
    return numberMap[number] || number.toString();
  };
  
  // Helper function to generate variables for topics
  const generateVariableForTopic = (topic, usedVariables) => {
    if (topic === "numbers") {
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      let newNumber;
      do {
        newNumber = numbers[Math.floor(Math.random() * numbers.length)]; // Randomly select a number from numberMap keys
      } while (usedVariables.has(newNumber)); // Ensure the number is not already used
      usedVariables.add(newNumber); // Add the new number to the set of used variables
      return newNumber;
    } else if (topic === "colors") {
      const colors = ["red", "blue", "green", "yellow", "black", "white", "orange", "purple", "pink", "grey", "brown"];
      let newColor;
      do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
      } while (usedVariables.has(newColor)); // Ensure the color is not already used
      usedVariables.add(newColor); // Add the new color to the set of used variables
      return newColor;
    }
    return "";
  };
  
  // Helper function to translate colors to Spanish
  const translateColorToSpanish = (color) => {
    const colorMap = {
      red: "rojo",
      blue: "azul",
      green: "verde",
      yellow: "amarillo",
      black: "negro",
      white: "blanco",
      orange: "naranja",
      purple: "morado",
      pink: "rosado",
      grey: "gris",
      brown: "marron",
      // Add more colors as needed
    };
    return colorMap[color] || color;
  };

  /*const handlePremadeSubmit = () => {
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
  };*/

  const handlePremadeSubmit = () => {
    const questions = premadeExams[premadeTopic];
    let correctCount = 0;
    let resultsText = `You got `;
    questions.forEach((q, index) => {
      const userAnswer = userAnswers[index].trim().toLowerCase();
      const correctAnswers = q.answer.map(ans => ans.trim().toLowerCase());
      if (correctAnswers.includes(userAnswer)) correctCount++;
    });
    resultsText += `${correctCount} out of ${questions.length} correct.\n`;
    questions.forEach((q, index) => {
      resultsText += `Question ${index + 1}: Your answer: ${userAnswers[index]} | Correct: ${q.answer.join(" or ")}\n`;
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
        <TouchableOpacity style={styles.topLeftBannerButton} onPress={() => navigate(navigation, "Practice")}>
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
            <View style={[styles.chatInputBox, { height: 150 }]}>
              <TextInput
                style={[styles.Input, { width: '90%'}]}
                placeholder="Ex: Generate a exam with 10 multiple-choice questions about basic food items"
                value={aiPrompt}
                onChangeText={setAiPrompt}
              />
            </View>
            <TouchableOpacity style={[styles.dropdownContainer, { paddingHorizontal: 16, paddingVertical: 10, margin: '1%', backgroundColor: dropdownColor, borderRadius: 10 }]}>
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
            <TouchableOpacity style={[styles.dropdownContainer, { paddingHorizontal: 16, paddingVertical: 10, margin: '1%', backgroundColor: dropdownColor, borderRadius: 10 }]}>
              <Text style={[styles.labelText, { color: 'white', fontWeight: 'bold', fontSize: 18 }]}>Question Format</Text>
              <Picker
                selectedValue={questionFormat}
                onValueChange={(itemValue) => setQuestionFormat(itemValue)}
                style={[styles.picker, { color: 'white' }]}
              >
                <Picker.Item label="Basic Vocabulary" value="Basic Vocabulary" />
                <Picker.Item label="Grammar" value="Grammar" />
                <Picker.Item label="Listening Comprehension" value="Listening Comprehension" />
                <Picker.Item label="Translating" value="Translating" />
              </Picker>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dropdownContainer, { paddingHorizontal: 16, paddingVertical: 10, margin: '1%', backgroundColor: dropdownColor, borderRadius: 10 }]}>
              <Text style={[styles.labelText, { color: 'white', fontWeight: 'bold', fontSize: 18 }]}>Exam Topics</Text>
              <Picker
                selectedValue={examTopic}
                onValueChange={(itemValue) => setExamTopic(itemValue)}
                style={[styles.picker, { color: 'white' }]}
              >
                <Picker.Item label="Numbers" value="Numbers" />
                <Picker.Item label="Colors" value="Colors" />
                <Picker.Item label="Greeting/Introduction" value="Greeting/Introduction" />
                <Picker.Item label="Days/Months/Seasons" value="Days/Months/Seasons" />
                <Picker.Item label="Family" value="Family" />
              </Picker>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 35, margin: '1%', backgroundColor: generateColor, borderRadius: 10 }} onPress={handleGenerateExam}>
              <Text style={[styles.labelText, { color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }]}>Generate Exam</Text>
            </TouchableOpacity>
            {examMode === "AI" && generatedExam.length > 0 && (
              <>
                {generatedExam.map((q, index) => (
                  <View key={index} style={{ marginVertical: 10, paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 16 }}>{`Q${index + 1}: ${q.question}`}</Text>
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
                <TouchableOpacity
                  style={{ paddingHorizontal: 16, paddingVertical: 35, margin: '1%', backgroundColor: generateColor, borderRadius: 10 }}
                  onPress={handleSubmitGeneratedExam}
                >
                  <Text style={[styles.labelText, { color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }]}>Submit Exam</Text>
                </TouchableOpacity>
                {examResult !== "" && (
                  <View style={{ padding: 16 }}>
                    <Text style={{ fontSize: 16, color: 'black', textAlign: 'left' }}>{examResult}</Text>
                  </View>
                )}
              </>
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

