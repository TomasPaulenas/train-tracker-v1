import type { Workout, Set } from "../../types/workout";

export function addSetToExercise(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    newSet: Set
): Workout[] {
    return workouts.map(workout => {
        if (workout.id !== workoutId) return workout;

        const updatedExercises = workout.exercises.map(exercise => {
            if (exercise.id !== exerciseId) return exercise;

            const updatedSets = [...exercise.sets, newSet];

            return {
                ...exercise,
                sets: updatedSets,
            };
        });

        return {
            ...workout,
            exercises: updatedExercises,
        };
    });
}
