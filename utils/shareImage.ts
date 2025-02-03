import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { View } from "react-native";

// Function to capture and share image
export const shareGameResults = async (viewRef: View) => {
  try {
    const uri = await captureRef(viewRef, {
      format: "png",
      quality: 0.9,
    });

    await Sharing.shareAsync(uri, {
      mimeType: "image/png",
      dialogTitle: "Check out my Would You Rather answers!",
    });
  } catch (error) {
    console.error("Error sharing results:", error);
  }
};
