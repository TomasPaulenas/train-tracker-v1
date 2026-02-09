import type { Workout } from "../../types/workout";

export function deleteWorkout(
    workouts: Workout[],
    workoutId: string
): Workout[] {
    return workouts.filter(workout => workout.id !== workoutId);
}
