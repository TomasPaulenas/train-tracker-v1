import type { Workout } from "../../types/workout";



export function removeExerciseFromWorkout(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string
): Workout[] {
    return workouts.map((w) =>
        w.id !== workoutId
            ? w
            : {
                ...w,
                exercises: w.exercises.filter((e) => e.id !== exerciseId),
            }
    );
}
