import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { workout } from "./schema";
import { eq } from "drizzle-orm";

export const deleteWorkout = async (
  db: ExpoSQLiteDatabase,
  workoutId: number
) => {
  try {
    await db.delete(workout).where(eq(workout.id, workoutId));
  } catch (error) {
    console.log("An error ocurred!");
    if (error instanceof Error) console.log(error.message);
  }
};
