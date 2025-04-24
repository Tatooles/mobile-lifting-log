import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import WorkoutBox from "./workout-box";

export default function WorkoutsScreen() {
  // Sort by date desc
  const workouts = [
    {
      date: "2025-02-27",
      name: "Morning Cardio",
      hours: 1,
      minutes: 30,
    },
    {
      date: "2025-02-27",
      name: "Strength Training",
      hours: 2,
      minutes: 0,
    },
    {
      date: "2025-02-26",
      name: "Coach D Week 1 Day 3",
      hours: 1,
      minutes: 37,
    },
  ];

  return (
    // I kinda want each workout to be a pill, then it opens into a modal or drawer, then full screens when you scroll
    // Like the Apple sports app. No idea how that things works tho
    <View className="flex-1 items-center p-4">
      <Link href="/workouts/modal" asChild>
        <TouchableOpacity className="active:opacity-80">
          <View className="flex-row items-center bg-blue-500 px-6 py-3 rounded-full shadow-sm space-x-2 mb-4">
            <Text className="text-white font-semibold text-xl">
              Add Workout
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
      {workouts.map((workout) => (
        <WorkoutBox
          key={workout.name}
          date={workout.date}
          name={workout.name}
          hours={workout.hours}
          minutes={workout.minutes}
        />
      ))}
    </View>
  );
}
