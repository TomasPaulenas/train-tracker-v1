import type { Workout } from "../../types/workout";
import { createExercise } from "../factories/createExercise";

export function addEmptyExerciseToWorkout(
    workouts: Workout[],
    workoutId: string
): Workout[] {
    const newExercise = createExercise({
        name: "",
        sets: [{ reps: 0, weight: 0, sets: 0 }],
    });

    return workouts.map(workout => {
        if (workout.id !== workoutId) return workout;

        return {
            ...workout,
            exercises: [...workout.exercises, newExercise],
        };
    });
}
