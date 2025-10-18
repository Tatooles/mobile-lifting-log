import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-50 dark:bg-gray-900 text-white">
      <Text className="text-gray-800 dark:text-white">Home</Text>
      <Link href="/home/settings" className="text-gray-800 dark:text-white">
        View settings
      </Link>
      <Link href="/home/records" className="text-gray-800 dark:text-white">
        View records
      </Link>
      <Link href="/home/calculators" className="text-gray-800 dark:text-white">
        View calculators
      </Link>
    </View>
  );
}
