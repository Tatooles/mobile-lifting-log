"use client";

import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Trash } from "lucide-react-native";
import type { JSX } from "react/jsx-runtime";
import { Link } from "expo-router";
import WorkoutBox from "./workout-box";
import { useEffect } from "react";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "@/db/schema";
import { Workout } from "~/lib/types";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

// Format date to a more readable format
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

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

  const handleDeleteWorkout = (id: number): void => {
    Alert.alert(
      "Delete Workout",
      "Are you sure you want to delete this workout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            // TODO: Implement delete query
            //setWorkouts(workouts.filter((workout) => workout.id !== id));
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleWorkoutPress = (workout: Workout): void => {
    console.log(`Workout pressed: ${workout.name}`);
  };

  const handleAddWorkout = (): void => {
    console.log("Add workout pressed");
  };

  const renderRightActions = (
    _progress: any,
    _dragX: any,
    workout: Workout
  ): JSX.Element => {
    return (
      <View className="h-full">
        <TouchableOpacity
          className="bg-red-500 justify-center items-center w-20 h-full rounded-lg"
          onPress={() => handleDeleteWorkout(workout.id)}
        >
          <Trash size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderWorkoutItem = ({ item }: { item: Workout }): JSX.Element => (
    <View className="mb-3">
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item)
        }
        rightThreshold={40}
        overshootRight={false}
      >
        <View className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
          <TouchableOpacity onPress={() => handleWorkoutPress(item)}>
            <View className="p-4">
              <Text className="text-lg font-bold mb-1 text-gray-800">
                {item.name}
              </Text>
              <Text className="text-sm text-gray-600 mb-1">
                {formatDate(item.date)}
              </Text>
              <Text className="text-sm text-gray-500">
                {item.exercises.length}{" "}
                {item.exercises.length === 1 ? "exercise" : "exercises"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeable>
    </View>
  );

  const renderHeader = (): JSX.Element => (
    <Link href="/workouts/modal" asChild>
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg mb-4 items-center"
        onPress={handleAddWorkout}
      >
        <Text className="text-white font-bold text-base">Add Workout</Text>
      </TouchableOpacity>
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
        renderItem={renderWorkoutItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

export default WorkoutList;
