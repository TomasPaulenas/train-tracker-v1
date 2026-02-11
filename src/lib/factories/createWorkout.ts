import type { Workout } from "../../types/workout";

export function createWorkout(): Workout {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    return {
        id,
        title: "New workout",
        date: now,
        exercises: [],
        notes: "",
        createdAt: now,
    };
}
