import type { Exercise, Workout } from "../../types/workout";
import { sortExercises } from "./sortExercises";

export function addExerciseToWorkout(
    workouts: Workout[],
    workoutId: string,
    exercise: Exercise
): Workout[] {
    return workouts.map((workout) => {
        if (workout.id !== workoutId) {
            return workout;
        }

        return {
            ...workout,
            exercises: sortExercises([...workout.exercises, exercise]),
        };
    });
}