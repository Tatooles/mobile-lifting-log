import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { workout } from "./schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import * as schema from "@/db/schema";

export const deleteWorkout = async (
  db: ExpoSQLiteDatabase<typeof schema>,
  workoutId: number
) => {
  try {
    // Enable foreign key support
    await db.run(sql`PRAGMA foreign_keys = ON;`);

    await db.delete(workout).where(eq(workout.id, workoutId));
  } catch (error) {
    console.log(`An error ocurred while deleting workout ${workoutId}!`);
    if (error instanceof Error) console.log(error.message);
  }
};
