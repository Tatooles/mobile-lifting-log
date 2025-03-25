import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Trash2, Plus } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function WorkoutForm() {
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDate, setWorkoutDate] = useState(new Date());
  const [exercises, setExercises] = useState([
    { id: 1, name: "", sets: [{ weight: "", reps: "" }], notes: "" },
  ]);

  const addExercise = () => {
    const newId =
      exercises.length > 0 ? Math.max(...exercises.map((ex) => ex.id)) + 1 : 1;
    setExercises([
      ...exercises,
      { id: newId, name: "", sets: [{ weight: "", reps: "" }], notes: "" },
    ]);
  };

  // const addSet = () => {};

  const removeExercise = (id: number) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((exercise) => exercise.id !== id));
    }
  };

  const updateExercise = (
    id: number,
    field: string,
    value: string,
    setIndex?: number
  ) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id !== id) return exercise;

        // If we're updating a set's weight or reps
        if (
          setIndex !== undefined &&
          (field === "weight" || field === "reps")
        ) {
          const updatedSets = [...exercise.sets];
          updatedSets[setIndex] = {
            ...updatedSets[setIndex],
            [field]: value,
          };
          return { ...exercise, sets: updatedSets };
        }

        // For other fields like name or notes
        return { ...exercise, [field]: value };
      })
    );
  };

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || workoutDate;
    // TODO: Just have to get timezone rights
    setWorkoutDate(currentDate);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = () => {
    // Here you would handle form submission
    const workoutData = {
      name: workoutName,
      date: workoutDate,
      exercises: exercises,
    };
    console.log("Workout data:", workoutData.exercises[0]);
    // You could send this data to an API or store it locally
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView className="bg-gray-50 dark:bg-gray-900">
        <View className="p-4">
          <Text className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            New Workout
          </Text>

          {/* Workout Name */}
          <View className="mb-4">
            <Text className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Workout Name
            </Text>
            <TextInput
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Enter workout name"
              placeholderTextColor="#9CA3AF"
              value={workoutName}
              onChangeText={setWorkoutName}
            />
          </View>

          {/* Workout Date */}
          <View className="mb-6">
            <Text className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Date
            </Text>
            <DateTimePicker
              value={workoutDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          </View>

          {/* Exercises Section */}
          <View className="mb-4">
            <Text className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Exercises
            </Text>

            {exercises.map((exercise, index) => (
              <View
                key={exercise.id}
                className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-lg font-medium text-gray-800 dark:text-white">
                    Exercise {index + 1}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeExercise(exercise.id)}
                    className="p-1"
                  >
                    <Trash2 size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>

                {/* Exercise Name */}
                <View className="mb-3">
                  <Text className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Exercise Name
                  </Text>
                  <TextInput
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="e.g., Bench Press"
                    placeholderTextColor="#9CA3AF"
                    value={exercise.name}
                    onChangeText={(text) =>
                      updateExercise(exercise.id, "name", text)
                    }
                  />
                </View>

                {/* Set information */}
                {exercise.sets.map((set, setIndex) => (
                  <View key={`set-${setIndex}`} className="flex-row mb-3">
                    <View className="flex-1 mr-2">
                      <Text className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Weight
                      </Text>
                      <TextInput
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="3"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="numeric"
                        value={set.weight}
                        onChangeText={(text) =>
                          updateExercise(exercise.id, "weight", text, setIndex)
                        }
                      />
                    </View>
                    <View className="flex-1 ml-2">
                      <Text className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Reps
                      </Text>
                      <TextInput
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="10"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="numeric"
                        value={set.reps}
                        onChangeText={(text) =>
                          updateExercise(exercise.id, "reps", text, setIndex)
                        }
                      />
                    </View>
                  </View>
                ))}

                {/* Notes */}
                <View>
                  <Text className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Notes
                  </Text>
                  <TextInput
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Any additional notes..."
                    placeholderTextColor="#9CA3AF"
                    multiline={true}
                    numberOfLines={3}
                    textAlignVertical="top"
                    value={exercise.notes}
                    onChangeText={(text) =>
                      updateExercise(exercise.id, "notes", text)
                    }
                  />
                </View>
              </View>
            ))}

            {/* Add Exercise Button */}
            <TouchableOpacity
              onPress={addExercise}
              className="flex-row items-center justify-center p-3 bg-blue-500 rounded-lg"
            >
              <Plus size={20} color="white" />
              <Text className="ml-2 text-white font-medium">Add Exercise</Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="w-full p-4 bg-green-600 rounded-lg mt-4"
          >
            <Text className="text-white font-bold text-center text-lg">
              Save Workout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
