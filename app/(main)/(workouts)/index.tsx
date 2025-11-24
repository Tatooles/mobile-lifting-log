import { useState } from "react";
import { Text, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useEffect } from "react";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "@/db/schema";
import { Workout } from "~/lib/types";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import WorkoutItem from "./workout-item";

export default function WorkoutsScreen() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });
  useDrizzleStudio(db);

  const { data } = useLiveQuery(
    drizzleDb.query.workout.findMany({
      with: {
        exercises: {
          with: {
            sets: {
              orderBy: (sets, { asc }) => [asc(sets.id)],
            },
          },
        },
      },
    })
  );

  useEffect(() => {
    if (!data) return;

    data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setWorkouts(data);
  }, [data]);

  const renderHeader = () => (
    <Pressable
      className="bg-green-500 dark:bg-green-600 p-4 rounded-lg mb-4 items-center"
      onPress={() => router.push("/workout-form")}
    >
      <Text className="text-white font-bold text-base">Add Workout</Text>
    </Pressable>
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
