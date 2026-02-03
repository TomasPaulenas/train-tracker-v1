import type { Workout, Exercise, Set } from "../../types/workout";
import { deleteWorkout } from "./deleteWorkout";

// Workouts
export function addWorkout(workouts: Workout[], workout: Workout): Workout[] {
    return [...workouts, workout];
}

export function removeWorkout(workouts: Workout[], workoutId: string): Workout[] {
    // por ahora reusamos tu helper existente (temporal)
    return deleteWorkout(workouts, workoutId);
}

export function updateWorkout(
    workouts: Workout[],
    workoutId: string,
    patch: Partial<Pick<Workout, "title" | "date" | "notes">>
): Workout[] {
    return workouts.map((w) => (w.id !== workoutId ? w : { ...w, ...patch }));
}

// Exercises
export function addExerciseToWorkout(
    workouts: Workout[],
    workoutId: string,
    exercise: Exercise
): Workout[] {
    return workouts.map((w) => {
        if (w.id !== workoutId) return w;
        return { ...w, exercises: [...w.exercises, exercise] };
    });
}

export function updateExerciseInWorkout(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    patch: Partial<Pick<Exercise, "name" | "sets">>
): Workout[] {
    return workouts.map((w) => {
        if (w.id !== workoutId) return w;

        return {
            ...w,
            exercises: w.exercises.map((e) =>
                e.id !== exerciseId ? e : { ...e, ...patch }
            ),
        };
    });
}

export function removeExerciseFromWorkout(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string
): Workout[] {
    return workouts.map((w) => {
        if (w.id !== workoutId) return w;

        return {
            ...w,
            exercises: w.exercises.filter((e) => e.id !== exerciseId),
        };
    });
}

// Sets
export function addSetToExercise(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    newSet: Set
): Workout[] {
    return workouts.map((w) => {
        if (w.id !== workoutId) return w;

        return {
            ...w,
            exercises: w.exercises.map((e) =>
                e.id !== exerciseId ? e : { ...e, sets: [...e.sets, newSet] }
            ),
        };
    });
}

export function updateSetInExercise(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    setIndex: number,
    patch: Partial<Set>
): Workout[] {
    return workouts.map((w) => {
        if (w.id !== workoutId) return w;

        return {
            ...w,
            exercises: w.exercises.map((e) => {
                if (e.id !== exerciseId) return e;

                return {
                    ...e,
                    sets: e.sets.map((s, i) => (i !== setIndex ? s : { ...s, ...patch })),
                };
            }),
        };
    });
}

export function removeSetFromExercise(
    workouts: Workout[],
    workoutId: string,
    exerciseId: string,
    setIndex: number
): Workout[] {
    return workouts.map((w) => {
        if (w.id !== workoutId) return w;

        return {
            ...w,
            exercises: w.exercises.map((e) => {
                if (e.id !== exerciseId) return e;

                return { ...e, sets: e.sets.filter((_, i) => i !== setIndex) };
            }),
        };
    });
}
