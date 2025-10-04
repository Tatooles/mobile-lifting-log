import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { exercise, set, workout } from "./schema";
import { WorkoutData } from "~/app/workout-form";
import * as schema from "@/db/schema";

export const insertWorkout = async (
  db: ExpoSQLiteDatabase<typeof schema>,
  workoutData: WorkoutData
) => {
  // TODO: The tables will not be initialized for new users.
  try {
    await db.transaction(async () => {
      const workoutResult = await db.insert(workout).values({
        name: workoutData.name,
        date: workoutData.date.toString(),
        userId: "", // Not relevant for this local db
      });

      for (const exerciseData of workoutData.exercises) {
        const exerciseResult = await db.insert(exercise).values({
          workoutId: Number(workoutResult.lastInsertRowId),
          name: exerciseData.name,
          notes: exerciseData.notes,
        });

        for (const setData of exerciseData.sets) {
          await db.insert(set).values({
            exerciseId: Number(exerciseResult.lastInsertRowId),
            reps: setData.reps,
            weight: setData.weight,
            rpe: setData.rpe,
          });
        }
      }
    });
  } catch (error) {
    console.log(`An error ocurred while inserting workout!`);
    if (error instanceof Error) console.log(error.message);
  }
};
