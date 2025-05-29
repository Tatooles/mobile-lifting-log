import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { workout } from "./schema";
import { eq } from "drizzle-orm";

export const deleteWorkout = async (
  db: ExpoSQLiteDatabase,
  workoutId: number
) => {
  try {
    // Cascade delete may not be working as expected
    // TODO: Check if this is the case
    await db.delete(workout).where(eq(workout.id, workoutId));
  } catch (error) {
    console.log("An error ocurred!");
    if (error instanceof Error) console.log(error.message);
  }
};
