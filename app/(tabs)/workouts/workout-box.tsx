import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";

const WorkoutBox = ({
  id,
  date,
  name,
  hours,
  minutes,
}: {
  id: number;
  date: string;
  name: string;
  hours?: number;
  minutes?: number;
}) => {
  // Look through more apple apps to try to make this as native as possible
  // Fitness app is a decent start
  return (
    <Link href={`/workouts/details/${id}`} asChild>
      <Pressable className="bg-gray-300 p-4 mx-4 my-1 rounded-lg flex-col items-center">
        <Text className="text-sm text-gray-600 mb-1">{date}</Text>
        <Text className="text-lg font-bold mb-2">{name}</Text>
        <Text className="text-base text-gray-700">
          Duration: {hours}h {minutes}m
        </Text>
      </Pressable>
    </Link>
  );
};

export default WorkoutBox;
