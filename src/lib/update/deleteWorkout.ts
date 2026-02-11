import type { Workout } from "../../types/workout";

export function deleteWorkout(
    workouts: Workout[],
    workoutId: string
): Workout[] {
    const remainingWorkouts = workouts.filter(
        (workout) => workout.id !== workoutId
    );

    return remainingWorkouts;
}
