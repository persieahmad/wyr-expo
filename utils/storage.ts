import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAnswer = async (index: number, answer: string) => {
  try {
    const existing = await AsyncStorage.getItem('answers');
    const answers = existing ? JSON.parse(existing) : [];
    answers[index] = answer;
    await AsyncStorage.setItem('answers', JSON.stringify(answers));
  } catch (error) {
    console.error("Error saving answer:", error);
  }
};

export const getAnswers = async () => {
  try {
    const answers = await AsyncStorage.getItem('answers');
    return answers ? JSON.parse(answers) : [];
  } catch (error) {
    console.error("Error fetching answers:", error);
    return [];
  }
};

export const clearAnswers = async () => {
  await AsyncStorage.removeItem('answers');
};
