import "../../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { openDatabaseSync, SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { Suspense, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";

export const DATABASE_NAME = "lifting-log-mobile-1";

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
        options={{
          enableChangeListener: true,
          libSQLOptions: {
            url: process.env.EXPO_PUBLIC_TURSO_DB_URL!,
            authToken: process.env.EXPO_PUBLIC_TURSO_DB_AUTH_TOKEN!,
          },
        }}
        onInit={async (db: SQLiteDatabase) => {
          try {
            await db.syncLibSQL();
          } catch (error) {
            console.error(error);
          }

          // Define the target database version.
          const DATABASE_VERSION = 1;

          // PRAGMA is a special command in SQLite used to query or modify database settings. For example, PRAGMA user_version retrieves or sets a custom schema version number, helping you track migrations.
          // Retrieve the current database version using PRAGMA.
          let result = await db.getFirstAsync<{
            user_version: number;
          } | null>("PRAGMA user_version");
          let currentDbVersion = result?.user_version ?? 0;

          // If the current version is already equal or newer, no migration is needed.
          if (currentDbVersion >= DATABASE_VERSION) {
            console.log("No migration needed, DB version:", currentDbVersion);
            return;
          }

          // For a new or uninitialized database (version 0), apply the initial migration.
          if (currentDbVersion === 0) {
            // Note: libSQL does not support WAL (Write-Ahead Logging) mode.
            // await db.execAsync(`PRAGMA journal_mode = 'wal';`);

            // Create the 'notes' table with three columns:
            // - id: an integer primary key that cannot be null.
            // - title: a text column.
            // - content: a text column.
            // - modifiedDate: a text column.
            // TODO: Create my own migration. I feel like the migrations folder is supposed to do this?
            // await db.execAsync(
            //   `CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY NOT NULL, title TEXT, content TEXT, modifiedDate TEXT);`
            // );
            console.log(
              "Initial migration applied, DB version:",
              DATABASE_VERSION
            );
            // Update the current version after applying the initial migration.
            currentDbVersion = 1;
          } else {
            console.log("DB version:", currentDbVersion);
          }

          // Future migrations for later versions can be added here.
          // Example:
          // if (currentDbVersion === 1) {
          //   // Add migration steps for upgrading from version 1 to a higher version.
          // }

          // Set the database version to the target version after migration.
          await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
        }}
        useSuspense
      >
        <GestureHandlerRootView>
          <NativeTabs>
            <NativeTabs.Trigger name="home">
              <Label>Home</Label>
              <Icon sf={{ default: "house", selected: "house.fill" }} />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="workout-form">
              <Label>Workout</Label>
              <Icon sf={{ default: "plus", selected: "plus.circle.fill" }} />
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="(workouts)">
              <Label>History</Label>
              <Icon
                sf={{
                  default: "figure.strengthtraining.traditional.circle",
                  selected: "figure.strengthtraining.traditional.circle.fill",
                }}
              />
            </NativeTabs.Trigger>
          </NativeTabs>
        </GestureHandlerRootView>
      </SQLiteProvider>
    </Suspense>
  );
}
