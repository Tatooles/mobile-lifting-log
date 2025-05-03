import { drizzle } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Workout } from "~/lib/types";
import * as schema from "@/db/schema";

export default function WorkoutDetails() {
  const { id } = useLocalSearchParams();

  const [workout, setWorkout] = useState<Workout>();

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  useEffect(() => {
    (async () => {
      const data: Workout | undefined = await drizzleDb.query.workout.findFirst(
        {
          where: (workout, { eq }) => eq(workout.id, +id),
          with: {
            exercises: {
              with: {
                sets: {
                  orderBy: (sets, { asc }) => [asc(sets.id)],
                },
              },
            },
          },
        }
      );
      setWorkout(data);
    })();
  }, []);

  return (
    <View className="items-center">
      <Text>Details page for workout</Text>
      <Text>{JSON.stringify(workout)}</Text>
    </View>
  );
}
