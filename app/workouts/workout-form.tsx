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

interface ExerciseSet {
  id: number;
  reps: string;
  weight: string;
}

interface Exercise {
  id: number;
  name: string;
  sets: ExerciseSet[];
  notes: string;
}

interface WorkoutData {
  name: string;
  date: Date;
  exercises: Exercise[];
}

export default function WorkoutForm() {
  const [workoutName, setWorkoutName] = useState<string>("");
  const [workoutDate, setWorkoutDate] = useState<Date>(new Date());
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 1,
      name: "",
      sets: [{ id: 1, reps: "", weight: "" }],
      notes: "",
    },
  ]);

  const addExercise = () => {
    const newId =
      exercises.length > 0 ? Math.max(...exercises.map((ex) => ex.id)) + 1 : 1;
    setExercises([
      ...exercises,
      {
        id: newId,
        name: "",
        sets: [{ id: 1, reps: "", weight: "" }],
        notes: "",
      },
    ]);
  };

  const removeExercise = (id: number) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((exercise) => exercise.id !== id));
    }
  };

  const updateExercise = (
    exerciseId: number,
    field: string,
    value: string | ExerciseSet[]
  ): void => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === exerciseId
          ? field === "sets"
            ? { ...exercise, sets: value as ExerciseSet[] }
            : { ...exercise, [field]: value }
          : exercise
      )
    );
  };

  const addSet = (exerciseId: number): void => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const newSetId =
            exercise.sets.length > 0
              ? Math.max(...exercise.sets.map((set) => set.id)) + 1
              : 1;
          return {
            ...exercise,
            sets: [...exercise.sets, { id: newSetId, reps: "", weight: "" }],
          };
        }
        return exercise;
      })
    );
  };

  const removeSet = (exerciseId: number, setId: number): void => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          // Don't remove if it's the last set
          if (exercise.sets.length <= 1) {
            return exercise;
          }
          return {
            ...exercise,
            sets: exercise.sets.filter((set) => set.id !== setId),
          };
        }
        return exercise;
      })
    );
  };

  const cloneLastSet = (exerciseId: number) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId && exercise.sets.length > 0) {
          const lastSet = { ...exercise.sets[exercise.sets.length - 1] };
          lastSet.id++;

          return {
            ...exercise,
            sets: [...exercise.sets, lastSet],
          };
        }
        return exercise;
      })
    );
  };

  const updateSet = (
    exerciseId: number,
    setId: number,
    field: keyof ExerciseSet,
    value: string
  ): void => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.map((set) =>
              set.id === setId ? { ...set, [field]: value } : set
            ),
          };
        }
        return exercise;
      })
    );
  };

  const onDateChange = (event: any, selectedDate?: Date): void => {
    const currentDate = selectedDate || workoutDate;
    setWorkoutDate(currentDate);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmit = () => {
    // Here you would handle form submission
    const workoutData: WorkoutData = {
      name: workoutName,
      date: workoutDate,
      exercises: exercises,
    };
    console.log("Workout data:", workoutData.exercises[0]);
    // Send this data to API or store locally
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
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

                {/* Sets Section */}
                <View className="mb-3">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Sets
                    </Text>
                  </View>

                  {exercise.sets.map((set, setIndex) => (
                    <View key={set.id} className="flex-row items-center mb-2">
                      <Text className="w-10 text-gray-700 dark:text-gray-300 font-medium">
                        id: {set.id}
                      </Text>
                      <View className="flex-1 flex-row mr-2">
                        <View className="flex-1 mr-2">
                          <TextInput
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="Reps"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            value={set.reps}
                            onChangeText={(text) =>
                              updateSet(exercise.id, set.id, "reps", text)
                            }
                          />
                        </View>
                        <View className="flex-1">
                          <TextInput
                            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="Weight"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            value={set.weight}
                            onChangeText={(text) =>
                              updateSet(exercise.id, set.id, "weight", text)
                            }
                          />
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => removeSet(exercise.id, set.id)}
                        className="p-2"
                      >
                        <Trash2 size={18} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                {/* Add Set and Clone Buttons */}
                <View className="flex-row mb-3">
                  <TouchableOpacity
                    onPress={() => addSet(exercise.id)}
                    className="flex-1 flex-row items-center justify-center p-2 mr-1 bg-gray-200 dark:bg-gray-700 rounded-lg"
                  >
                    <Plus
                      size={16}
                      color={Platform.OS === "ios" ? "#007AFF" : "#2196F3"}
                    />
                    <Text className="ml-2 text-gray-800 dark:text-white font-medium">
                      Add Set
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => cloneLastSet(exercise.id)}
                    className="flex-1 flex-row items-center justify-center p-2 ml-1 bg-gray-200 dark:bg-gray-700 rounded-lg"
                    disabled={exercise.sets.length === 0}
                  >
                    <Text className="text-gray-800 dark:text-white font-medium">
                      Clone Last Set
                    </Text>
                  </TouchableOpacity>
                </View>

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
