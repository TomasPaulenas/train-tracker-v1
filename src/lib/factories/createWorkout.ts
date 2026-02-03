import type { Workout } from "../../types/workout";

export function createWorkout(): Workout {
    return {
        id: Math.random().toString(),
        title: "New Workout",
        date: new Date().toISOString().slice(0, 10),
        exercises: [],
    };
}