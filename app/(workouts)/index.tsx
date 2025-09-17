import { useState } from "react";
import { View, Text, SafeAreaView, StatusBar, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useEffect } from "react";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "@/db/schema";
import { Workout } from "~/lib/types";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import WorkoutBox from "./workout-item";

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
      className="bg-blue-500 p-4 rounded-lg mb-4 items-center"
      onPress={() => router.push("/workout-form")}
    >
      <Text className="text-white font-bold text-base">Add Workout</Text>
    </Pressable>
  );

  return (
    <SafeAreaView className="bg-gray-200">
      <FlatList
        data={workouts}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => <WorkoutBox workout={item} />}
        keyExtractor={(item) => item.id.toString()}
        className="p-4"
      />
    </SafeAreaView>
  );
}
