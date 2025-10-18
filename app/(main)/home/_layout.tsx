import { useUser } from "@clerk/clerk-expo";
import { Link, Stack } from "expo-router";
import { Image } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";

export default function HomeLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const { user } = useUser();

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
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          title: "Home",
          headerLeft: () => (
            <Link href="/home/profile">
              <Image
                source={{ uri: user?.imageUrl }}
                className="rounded-full w-10 h-10"
              />
            </Link>
          ),
        }}
      />
      <Stack.Screen name="settings" />
      <Stack.Screen name="records" />
      <Stack.Screen name="calculators" />
      <Stack.Screen
        name="profile"
        options={{
          presentation: "modal",
          title: "Profile",
        }}
      />
    </Stack>
  );
}
