import type { Workout } from "../../types/workout";

export function getWorkoutTotals(workouts: Workout[]) {
    const totalWorkouts = workouts.length;

    const totalExercises = workouts.reduce(
        (acc, workout) => acc + workout.exercises.length,
        0
    );

    return { totalWorkouts, totalExercises };
}
