import type { ExerciseDraft } from "../../types/forms";
import type { Exercise } from "../../types/workout";

export function createExercise(draft: ExerciseDraft): Exercise {
    const newExercise: Exercise = {
        id: crypto.randomUUID(),
        name: draft.name,
        sets: draft.sets,
    };

    return newExercise;
}
