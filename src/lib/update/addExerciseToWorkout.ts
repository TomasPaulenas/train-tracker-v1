import type { Workout, Exercise } from "../../types/workout";

export function addExerciseToWorkout(
    workouts: Workout[],
    workoutId: string,
    exercise: Exercise
): Workout[] {
    return workouts.map((w) =>
        w.id !== workoutId
            ? w
            : { ...w, exercises: [...w.exercises, exercise] }
    );
}
