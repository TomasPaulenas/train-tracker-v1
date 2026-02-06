import type { ExerciseDraft } from "../../types/forms"
import type { Exercise } from "../../types/workout"

export function createExercise(draft: ExerciseDraft):
    Exercise {



    return {
        id: Math.random().toString(),
        name: draft.name,
        sets: draft.sets,
    }




};