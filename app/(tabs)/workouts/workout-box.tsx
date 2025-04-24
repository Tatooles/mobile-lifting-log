import { View, Text } from "react-native";

const WorkoutBox = ({
  date,
  name,
  hours,
  minutes,
}: {
  date: string;
  name: string;
  hours: number;
  minutes: number;
}) => {
  return (
    // Look through more apple apps to try to make this as native as possible
    // Sports app is a decent start
    <View className="bg-gray-100 p-4 shadow-md w-11/12 flex-col items-center">
      <Text className="text-sm text-gray-600 mb-1">{date}</Text>
      <Text className="text-lg font-bold mb-2">{name}</Text>
      <Text className="text-base text-gray-700">
        Duration: {hours}h {minutes}m
      </Text>
    </View>
  );
};

export default WorkoutBox;
