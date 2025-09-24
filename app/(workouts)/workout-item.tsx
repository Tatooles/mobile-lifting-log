import { Link } from "expo-router";
import { Text, Pressable, View, Alert } from "react-native";
import { formatDate } from "~/lib/dateUtils";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Trash } from "lucide-react-native";
import { Workout } from "~/lib/types";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { deleteWorkout } from "~/db/deleteWorkout";

const WorkoutItem = ({ workout }: { workout: Workout }) => {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db);

  const handleDeleteWorkout = (id: number) => {
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
          onPress: async () => {
            await deleteWorkout(drizzleDb, id);
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderRightActions = (
    _progress: any,
    _dragX: any,
    workout: Workout
  ) => {
    return (
      <View className="h-full ml-2">
        <Pressable
          className="bg-red-500 justify-center items-center w-20 h-full rounded-lg"
          onPress={() => handleDeleteWorkout(workout.id)}
        >
          <Trash size={24} color="#fff" />
        </Pressable>
      </View>
    );
  };

  return (
    <View className="mb-3">
      <Swipeable
        renderRightActions={(progress: any, dragX: any) =>
          renderRightActions(progress, dragX, workout)
        }
        rightThreshold={40}
        overshootRight={false}
      >
        <Link href={`/details/${workout.id}`} asChild>
          <Pressable className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 p-4">
            <Text className="text-lg font-bold mb-1 text-gray-800">
              {workout.name}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
              {formatDate(workout.date)}
            </Text>
            <Text className="text-sm text-gray-500">
              {workout.exercises.length}{" "}
              {workout.exercises.length === 1 ? "exercise" : "exercises"}
            </Text>
          </Pressable>
        </Link>
      </Swipeable>
    </View>
  );
};

export default WorkoutItem;
