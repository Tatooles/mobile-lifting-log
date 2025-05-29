import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      {/* FIXME: Expo youtube video has instructions on the best way to do this */}
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
