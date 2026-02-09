import type { Workout } from "../../types/workout";

export function getWorkoutTotals(
    workouts: Workout[]
): { totalWorkouts: number; totalExercises: number } {
    const totalWorkouts = workouts.length;

    const totalExercises = workouts.reduce(
        (total, workout) => total + workout.exercises.length,
        0
    );

    return { totalWorkouts, totalExercises };
}
