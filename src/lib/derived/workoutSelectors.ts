import type { Workout } from "../../types/workout";

export function getWorkoutTotals(workouts: Workout[]) {
    const totalWorkouts = workouts.length;

    let totalExercises = 0;

    for (const workout of workouts) {
        totalExercises += workout.exercises.length;
    }

    return {
        totalWorkouts,
        totalExercises,
    };
}
