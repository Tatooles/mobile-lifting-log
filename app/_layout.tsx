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
import { addDummyData } from "~/db/addDummyData";
import { useEffect } from "react";

export const DATABASE_NAME = "db.db";

const expo = openDatabaseSync(DATABASE_NAME);

const db = drizzle(expo);

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (success) {
      addDummyData(db);
    }
  }, [success]);

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
        </Tabs>
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}
