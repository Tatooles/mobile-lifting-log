import { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Exercises } from "@/types/types";
import { Dumbbell } from "lucide-react-native";
import { iconWithClassName } from "~/lib/icons/iconWithClassName";
import { SafeAreaProvider } from "react-native-safe-area-context";

iconWithClassName(Dumbbell);

export default function ExercisesScreen() {
  const [exercises] = useState<Exercises[]>([
    { id: 1, title: "Bench Press" },
    { id: 2, title: "Back Squat" },
    { id: 3, title: "Conventional Deadlift" },
  ]);

  const renderItem = ({ item }: { item: Exercises }) => (
    <Pressable className="mb-4" onPress={() => {}}>
      <Card className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 p-4 flex-row items-center">
        <Dumbbell className="text-blue-500 mr-4" size={32} />
        <CardHeader className="p-0 flex-1">
          <CardTitle className="text-lg font-bold text-gray-800 mb-1">
            {item.title}
          </CardTitle>
          <CardContent className="p-0 pt-0">
            <Text className="text-sm text-gray-600">
              Here is some information about the exercise
            </Text>
          </CardContent>
        </CardHeader>
      </Card>
    </Pressable>
  );

  return (
    <SafeAreaProvider className="flex-1 bg-gray-200">
      <Text className="text-3xl font-bold text-gray-800 mb-4 mt-6 px-4">
        Exercises
      </Text>
      <FlatList
        data={exercises}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-8">
            No exercises yet!
          </Text>
        }
      />
    </SafeAreaProvider>
  );
}
