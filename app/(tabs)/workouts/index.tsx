import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import WorkoutBox from "./workout-box";
import { useEffect, useState } from "react";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "@/db/schema";
import { Workout } from "~/lib/types";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { FlatList } from "react-native";

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

  return (
    // I kinda want each workout to be a pill, then it opens into a modal or drawer, then full screens when you scroll
    // Like the Apple sports app. No idea how that things works tho
    // TODO: Probably want a search bar at the top here
    <FlatList
      data={workouts}
      ListHeaderComponent={
        <View className="items-center my-4">
          <Link href="/workouts/modal" asChild>
            <TouchableOpacity className="active:opacity-80">
              <View className="flex-row items-center bg-[#008080] px-6 py-3 rounded-full shadow-sm space-x-2">
                <Text className="text-white font-semibold text-xl">
                  Add Workout
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>
      }
      renderItem={({ item }) => (
        <WorkoutBox
          id={item.id}
          key={item.name}
          date={item.date}
          name={item.name}
          exerciseCount={item.exercises.length}
        />
      )}
      keyExtractor={(item) => item.name}
    />
  );
}
