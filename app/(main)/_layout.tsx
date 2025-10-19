import "../../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { openDatabaseAsync, SQLiteProvider } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { Suspense, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";

export const DATABASE_NAME = "db.db";

export default function RootLayout() {
  const [db, setDb] = useState<any>(null);
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    const initializeDatabase = async () => {
      const expo = await openDatabaseAsync(DATABASE_NAME);
      const drizzleDb = drizzle(expo);
      setDb(drizzleDb);
      setIsDbReady(true);
    };
    initializeDatabase();
  }, []);

  if (!isDbReady) return <ActivityIndicator size="large" />;

  return (
    <MigrationHandler db={db}>
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
    </MigrationHandler>
  );
}

function MigrationHandler({
  db,
  children,
}: {
  db: any;
  children: React.ReactNode;
}) {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!success) return <ActivityIndicator size="large" />;

  return <>{children}</>;
}
