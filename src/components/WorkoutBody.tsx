import { useEffect, useState, type ChangeEvent } from "react";
import type { Workout } from "../types/workout";
import { Field } from "./Field";

type Props = {
    workout: Workout;
    onAddExercise: () => void;
    onDeleteExercise: (exerciseId: string) => void;
    onExerciseNameChange: (exerciseId: string, name: string) => void;
    onExerciseFieldChange: (
        exerciseId: string,
        field: "sets" | "reps" | "weight",
        value: number
    ) => void;
    onExerciseNotesChange: (exerciseId: string, notes: string) => void;
};

type ExerciseDraft = {
    name: string;
    sets: string;
    reps: string;
    weight: string;
    notes: string;
};

export function WorkoutBody({
    workout,
    onDeleteExercise,
    onExerciseNameChange,
    onExerciseFieldChange,
    onExerciseNotesChange,
}: Props) {
    const [drafts, setDrafts] = useState<Record<string, ExerciseDraft>>({});

    useEffect(() => {
        setDrafts((prev) => {
            const next = { ...prev };

            for (const exercise of workout.exercises) {
                next[exercise.id] = {
                    name: prev[exercise.id]?.name ?? exercise.name ?? "",
                    sets:
                        prev[exercise.id]?.sets ??
                        (exercise.sets === 0 ? "" : String(exercise.sets)),
                    reps:
                        prev[exercise.id]?.reps ??
                        (exercise.reps == null || exercise.reps === 0
                            ? ""
                            : String(exercise.reps)),
                    weight:
                        prev[exercise.id]?.weight ??
                        (exercise.weight == null || exercise.weight === 0
                            ? ""
                            : String(exercise.weight)),
                    notes: prev[exercise.id]?.notes ?? exercise.notes ?? "",
                };
            }

            for (const draftId of Object.keys(next)) {
                const exists = workout.exercises.some((exercise) => exercise.id === draftId);

                if (!exists) {
                    delete next[draftId];
                }
            }

            return next;
        });
    }, [workout.exercises]);

    function updateDraft(
        exerciseId: string,
        field: keyof ExerciseDraft,
        value: string
    ) {
        setDrafts((prev) => ({
            ...prev,
            [exerciseId]: {
                ...prev[exerciseId],
                [field]: value,
            },
        }));
    }

    function getExerciseNumberAsString(value: number | null | undefined) {
        if (value == null || value === 0) {
            return "";
        }

        return String(value);
    }

    function commitTextField(
        exerciseId: string,
        field: "name" | "notes",
        draftValue: string,
        serverValue: string
    ) {
        if (draftValue === serverValue) {
            return;
        }

        if (field === "name") {
            const trimmedName = draftValue.trim();

            if (!trimmedName) {
                setDrafts((prev) => ({
                    ...prev,
                    [exerciseId]: {
                        ...prev[exerciseId],
                        name: serverValue,
                    },
                }));
                return;
            }

            onExerciseNameChange(exerciseId, trimmedName);
            return;
        }

        onExerciseNotesChange(exerciseId, draftValue);
    }

    function commitNumberField(
        exerciseId: string,
        field: "sets" | "reps" | "weight",
        draftValue: string,
        serverValue: number | null | undefined
    ) {
        const normalizedServerValue = getExerciseNumberAsString(serverValue);

        if (draftValue === normalizedServerValue) {
            return;
        }

        if (draftValue.trim() === "") {
            onExerciseFieldChange(exerciseId, field, 0);
            return;
        }

        const parsedValue = Number(draftValue);

        if (Number.isNaN(parsedValue) || parsedValue < 0) {
            setDrafts((prev) => ({
                ...prev,
                [exerciseId]: {
                    ...prev[exerciseId],
                    [field]: normalizedServerValue,
                },
            }));
            return;
        }

        onExerciseFieldChange(exerciseId, field, parsedValue);
    }

    return (
        <div className="space-y-5">
            {workout.exercises.map((exercise) => {
                const draft = drafts[exercise.id];

                if (!draft) {
                    return null;
                }

                function handleDelete() {
                    onDeleteExercise(exercise.id);
                }

                function handleNameBlur() {
                    commitTextField(
                        exercise.id,
                        "name",
                        draft.name,
                        exercise.name ?? ""
                    );
                }

                function handleSetsBlur() {
                    commitNumberField(
                        exercise.id,
                        "sets",
                        draft.sets,
                        exercise.sets
                    );
                }

                function handleWeightBlur() {
                    commitNumberField(
                        exercise.id,
                        "weight",
                        draft.weight,
                        exercise.weight
                    );
                }

                function handleRepsBlur() {
                    commitNumberField(
                        exercise.id,
                        "reps",
                        draft.reps,
                        exercise.reps
                    );
                }

                function handleNotesChange(event: ChangeEvent<HTMLTextAreaElement>) {
                    updateDraft(exercise.id, "notes", event.target.value);
                }

                function handleNotesBlur() {
                    commitTextField(
                        exercise.id,
                        "notes",
                        draft.notes,
                        exercise.notes ?? ""
                    );
                }

                return (
                    <div
                        key={exercise.id}
                        className="rounded-lg border border-zinc-200 bg-white p-4"
                    >
                        <div className="grid grid-cols-12 items-end gap-3">
                            <div className="col-span-12 md:col-span-5">
                                <div className="mb-1 text-sm font-medium text-zinc-700">
                                    Exercise
                                </div>
                                <Field
                                    type="text"
                                    value={draft.name}
                                    onChange={(value) =>
                                        updateDraft(exercise.id, "name", value)
                                    }
                                    onBlur={handleNameBlur}
                                    placeholder="e.g. Bench press"
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <div className="mb-1 text-sm font-medium text-zinc-700">
                                    Sets
                                </div>
                                <Field
                                    type="number"
                                    min={0}
                                    value={draft.sets}
                                    onChange={(value) =>
                                        updateDraft(exercise.id, "sets", value)
                                    }
                                    onBlur={handleSetsBlur}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <div className="mb-1 text-sm font-medium text-zinc-700">
                                    Weight
                                </div>
                                <Field
                                    type="number"
                                    min={0}
                                    value={draft.weight}
                                    onChange={(value) =>
                                        updateDraft(exercise.id, "weight", value)
                                    }
                                    onBlur={handleWeightBlur}
                                />
                            </div>

                            <div className="col-span-4 md:col-span-2">
                                <div className="mb-1 text-sm font-medium text-zinc-700">
                                    Reps
                                </div>
                                <Field
                                    type="number"
                                    min={0}
                                    value={draft.reps}
                                    onChange={(value) =>
                                        updateDraft(exercise.id, "reps", value)
                                    }
                                    onBlur={handleRepsBlur}
                                />
                            </div>

                            <div className="col-span-12 md:col-span-1">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="h-10 w-full rounded-md border border-zinc-300 bg-white text-sm font-medium text-zinc-900 hover:bg-zinc-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className="mb-1 text-sm font-medium text-zinc-700">
                                Notes
                            </div>
                            <textarea
                                value={draft.notes}
                                onChange={handleNotesChange}
                                onBlur={handleNotesBlur}
                                placeholder="Optional notes..."
                                rows={3}
                                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 resize-none"
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}