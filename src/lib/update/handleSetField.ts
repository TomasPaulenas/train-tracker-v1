import type { Workout } from "../../types/workout";
import { updateSetInExercise } from "./updateSetInExercise";

export function handleSetField(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    field: "reps" | "weight",
    value: number
): Workout[] {
    if (field === "reps") {
        return updateSetInExercise(workouts, workoutId, exerciseId, 0, {
            reps: value,
        });
    }

    return updateSetInExercise(workouts, workoutId, exerciseId, 0, {
        weight: value,
    });
}
