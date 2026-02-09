import type { Workout } from "../../types/workout";

export function createWorkout(): Workout {
    const newWorkout: Workout = {
        id: crypto.randomUUID(),
        title: "New Workout",
        date: new Date().toISOString(),
        exercises: [],
    };

    return newWorkout;
}
