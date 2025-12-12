import { workout } from "./schema";
import { eq } from "drizzle-orm";
import { LibsqlDatabase, getConnection } from "~/lib/db";

export const deleteWorkout = async (db: LibsqlDatabase, workoutId: number) => {
  try {
    // Enable foreign key support
    const connection = getConnection();
    connection.execute("PRAGMA foreign_keys = ON;");

    await db.delete(workout).where(eq(workout.id, workoutId));
  } catch (error) {
    console.log(`An error ocurred while deleting workout ${workoutId}!`);
    if (error instanceof Error) console.log(error.message);
  }
};
