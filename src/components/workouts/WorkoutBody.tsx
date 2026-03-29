import { useEffect, useState, type ChangeEvent } from "react";
import type { Workout } from "../../types/workout";
import { Field } from "./Field";
import type { ExerciseTemplate } from "../../types/exerciseTemplate";

type Props = {
    workout: Workout;
    templates: ExerciseTemplate[];
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

function formatNumberField(value: number | null | undefined) {
    if (value == null || value === 0) {
        return "";
    }

    return String(value);
}

function buildDrafts(workout: Workout): Record<string, ExerciseDraft> {
    const nextDrafts: Record<string, ExerciseDraft> = {};

    for (const exercise of workout.exercises) {
        nextDrafts[exercise.id] = {
            name: exercise.name ?? "",
            sets: formatNumberField(exercise.sets),
            reps: formatNumberField(exercise.reps),
            weight: formatNumberField(exercise.weight),
            notes: exercise.notes ?? "",
        };
    }

    return nextDrafts;
}

export function WorkoutBody({
    templates,
    workout,
    onDeleteExercise,
    onExerciseNameChange,
    onExerciseFieldChange,
    onExerciseNotesChange,
}: Props) {
    const [drafts, setDrafts] = useState<Record<string, ExerciseDraft>>(() =>
        buildDrafts(workout)
    );
    const [openSuggestions, setOpenSuggestions] = useState<Record<string, boolean>>(
        {}
    );

    useEffect(() => {
        setDrafts((prev) => {
            const next: Record<string, ExerciseDraft> = {};

            for (const exercise of workout.exercises) {
                const existingDraft = prev[exercise.id];

                if (existingDraft) {
                    next[exercise.id] = existingDraft;
                } else {
                    next[exercise.id] = {
                        name: exercise.name ?? "",
                        sets: formatNumberField(exercise.sets),
                        reps: formatNumberField(exercise.reps),
                        weight: formatNumberField(exercise.weight),
                        notes: exercise.notes ?? "",
                    };
                }
            }

            return next;
        });
    }, [workout]);

    function updateDraft(
        exerciseId: string,
        field: keyof ExerciseDraft,
        value: string
    ) {
        setDrafts((prev) => ({
            ...prev,
            [exerciseId]: {
                ...(prev[exerciseId] ?? {
                    name: "",
                    sets: "",
                    reps: "",
                    weight: "",
                    notes: "",
                }),
                [field]: value,
            },
        }));
    }

    function commitName(
        exerciseId: string,
        draftValue: string,
        currentValue: string
    ) {
        const trimmedValue = draftValue.trim();

        if (trimmedValue === currentValue) {
            return;
        }

        onExerciseNameChange(exerciseId, trimmedValue);
    }

    function commitNotes(
        exerciseId: string,
        draftValue: string,
        currentValue: string
    ) {
        if (draftValue === currentValue) {
            return;
        }

        onExerciseNotesChange(exerciseId, draftValue);
    }

    function commitNumber(
        exerciseId: string,
        field: "sets" | "reps" | "weight",
        draftValue: string,
        currentValue: number | null | undefined
    ) {
        const currentAsString = formatNumberField(currentValue);

        if (draftValue === currentAsString) {
            return;
        }

        if (draftValue.trim() === "") {
            onExerciseFieldChange(exerciseId, field, 0);
            return;
        }

        const parsedValue = Number(draftValue);

        if (Number.isNaN(parsedValue)) {
            setDrafts((prev) => ({
                ...prev,
                [exerciseId]: {
                    ...prev[exerciseId],
                    [field]: currentAsString,
                },
            }));
            return;
        }

        onExerciseFieldChange(exerciseId, field, parsedValue);
    }

    function getFilteredTemplates(exerciseId: string) {
        const query = drafts[exerciseId]?.name?.trim().toLowerCase() ?? "";

        if (!query) {
            return templates;
        }

        return templates.filter((template) =>
            template.name.toLowerCase().includes(query)
        );
    }

    return (
        <div className="space-y-5">
            {workout.exercises.length === 0 ? (
                <div className="rounded-lg border border-zinc-200 bg-white p-4">
                    <p>No exercises yet</p>
                </div>
            ) : (
                workout.exercises.map((exercise) => {
                    const draft = drafts[exercise.id] ?? {
                        name: exercise.name ?? "",
                        sets: formatNumberField(exercise.sets),
                        reps: formatNumberField(exercise.reps),
                        weight: formatNumberField(exercise.weight),
                        notes: exercise.notes ?? "",
                    };

                    const filteredTemplates = getFilteredTemplates(exercise.id);
                    const showSuggestions = openSuggestions[exercise.id] === true;

                    function handleDelete() {
                        onDeleteExercise(exercise.id);
                    }

                    function handleNameBlur() {
                        commitName(exercise.id, draft.name, exercise.name ?? "");
                    }

                    function handleSetsBlur() {
                        commitNumber(exercise.id, "sets", draft.sets, exercise.sets);
                    }

                    function handleWeightBlur() {
                        commitNumber(exercise.id, "weight", draft.weight, exercise.weight);
                    }

                    function handleRepsBlur() {
                        commitNumber(exercise.id, "reps", draft.reps, exercise.reps);
                    }

                    function handleNotesChange(event: ChangeEvent<HTMLTextAreaElement>) {
                        updateDraft(exercise.id, "notes", event.target.value);
                    }

                    function handleNotesBlur() {
                        commitNotes(exercise.id, draft.notes, exercise.notes ?? "");
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

                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={draft.name}
                                            onChange={(event) =>
                                                updateDraft(exercise.id, "name", event.target.value)
                                            }
                                            onFocus={() =>
                                                setOpenSuggestions((prev) => ({
                                                    ...prev,
                                                    [exercise.id]: true,
                                                }))
                                            }
                                            onBlur={() => {
                                                setTimeout(() => {
                                                    setOpenSuggestions((prev) => ({
                                                        ...prev,
                                                        [exercise.id]: false,
                                                    }));
                                                    handleNameBlur();
                                                }, 140);
                                            }}
                                            placeholder="e.g. Bench press"
                                            className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                                        />

                                        {showSuggestions && (
                                            <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-xl">
                                                <div className="max-h-56 overflow-y-auto py-1">
                                                    {filteredTemplates.length > 0 ? (
                                                        filteredTemplates.map((template) => (
                                                            <button
                                                                key={template.id}
                                                                type="button"
                                                                onMouseDown={(event) => {
                                                                    event.preventDefault();

                                                                    updateDraft(
                                                                        exercise.id,
                                                                        "name",
                                                                        template.name
                                                                    );

                                                                    onExerciseNameChange(
                                                                        exercise.id,
                                                                        template.name
                                                                    );

                                                                    setOpenSuggestions((prev) => ({
                                                                        ...prev,
                                                                        [exercise.id]: false,
                                                                    }));
                                                                }}
                                                                className="block w-full px-3 py-2 text-left text-sm text-zinc-900 transition hover:bg-zinc-50"
                                                            >
                                                                <div className="font-medium">
                                                                    {template.name}
                                                                </div>

                                                                {template.description ? (
                                                                    <div className="text-xs text-zinc-500">
                                                                        {template.description}
                                                                    </div>
                                                                ) : null}
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <div className="px-3 py-2 text-sm text-zinc-500">
                                                            No matches found
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-span-4 md:col-span-2">
                                    <div className="mb-1 text-sm font-medium text-zinc-700">
                                        Sets
                                    </div>
                                    <Field
                                        type="number"
                                        min={0}
                                        value={draft.sets}
                                        onChange={(value) => updateDraft(exercise.id, "sets", value)}
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
                                        onChange={(value) => updateDraft(exercise.id, "reps", value)}
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
                                    className="w-full resize-none rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                                />
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}