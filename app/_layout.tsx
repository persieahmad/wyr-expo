import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="game" options={{ title: "Play Game" }} />
      <Stack.Screen name="results" options={{ title: "Results" }} />
      <Stack.Screen name="share" options={{ title: "Share Your Choices" }} />
    </Stack>
  );
}
