import { exercise, set, workout } from "./schema";
import { WorkoutData } from "~/app/(main)/workout-form";
import { LibsqlDatabase } from "~/lib/db";

export const insertWorkout = async (
  db: LibsqlDatabase,
  workoutData: WorkoutData,
  userId: string
) => {
  try {
    // Insert workout and get the ID back
    const [insertedWorkout] = await db
      .insert(workout)
      .values({
        name: workoutData.name,
        date: workoutData.date.toString(),
        userId: userId,
      })
      .returning({ id: workout.id });

    const workoutId = insertedWorkout.id;

    for (const exerciseData of workoutData.exercises) {
      const [insertedExercise] = await db
        .insert(exercise)
        .values({
          workoutId: workoutId,
          name: exerciseData.name,
          notes: exerciseData.notes,
        })
        .returning({ id: exercise.id });

      const exerciseId = insertedExercise.id;

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
