import "../../global.css";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { addDummyData } from "~/db/addDummyData";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
              tabBarIcon: ({ color }) => (
                <FontAwesome size={28} name="home" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="workouts"
            options={{
              title: "Workouts",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="weight-lifter"
                  size={28}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="exercises"
            options={{
              title: "Exercises",
              tabBarIcon: ({ color }) => (
                <Ionicons name="barbell" size={24} color={color} />
              ),
            }}
          />
        </Tabs>
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}
