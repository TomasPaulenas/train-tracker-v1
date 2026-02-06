import type { Workout } from "../../types/workout";


export function createWorkout(): Workout {
    return {
        id: crypto.randomUUID(),
        title: "New Workout",
        date: new Date().toISOString(),
        exercises: [],
    };
}
