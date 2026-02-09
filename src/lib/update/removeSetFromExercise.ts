import type { Workout } from "../../types/workout";

export function removeSetFromExercise(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    setIndex: number
): Workout[] {
    return workouts.map(workout => {
        if (workout.id !== workoutId) return workout;

        const updatedExercises = workout.exercises.map(exercise => {
            if (exercise.id !== exerciseId) return exercise;

            const updatedSets = exercise.sets.filter(
                (_, index) => index !== setIndex
            );

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
