import type { Workout } from "../../types/workout";

export function updateWorkoutDetails(
    workouts: Workout[],
    workoutId: string,
    title?: string,
    notes?: string
): Workout[] {
    return workouts.map(workout => {
        if (workout.id !== workoutId) {
            return workout;
        }

        return {
            ...workout,
            title: title ?? workout.title,
            notes: notes ?? workout.notes,
        };
    });
}
