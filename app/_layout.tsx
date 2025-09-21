import "../global.css";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SQLiteProvider } from "expo-sqlite";

export const DATABASE_NAME = "db.db";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName={DATABASE_NAME}
      options={{ enableChangeListener: true }}
    >
      <GestureHandlerRootView>
        <Tabs
          screenOptions={{ headerShown: false, tabBarActiveTintColor: "teal" }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome size={size} name="home" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="(workouts)"
            options={{
              title: "Workouts",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="weight-lifter"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="exercises"
            options={{
              title: "Exercises",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="barbell" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="workout-form"
            options={{
              title: "New Workout",
              href: null,
              headerShown: true,
            }}
          />
        </Tabs>
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}
