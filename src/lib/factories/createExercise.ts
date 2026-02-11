import type { ExerciseDraft } from "../../types/forms";
import type { Exercise } from "../../types/workout";

export function createExercise(draft: ExerciseDraft): Exercise {
    const id = crypto.randomUUID();

    return {
        id,
        name: draft.name,
        sets: 0,
        reps: 0,
        weight: 0,
    };
}
