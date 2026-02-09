import type { Workout, Exercise } from "../../types/workout";

export function addExerciseToWorkout(
    workouts: Workout[],
    workoutId: string,
    exercise: Exercise
): Workout[] {
    return workouts.map(workout => {
        if (workout.id !== workoutId) return workout;

        const updatedExercises = [...workout.exercises, exercise];

        return {
            ...workout,
            exercises: updatedExercises,
        };
    });
}
