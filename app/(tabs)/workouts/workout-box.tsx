import { Link } from "expo-router";
import { Text, Pressable } from "react-native";
import { formatDate } from "~/lib/dateUtils";

const WorkoutBox = ({
  id,
  date,
  name,
  exerciseCount,
}: {
  id: number;
  date: string;
  name: string;
  exerciseCount: number;
}) => {
  // Look through more apple apps to try to make this as native as possible
  // Fitness app is a decent start
  return (
    // TODO: Apple Fitness app allows the user to slide to delete with a modal for confirmation
    // Should try to replicate that
    <Link href={`/workouts/details/${id}`} asChild>
      <Pressable className="bg-gray-300 p-4 mx-4 my-1 rounded-lg flex-col items-center">
        <Text className="text-sm text-gray-600 mb-1">{formatDate(date)}</Text>
        <Text className="text-lg font-bold mb-2">{name}</Text>
        <Text className="text-base text-gray-700">
          Exercises ({exerciseCount})
        </Text>
      </Pressable>
    </Link>
  );
};

export default WorkoutBox;
