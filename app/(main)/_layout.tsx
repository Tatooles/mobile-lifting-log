import "../../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";

export const DATABASE_NAME = "lifting-log-mobile-1";

export default function RootLayout() {
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
          // Step 1: Apply local migrations first
          try {
            console.log("Applying local database migrations...");
            const drizzleDb = drizzle(db);
            await migrate(drizzleDb, migrations);
            console.log("Local migrations applied successfully");
          } catch (error) {
            console.error("Failed to apply migrations:", error);
            throw error;
          }

          // Step 2: Sync with remote Turso database
          // Note: This only syncs DATA, not schema
          // Schema must be pushed to Turso via: npm run db:push
          // Note: syncLibSQL only works in development builds, not Expo Go or web
          try {
            console.log("Syncing with remote Turso database...");
            await db.syncLibSQL();
            console.log("Successfully synced with remote database");
          } catch (error: any) {
            // Check if it's the "not supported" error
            if (
              error?.message?.includes("not supported") ||
              error?.message?.includes("syncLibSQL")
            ) {
              console.warn(
                "syncLibSQL not available in this environment (Expo Go/web). " +
                  "Use a development build for Turso sync support."
              );
            } else {
              console.error("Error syncing with remote database:", error);
              // Don't throw here - allow app to work offline if sync fails
            }
          }
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
