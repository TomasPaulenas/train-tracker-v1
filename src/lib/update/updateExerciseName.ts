import type { Workout } from "../../types/workout";
import { sortExercises } from "./sortExercises";

export function updateExerciseName(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    name: string
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
                name,
            };
        });

        return {
            ...workout,
            exercises: sortExercises(updatedExercises),
        };
    });
}