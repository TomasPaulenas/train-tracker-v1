// src/lib/update/updateExerciseField.ts
// ESTE ARCHIVO TIENE QUE EXPORTAR "updateExerciseField" (tal cual)

import type { Workout } from "../../types/workout";

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
            exercises: updatedExercises,
        };
    });
}
