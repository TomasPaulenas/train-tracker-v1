import type { Workout } from "../../types/workout";
import { createExercise } from "../factories/createExercise";
import { addExerciseToWorkout } from "./addExerciseToWorkout";

export function addEmptyExerciseToWorkout(workouts: Workout[], workoutId: string) {
    const emptyDraft = { name: "", sets: [{ reps: 0, weight: 0 }] };
    const exercise = createExercise(emptyDraft);
    return addExerciseToWorkout(workouts, workoutId, exercise);
}
