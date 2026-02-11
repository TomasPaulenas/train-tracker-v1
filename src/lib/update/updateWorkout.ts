import type { Workout } from "../../types/workout";

export function updateWorkoutDetails(
    workouts: Workout[],
    workoutId: string,
    title?: string,
    notes?: string
): Workout[] {
    return workouts.map((workout) => {
        if (workout.id !== workoutId) {
            return workout;
        }

        const nextTitle = title !== undefined ? title : workout.title;
        const nextNotes = notes !== undefined ? notes : workout.notes;

        return {
            ...workout,
            title: nextTitle,
            notes: nextNotes,
        };
    });
}
