import type { ExerciseDraft } from "../../types/forms";

type SetField = "reps" | "weight";

/** Cambia el nombre del draft (puro: no muta) */
export function setDraftName(draft: ExerciseDraft, name: string): ExerciseDraft {
    return {
        ...draft,
        name,
    };
}

/** Cambia un campo de un set por índice (puro: no muta) */
export function setDraftSetField(
    draft: ExerciseDraft,
    index: number,
    field: SetField,
    value: number
): ExerciseDraft {
    return {
        ...draft,
        sets: draft.sets.map((set, i) => {
            if (i !== index) return set;
            return { ...set, [field]: value };
        }),
    };
}
