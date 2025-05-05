import { drizzle } from "drizzle-orm/expo-sqlite";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Workout } from "~/lib/types";
import * as schema from "@/db/schema";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Calendar,
  ChevronLeft,
  ClipboardList,
  Dumbbell,
} from "lucide-react-native";

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

  const navigation = useNavigation();

  // Format the date
  // const formattedDate = workout?.date ? format(new Date(workout.date), "MMMM d, yyyy") : "No date"

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-4 py-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-2 rounded-full bg-gray-100 mr-3"
            >
              <ChevronLeft size={24} color="#333" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-800 flex-1">
              {workout?.name}
            </Text>
          </View>

          <View className="flex-row items-center mt-3">
            <Calendar size={18} color="#6B7280" />
            <Text className="ml-2 text-gray-600">{workout?.date}</Text>
          </View>
        </View>

        {/* Exercises */}
        <View className="px-4 py-4">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Exercises ({workout?.exercises.length})
          </Text>

          {workout?.exercises.map((exercise, index) => (
            <View
              key={exercise.id}
              className={`bg-gray-50 rounded-xl p-4 mb-4 ${
                index === workout.exercises.length - 1 ? "" : "mb-4"
              }`}
            >
              <View className="flex-row items-center mb-2">
                <Dumbbell size={20} color="#4B5563" />
                <Text className="ml-2 text-lg font-semibold text-gray-800">
                  {exercise.name}
                </Text>
              </View>

              {exercise.notes ? (
                <View className="flex-row items-start mb-3">
                  <ClipboardList size={16} color="#6B7280" className="mt-1" />
                  <Text className="ml-2 text-gray-600 flex-1">
                    {exercise.notes}
                  </Text>
                </View>
              ) : null}

              {/* Sets */}
              <View className="mt-2">
                <View className="flex-row bg-gray-200 rounded-t-lg p-3">
                  <Text className="font-medium text-gray-700 flex-1">Set</Text>
                  <Text className="font-medium text-gray-700 w-20 text-center">
                    Weight
                  </Text>
                  <Text className="font-medium text-gray-700 w-20 text-center">
                    Reps
                  </Text>
                  <Text className="font-medium text-gray-700 w-16 text-center">
                    RPE
                  </Text>
                </View>

                {exercise.sets.map((set, setIndex) => (
                  <View
                    key={set.id}
                    className={`flex-row p-3 ${
                      setIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } ${
                      setIndex === exercise.sets.length - 1
                        ? "rounded-b-lg"
                        : "border-b border-gray-100"
                    }`}
                  >
                    <Text className="text-gray-800 flex-1">{setIndex + 1}</Text>
                    <Text className="text-gray-800 w-20 text-center">
                      {set.weight}
                    </Text>
                    <Text className="text-gray-800 w-20 text-center">
                      {set.reps}
                    </Text>
                    <Text className="text-gray-800 w-16 text-center">
                      {set.rpe || "-"}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
