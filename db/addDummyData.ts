import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { exercise, set, workout } from "./schema";

export const addDummyData = async (db: ExpoSQLiteDatabase) => {
  await db.insert(workout).values([
    {
      id: 1,
      userId: "user_2QGZES0k1iNMVWpjPeqIGQxrVbz",
      name: "Random Lower",
      date: "2025-01-23",
    },
    {
      id: 2,
      userId: "user_2QGZES0k1iNMVWpjPeqIGQxrVbz",
      name: "Random Upper",
      date: "2025-01-24",
    },
    {
      id: 3,
      userId: "user_2QGZES0k1iNMVWpjPeqIGQxrVbz",
      name: "Random Arms",
      date: "2025-01-30",
    },
    {
      id: 4,
      userId: "user_2QGZES0k1iNMVWpjPeqIGQxrVbz",
      name: "Something",
      date: "2025-01-30",
    },
  ]);

  await db.insert(exercise).values([
    {
      id: 1,
      name: "Bench Press",
      notes: "Felt good",
      workoutId: 2,
    },
    {
      id: 2,
      name: "Lat Pulldown",
      notes: "Felt good",
      workoutId: 2,
    },
    {
      id: 3,
      name: "DB OHP",
      notes: "Felt good",
      workoutId: 2,
    },
    {
      id: 4,
      name: "Back Squat",
      notes: "Felt good",
      workoutId: 1,
    },
    {
      id: 5,
      name: "Conventional Deadlift",
      notes: "Felt good",
      workoutId: 1,
    },
    {
      id: 6,
      name: "Hamstring Curl",
      notes: "Felt good",
      workoutId: 1,
    },
  ]);

  await db.insert(set).values([
    {
      id: 1,
      reps: "10",
      weight: "135",
      rpe: "8",
      exerciseId: 1,
    },
    {
      id: 1,
      reps: "10",
      weight: "135",
      rpe: "8",
      exerciseId: 2,
    },
    {
      id: 1,
      reps: "10",
      weight: "135",
      rpe: "8",
      exerciseId: 3,
    },
    {
      id: 1,
      reps: "10",
      weight: "135",
      rpe: "8",
      exerciseId: 4,
    },
    {
      id: 1,
      reps: "10",
      weight: "135",
      rpe: "8",
      exerciseId: 5,
    },
    {
      id: 1,
      reps: "10",
      weight: "135",
      rpe: "8",
      exerciseId: 1,
    },
  ]);
};
