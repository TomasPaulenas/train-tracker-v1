import type { Workout, Set } from "../../types/workout";

export function updateExerciseSet(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    setIndex: number,
    updates: Partial<Set>
): Workout[] {
    return workouts.map(workout => {
        if (workout.id !== workoutId) return workout;

        const updatedExercises = workout.exercises.map(exercise => {
            if (exercise.id !== exerciseId) return exercise;

            const updatedSets = exercise.sets.map((set, index) => {
                if (index !== setIndex) return set;
                return { ...set, ...updates };
            });

            return { ...exercise, sets: updatedSets };
        });

        return { ...workout, exercises: updatedExercises };
    });
}
