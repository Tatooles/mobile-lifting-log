import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function WorkoutDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View className="items-center">
      <Text>Details page for workout {id}</Text>
    </View>
  );
}
