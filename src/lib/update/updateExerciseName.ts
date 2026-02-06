import type { Workout } from "../../types/workout";
import { updateExerciseInWorkout } from "./updateExerciseInWorkout";

export function updateExerciseName(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    name: string
): Workout[] {
    return updateExerciseInWorkout(workouts, workoutId, exerciseId, { name });
}
