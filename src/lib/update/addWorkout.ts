import type { Workout } from "../../types/workout";


export function addWorkout(
    workouts: Workout[],
    workout: Workout
): Workout[] {
    return [...workouts, workout];
}

