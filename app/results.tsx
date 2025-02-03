import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { getAnswers, clearAnswers } from "../utils/storage";

export default function ResultsScreen() {
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAnswers().then(setAnswers);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Your Answers</Text>
      {answers.map((ans, i) => (
        <Text key={i}>Question {i + 1}: {ans}</Text>
      ))}
      <Button title="Share Your Choices" onPress={() => router.push("/share")} />
      <Button title="Play Again" onPress={async () => {
        await clearAnswers();
        router.replace("/");
      }} />
    </View>
  );
}
