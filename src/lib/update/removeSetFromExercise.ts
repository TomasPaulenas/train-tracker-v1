import type { Workout } from "../../types/workout";



export function removeSetFromExercise(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    setIndex: number
): Workout[] {
    return workouts.map((w) =>
        w.id !== workoutId
            ? w
            : {
                ...w,
                exercises: w.exercises.map((e) =>
                    e.id !== exerciseId
                        ? e
                        : { ...e, sets: e.sets.filter((_, i) => i !== setIndex) }
                ),
            }
    );
}
