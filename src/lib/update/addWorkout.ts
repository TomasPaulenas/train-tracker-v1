import type { Workout } from "../../types/workout";

export function addWorkout(
    workouts: Workout[],
    workout: Workout
): Workout[] {
    const nextWorkouts = [...workouts, workout];

    return nextWorkouts;
}
