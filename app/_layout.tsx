import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
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
        {/* FIXME: Expo youtube video has instructions on the best way to do this */}
        <Stack screenOptions={{ headerShown: false }} />
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}
