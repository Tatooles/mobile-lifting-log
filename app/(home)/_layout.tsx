import "../../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { Suspense, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export const DATABASE_NAME = "db.db";

export default function RootLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

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
