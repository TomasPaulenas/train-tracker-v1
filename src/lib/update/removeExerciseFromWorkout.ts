import type { Workout } from "../../types/workout";

export function removeExerciseFromWorkout(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string
): Workout[] {
    return workouts.map(workout => {
        if (workout.id !== workoutId) return workout;

        const updatedExercises = workout.exercises.filter(
            exercise => exercise.id !== exerciseId
        );

        return {
            ...workout,
            exercises: updatedExercises,
        };
    });
}
