import { z } from "zod";

export const workoutSchema = z.object({
  date: z.string(),
  name: z
    .string()
    .min(1, {
      message: "Workout name must be at least 1 character",
    })
    .max(50, {
      message: "Workout name may not exceed 50 characters",
    }),
  exercises: z
    .object({
      name: z.string(),
      notes: z.string(),
      sets: z
        .object({
          weight: z.string(),
          reps: z.string(),
          rpe: z.string(),
        })
        .array(),
    })
    .array(),
});

export type WorkoutFormData = z.infer<typeof workoutSchema>;

export const DEFAULT_WORKOUT_VALUES: WorkoutFormData = {
  name: "",
  date: new Date().toISOString(),
  exercises: [
    {
      name: "",
      notes: "",
      sets: [{ weight: "", reps: "", rpe: "" }],
    },
  ],
};
