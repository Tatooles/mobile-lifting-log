import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Exercises } from "@/types/types";

export default function ExercisesScreen() {
  const [exercises, setExercises] = useState<Exercises[]>([
    { id: 1, title: "Bench Press" },
    { id: 2, title: "Back Squat" },
    { id: 3, title: "Conventional Deadlift" },
  ]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercises</Text>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          // TODO: Put this in a component
          <View style={styles.exerciseBox}>
            <Text style={styles.exerciseText}>{item.title}</Text>
          </View>
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
