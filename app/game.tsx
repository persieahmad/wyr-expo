import { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { saveAnswer } from '../utils/storage';
import { Question, Answer } from '../types';

// API URL for fetching questions
const QUESTIONS_API = "https://raw.githubusercontent.com/persieahmad/wyr-questions/main/questions.json";

// TypeScript type for the fetched questions
type FetchedQuestion = {
  question: string;
  options: {
    A: string;
    B: string;
  };
};

// Utility to randomly select 5 questions
const getRandomQuestions = (questions: FetchedQuestion[], num: number = 5): Question[] => {
  const selectedQuestions: Question[] = [];
  const usedIndexes = new Set<number>();

  while (selectedQuestions.length < num) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    if (!usedIndexes.has(randomIndex)) {
      usedIndexes.add(randomIndex);
      selectedQuestions.push({
        question: questions[randomIndex].question,
        options: {
          A: questions[randomIndex].options.A,
          B: questions[randomIndex].options.B,
        },
      });
    }
  }

  return selectedQuestions;
};

export default function GameScreen() {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(QUESTIONS_API);
        const data: FetchedQuestion[] = await response.json();
        setQuestions(getRandomQuestions(data)); // Select 5 random questions
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false); // Set loading to false once questions are fetched
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = async (answer: Answer): Promise<void> => {
    await saveAnswer(questionIndex, answer);

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      router.push('/results');  // Navigate to results screen after 5 questions
    }
  };

  // Show loading indicator while fetching questions
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (questions.length === 0) {
    return null; // Show nothing if no questions are loaded
  }

  const { question, options } = questions[questionIndex];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        {question}
      </Text>
      <Button title={options.A} onPress={() => handleAnswer('A')} />
      <Button title={options.B} onPress={() => handleAnswer('B')} />
    </View>
  );
}
