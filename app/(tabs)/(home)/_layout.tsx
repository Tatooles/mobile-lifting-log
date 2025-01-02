import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="records" />
      <Stack.Screen name="calculators" />
    </Stack>
  );
}
