import type { ExerciseDraft } from "../../types/forms";

export function setDraftName(draft: ExerciseDraft, name: string): ExerciseDraft {
    return {
        ...draft,
        name,
    };
}

export function setDraftSetField(
    draft: ExerciseDraft,
    index: number,
    field: "reps" | "weight",
    value: number
): ExerciseDraft {
    const updatedSets = draft.sets.map((set, i) => {
        if (i !== index) return set;

        if (field === "reps") {
            return { ...set, reps: value };
        }

        return { ...set, weight: value };
    });

    return {
        ...draft,
        sets: updatedSets,
    };
}
