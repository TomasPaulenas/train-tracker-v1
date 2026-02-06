import type { Workout, Set } from "../../types/workout";



export function addSetToExercise(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    newSet: Set
): Workout[] {
    return workouts.map((w) =>
        w.id !== workoutId
            ? w
            : {
                ...w,
                exercises: w.exercises.map((e) =>
                    e.id !== exerciseId
                        ? e
                        : { ...e, sets: [...e.sets, newSet] }
                ),
            }
    );
}
