import { Text, View } from "react-native";
import WorkoutForm from "./workout-form";

export default function Modal() {
  return (
    <View className="flex flex-col items-center">
      <WorkoutForm />
    </View>
  );
}
