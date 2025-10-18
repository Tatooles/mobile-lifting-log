import { Stack } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";

export default function WorkoutsLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkColorScheme ? "#1f2937" : "#3b82f6",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Workouts" }} />
    </Stack>
  );
}
