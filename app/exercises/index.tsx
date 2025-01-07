import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Exercises } from "@/types/types";

export default function ExercisesScreen() {
  const [exercises, setExercises] = useState<Exercises[]>([
    { id: 1, title: "Bench Press" },
    { id: 2, title: "Back Squat" },
    { id: 3, title: "Conventional Deadlift" },
  ]);
  return (
    <View className="bg-black">
      <Text className="text-4xl m-4">Exercises</Text>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          // TODO: Put this in a component
          <Card className="w-full max-w-sm mb-5">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <Text>Card Content</Text>
            </CardContent>
            <CardFooter>
              <Text>Card Footer</Text>
            </CardFooter>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No exercises yet!</Text>
        }
      />
      <Link href="/exercises/modal" style={styles.link}>
        Open modal
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    paddingTop: 20,
    fontSize: 20,
  },
  title: {
    fontSize: 30,
    margin: 20,
  },
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
