import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Exercises } from "@/types/types";
import { Button } from "~/components/ui/button";

export default function ExercisesScreen() {
  const [exercises, setExercises] = useState<Exercises[]>([
    { id: 1, title: "Bench Press" },
    { id: 2, title: "Back Squat" },
    { id: 3, title: "Conventional Deadlift" },
  ]);
  return (
    <View className="bg-black h-full items-center">
      <Text className="text-4xl m-4">Exercises</Text>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <Card className="w-full max-w-sm mb-5">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Text>Here is some information about the exercise</Text>
            </CardContent>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No exercises yet!</Text>
        }
      />
      <Button
        onPress={() => router.push("/exercises/modal")}
        variant={"secondary"}
      >
        <Text>Open modal</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12, // space between each workout
    backgroundColor: "#f9f9f9",
  },
  exerciseText: {
    fontSize: 18,
    color: "#333",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginVertical: 16,
  },
});
