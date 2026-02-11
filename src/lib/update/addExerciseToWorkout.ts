import type { Workout } from "../../types/workout";
import { createExercise } from "../factories/createExercise";

export function addExerciseToWorkout(
    workouts: Workout[],
    workoutId: string
): Workout[] {
    const newExercise = createExercise({ name: "" });

    return workouts.map((workout) => {
        if (workout.id !== workoutId) {
            return workout;
        }

        const updatedExercises = [...workout.exercises, newExercise];

        return {
            ...workout,
            exercises: updatedExercises,
        };
    });
}
