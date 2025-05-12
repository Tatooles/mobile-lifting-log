import { Link } from "expo-router";
import { Text, Pressable, View } from "react-native";
import { formatDate } from "~/lib/dateUtils";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    console.log("showRightProgress:", prog.value);
    console.log("appliedTranslation:", drag.value);

    return {
      transform: [{ translateX: drag.value + 100 }],
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <View className="h-full w-[100px] bg-red-700 rounded-lg flex items-center justify-center">
        <Text className="text-white">Delete</Text>
      </View>
    </Reanimated.View>
  );
}

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
    <Swipeable renderRightActions={RightAction}>
      <Link href={`/workouts/details/${id}`} asChild>
        <Pressable className="bg-gray-300 p-4 mx-4 my-1 rounded-lg flex-col items-center">
          <Text className="text-sm text-gray-600 mb-1">{formatDate(date)}</Text>
          <Text className="text-lg font-bold mb-2">{name}</Text>
          <Text className="text-base text-gray-700">
            Exercises ({exerciseCount})
          </Text>
        </Pressable>
      </Link>
    </Swipeable>
  );
};

export default WorkoutBox;
