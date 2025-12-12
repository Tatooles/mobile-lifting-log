import { exercise, set, workout } from "./schema";
import { WorkoutData } from "~/app/(main)/workout-form";
import { LibsqlDatabase } from "~/lib/db";

export const insertWorkout = async (
  db: LibsqlDatabase,
  workoutData: WorkoutData,
  userId: string
) => {
  try {
    // Insert workout
    const workoutResult = await db.insert(workout).values({
      name: workoutData.name,
      date: workoutData.date.toString(),
      userId: userId,
    });

    const workoutId = Number(workoutResult.insertId);

    for (const exerciseData of workoutData.exercises) {
      const exerciseResult = await db.insert(exercise).values({
        workoutId: workoutId,
        name: exerciseData.name,
        notes: exerciseData.notes,
      });

      const exerciseId = Number(exerciseResult.insertId);

      for (const setData of exerciseData.sets) {
        await db.insert(set).values({
          exerciseId: exerciseId,
          reps: setData.reps,
          weight: setData.weight,
          rpe: setData.rpe,
        });
      }
    }
  } catch (error) {
    console.log(`An error ocurred while inserting workout!`);
    if (error instanceof Error) console.log(error.message);
  }
};
