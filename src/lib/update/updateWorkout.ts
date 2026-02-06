import type { Workout } from "../../types/workout";


export function updateWorkout(
    workouts: Workout[],
    workoutId: string,
    patch: Partial<Pick<Workout, "title" | "notes">>
): Workout[] {
    return workouts.map((w) =>
        w.id !== workoutId ? w : { ...w, ...patch }
    );
}
