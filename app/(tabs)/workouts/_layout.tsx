import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Workouts" }} />
      <Stack.Screen
        name="workout-form"
        options={{
          title: "New Workout",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
