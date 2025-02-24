import { Text, View } from "react-native";
import { Link } from "expo-router";
import WorkoutBox from "./WorkoutBox";

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
      <Text>Workouts</Text>
      {workouts.map((workout) => (
        <WorkoutBox
          date={workout.date}
          name={workout.name}
          hours={workout.hours}
          minutes={workout.minutes}
        />
      ))}
      <Link href="/workouts/modal" className="pt-5 text-xl">
        Add Workout
      </Link>
    </View>
  );
}
