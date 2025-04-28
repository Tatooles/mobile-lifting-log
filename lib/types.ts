export interface Workout {
  id: number;
  name: string;
  userId: string | null;
  date: string;
  exercises: ExerciseInstance[];
}

// Reps and sets are strings because they can be a range
export interface ExerciseInstance {
  id: number;
  name: string;
  notes: string;
  workoutId: number;
  sets: Set[];
  // It would make sense for ExerciseInstance to contain date :/
}

export interface ExerciseThin {
  name: string;
  notes: string;
  sets: {
    weight: string;
    reps: string;
    rpe: string;
  }[];
}

export interface DateExercise {
  userId?: string | null;
  date?: string | null;
  id?: number | null;
  name?: string | null;
  notes?: string | null;
  workoutId?: number | null;
  sets: Set[];
}

export interface ExerciseSummary {
  name: string;
  exercises: DateExercise[];
}

export interface Set {
  id: number;
  weight: string;
  reps: string;
  rpe: string;
  exerciseId: number;
}
