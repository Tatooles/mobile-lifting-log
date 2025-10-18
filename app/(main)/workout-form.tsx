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
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { insertWorkout } from "~/db/insertWorkout";
import { router } from "expo-router";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  workoutSchema,
  type WorkoutFormData,
  DEFAULT_WORKOUT_VALUES,
} from "~/lib/schemas/workout";
import * as schema from "@/db/schema";

interface ExerciseSet {
  reps: string;
  weight: string;
  rpe: string;
}

interface Exercise {
  name: string;
  sets: ExerciseSet[];
  notes: string;
}

export interface WorkoutData {
  name: string;
  date: Date;
  exercises: Exercise[];
}

export default function WorkoutForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
    watch,
  } = useForm<WorkoutFormData>({
    resolver: zodResolver(workoutSchema),
    defaultValues: DEFAULT_WORKOUT_VALUES,
  });

  const {
    fields: exercises,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "exercises",
  });

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  const addExercise = () => {
    append({
      name: "",
      notes: "",
      sets: [{ weight: "", reps: "", rpe: "" }],
    });
  };

  const addSet = (exerciseIndex: number) => {
    const currentSets = getValues(`exercises.${exerciseIndex}.sets`) || [];
    setValue(`exercises.${exerciseIndex}.sets`, [
      ...currentSets,
      { weight: "", reps: "", rpe: "" },
    ]);
  };

  const deleteSet = (exerciseIndex: number, setIndex: number) => {
    const currentSets = getValues(`exercises.${exerciseIndex}.sets`) || [];
    const updatedSets = currentSets.filter((_, index) => index !== setIndex);
    setValue(`exercises.${exerciseIndex}.sets`, updatedSets);
  };

  const cloneLastSet = (exerciseIndex: number) => {
    const currentSets = getValues(`exercises.${exerciseIndex}.sets`) || [];
    setValue(`exercises.${exerciseIndex}.sets`, [
      ...currentSets,
      { ...currentSets[currentSets.length - 1] },
    ]);
  };

  const onDateChange = (event: any, selectedDate?: Date): void => {
    const currentDate = selectedDate || new Date();
    setValue("date", currentDate.toISOString());
  };

  const onSubmit = async (data: WorkoutFormData) => {
    try {
      const workoutData: WorkoutData = {
        name: data.name,
        date: new Date(data.date),
        exercises: data.exercises.map((exercise) => ({
          name: exercise.name,
          sets: exercise.sets.map((set) => ({
            reps: set.reps,
            weight: set.weight,
            rpe: set.rpe,
          })),
          notes: exercise.notes,
        })),
      };

      await insertWorkout(drizzleDb, workoutData);
      router.push("/(home)/(workouts)");
      reset(DEFAULT_WORKOUT_VALUES);
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
        <View className="p-4">
          {/* Workout Name */}
          <View className="mb-4">
            <Text className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Workout Name
            </Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter workout name"
                  placeholderTextColor="#9CA3AF"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.name && (
              <Text className="text-red-500 mt-1">{errors.name.message}</Text>
            )}
          </View>

          {/* Workout Date */}
          <View className="mb-6">
            <Text className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Date
            </Text>
            <Controller
              control={control}
              name="date"
              render={({ field: { value } }) => (
                <DateTimePicker
                  value={new Date(value)}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}
            />
          </View>

          {/* Exercises Section */}
          <View className="mb-4">
            <Text className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
              Exercises
            </Text>

            {exercises.map((exercise, exerciseIndex) => {
              const sets = watch(`exercises.${exerciseIndex}.sets`) || [];

              return (
                <View
                  key={exercise.id}
                  className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-lg font-medium text-gray-800 dark:text-white">
                      Exercise {exerciseIndex + 1}
                    </Text>
                    <TouchableOpacity
                      onPress={() => remove(exerciseIndex)}
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
                    <Controller
                      control={control}
                      name={`exercises.${exerciseIndex}.name`}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="e.g., Bench Press"
                          placeholderTextColor="#9CA3AF"
                          value={value}
                          onChangeText={onChange}
                        />
                      )}
                    />
                  </View>

                  {/* Sets Section */}
                  <View className="mb-3">
                    <View className="flex-row justify-between items-center mb-2">
                      <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Sets
                      </Text>
                    </View>

                    {sets.map((set, setIndex) => (
                      <View
                        key={setIndex}
                        className="flex-row items-center mb-2"
                      >
                        <Text className="w-10 text-gray-700 dark:text-gray-300 font-medium">
                          #{setIndex + 1}
                        </Text>
                        <View className="flex-1 flex-row mr-2 gap-2">
                          <Controller
                            control={control}
                            name={`exercises.${exerciseIndex}.sets.${setIndex}.reps`}
                            render={({ field: { onChange, value } }) => (
                              <SetField
                                value={value}
                                placeholder="Reps"
                                onChange={onChange}
                              />
                            )}
                          />
                          <Controller
                            control={control}
                            name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
                            render={({ field: { onChange, value } }) => (
                              <SetField
                                value={value}
                                placeholder="Weight"
                                onChange={onChange}
                              />
                            )}
                          />
                          <Controller
                            control={control}
                            name={`exercises.${exerciseIndex}.sets.${setIndex}.rpe`}
                            render={({ field: { onChange, value } }) => (
                              <SetField
                                value={value}
                                placeholder="RPE"
                                onChange={onChange}
                              />
                            )}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => deleteSet(exerciseIndex, setIndex)}
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
                      onPress={() => addSet(exerciseIndex)}
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

                    {sets.length > 0 && (
                      <TouchableOpacity
                        onPress={() => cloneLastSet(exerciseIndex)}
                        className="flex-1 flex-row items-center justify-center p-2 ml-1 bg-gray-200 dark:bg-gray-700 rounded-lg"
                      >
                        <Text className="text-gray-800 dark:text-white font-medium">
                          Clone Last Set
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* Notes */}
                  <View>
                    <Text className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                      Notes
                    </Text>
                    <Controller
                      control={control}
                      name={`exercises.${exerciseIndex}.notes`}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          placeholder="Any additional notes..."
                          placeholderTextColor="#9CA3AF"
                          multiline={true}
                          numberOfLines={3}
                          textAlignVertical="top"
                          value={value}
                          onChangeText={onChange}
                        />
                      )}
                    />
                  </View>
                </View>
              );
            })}

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
            onPress={handleSubmit(onSubmit)}
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

const SetField = ({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder: string;
  onChange: (text: string) => void;
}) => {
  return (
    <View className="flex-1">
      <TextInput
        className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType="numeric"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};
