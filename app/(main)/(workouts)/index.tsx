import { useState, useEffect, useCallback } from "react";
import { Text, Pressable, View, Alert, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Workout } from "~/lib/types";
import WorkoutItem from "./workout-item";
import { useDatabase } from "~/lib/db";
import { RefreshCw } from "lucide-react-native";

export default function WorkoutsScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const { db, refreshKey, sync, isSyncAvailable } = useDatabase();

  const fetchWorkouts = useCallback(async () => {
    const data = await db.query.workout.findMany({
      with: {
        exercises: {
          with: {
            sets: {
              orderBy: (sets, { asc }) => [asc(sets.id)],
            },
          },
        },
      },
    });

    const sorted = [...data].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setWorkouts(sorted);
  }, [db]);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts, refreshKey]);

  const handleSync = async () => {
    if (isSyncing) return;

    setIsSyncing(true);
    try {
      const result = await sync();
      Alert.alert(
        result.success ? "Sync Complete" : "Sync Failed",
        result.message
      );
    } catch (error) {
      Alert.alert("Sync Error", "An unexpected error occurred");
    } finally {
      setIsSyncing(false);
    }
  };

  const renderHeader = () => (
    <View className="mb-4">
      <Pressable
        className="bg-green-500 dark:bg-green-600 p-4 rounded-lg mb-3 items-center"
        onPress={() => router.push("/workout-form")}
      >
        <Text className="text-white font-bold text-base">Add Workout</Text>
      </Pressable>

      {isSyncAvailable && (
        <Pressable
          className="bg-blue-500 dark:bg-blue-600 p-3 rounded-lg flex-row items-center justify-center"
          onPress={handleSync}
          disabled={isSyncing}
        >
          {isSyncing ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <RefreshCw size={18} color="#fff" />
          )}
          <Text className="text-white font-bold text-sm ml-2">
            {isSyncing ? "Syncing..." : "Sync with Cloud"}
          </Text>
        </Pressable>
      )}
    </View>
  );

  return (
    <FlatList
      data={workouts}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => <WorkoutItem workout={item} />}
      keyExtractor={(item) => item.id.toString()}
      className="bg-gray-50 dark:bg-gray-900 p-4"
    />
  );
}
