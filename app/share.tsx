import { useEffect, useRef, useState } from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { getAnswers } from "../utils/storage";
import { shareGameResults } from "../utils/shareImage";

export default function ShareScreen() {
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();
  const viewRef = useRef(null);

  useEffect(() => {
    getAnswers().then(setAnswers);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View ref={viewRef} style={{ backgroundColor: "#f8f9fa", padding: 20, borderRadius: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>My Choices 🎉</Text>
        {answers.map((ans, i) => (
          <Text key={i} style={{ fontSize: 18 }}>
            Question {i + 1}: {ans}
          </Text>
        ))}
      </View>
      
      <Button title="Share on Social Media" onPress={() => shareGameResults(viewRef as any)} />
      <Button title="Back to Home" onPress={() => router.replace("/")} />
    </View>
  );
}
