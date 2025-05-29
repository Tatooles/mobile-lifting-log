import { useState } from "react";
import { View, Text, SafeAreaView, StatusBar, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Link } from "expo-router";
import { useEffect } from "react";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "@/db/schema";
import { Workout } from "~/lib/types";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import WorkoutItem from "./workout-item";

const WorkoutList = (): JSX.Element => {
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
    <Link href="/workouts/modal" asChild>
      <Pressable className="bg-blue-500 p-4 rounded-lg mb-4 items-center">
        <Text className="text-white font-bold text-base">Add Workout</Text>
      </Pressable>
    </Link>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <StatusBar barStyle="dark-content" />
      <View className="p-4 bg-white border-b border-gray-300 shadow-sm">
        <Text className="text-2xl font-bold text-gray-800">My Workouts</Text>
      </View>
      <FlatList
        data={workouts}
        renderItem={({ item }) => <WorkoutItem workout={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

export default WorkoutList;
