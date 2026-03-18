import type { Workout } from "../../types/workout";
import { sortExercises } from "./sortExercises";

export function updateExerciseField(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    field: "sets" | "reps" | "weight",
    value: number
): Workout[] {
    return workouts.map((workout) => {
        if (workout.id !== workoutId) {
            return workout;
        }

        const updatedExercises = workout.exercises.map((exercise) => {
            if (exercise.id !== exerciseId) {
                return exercise;
            }

            return {
                ...exercise,
                [field]: value,
            };
        });

        return {
            ...workout,
            exercises: sortExercises(updatedExercises),
        };
    });
}