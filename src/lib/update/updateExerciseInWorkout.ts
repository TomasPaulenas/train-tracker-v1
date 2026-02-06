import type { Workout, Exercise } from "../../types/workout";


export function updateExerciseInWorkout(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    patch: Partial<Pick<Exercise, "name" | "sets">>
): Workout[] {
    return workouts.map((w) =>
        w.id !== workoutId
            ? w
            : {
                ...w,
                exercises: w.exercises.map((e) =>
                    e.id !== exerciseId ? e : { ...e, ...patch }
                ),
            }
    );
}

