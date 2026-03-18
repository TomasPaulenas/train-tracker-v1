import type { Workout } from "../../types/workout";
import { sortExercises } from "./sortExercises";

export function updateExerciseNotes(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    notes: string
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
                notes,
            };
        });

        return {
            ...workout,
            exercises: sortExercises(updatedExercises),
        };
    });
}