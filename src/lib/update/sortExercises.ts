import type { Exercise } from "../../types/workout";

export function sortExercises(exercises: Exercise[]) {
    return [...exercises].sort((a, b) => Number(a.id) - Number(b.id));
}