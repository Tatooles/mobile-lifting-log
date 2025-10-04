import "../global.css";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { Suspense, useEffect } from "react";
import { ActivityIndicator } from "react-native";

export const DATABASE_NAME = "db.db";

export default function RootLayout() {
  const expo = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expo);

  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!success) return null;

  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        options={{ enableChangeListener: true }}
        useSuspense
      >
        <GestureHandlerRootView>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: "teal",
            }}
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
    </Suspense>
  );
}
