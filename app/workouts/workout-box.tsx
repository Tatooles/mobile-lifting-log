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
    <View className="bg-gray-100 rounded-lg p-4 m-4 shadow-md">
      <Text className="text-sm text-gray-600 mb-1">{date}</Text>
      <Text className="text-lg font-bold mb-2">{name}</Text>
      <Text className="text-base text-gray-700">
        Duration: {hours}h {minutes}m
      </Text>
    </View>
  );
};

export default WorkoutBox;
