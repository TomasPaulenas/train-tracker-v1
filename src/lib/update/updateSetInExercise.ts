import type { Workout, Set } from "../../types/workout";



export function updateSetInExercise(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    setIndex: number,
    patch: Partial<Set>
): Workout[] {
    return workouts.map((w) =>
        w.id !== workoutId
            ? w
            : {
                ...w,
                exercises: w.exercises.map((e) =>
                    e.id !== exerciseId
                        ? e
                        : {
                            ...e,
                            sets: e.sets.map((s, i) =>
                                i !== setIndex ? s : { ...s, ...patch }
                            ),
                        }
                ),
            }
    );
}
