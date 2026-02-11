import { useEffect, useState } from "react";
import type { KeyboardEvent } from "react";
import { Field } from "./Field";

type Props = {
    title: string;
    exerciseCount: number;
    dateLabel: string;
    isOpen: boolean;
    isEditing: boolean;
    onToggle: () => void;
    onStartEdit: () => void;
    onFinishEdit: (title: string) => void;
    onAddExercise: () => void;
    onDeleteWorkout: () => void;
};

export function WorkoutHeader({
    title,
    exerciseCount,
    dateLabel,
    isOpen,
    isEditing,
    onToggle,
    onStartEdit,
    onFinishEdit,
    onAddExercise,
    onDeleteWorkout,
}: Props) {
    const [draftTitle, setDraftTitle] = useState(title);

    useEffect(() => {
        setDraftTitle(title);
    }, [title]);

    function finishEdit() {
        const nextTitle = draftTitle.trim() || "Untitled workout";
        onFinishEdit(nextTitle);
    }

    function cancelEdit() {
        setDraftTitle(title);
        onFinishEdit(title);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            finishEdit();
            return;
        }

        if (e.key === "Escape") {
            cancelEdit();
        }
    }

    return (
        <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
                {isEditing ? (
                    <div className="w-full">
                        <Field
                            type="text"
                            value={draftTitle}
                            autoFocus
                            onChange={setDraftTitle}
                            onBlur={finishEdit}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={onToggle}
                        className="w-full text-left text-lg font-semibold hover:underline"
                    >
                        {title}
                    </button>
                )}

                <div className="mt-1 text-sm text-zinc-300">
                    {exerciseCount} exercises · {dateLabel}
                </div>
            </div>

            <div className="flex shrink-0 gap-2">
                {!isEditing && (
                    <button
                        type="button"
                        onClick={onStartEdit}
                        className="rounded-md border border-zinc-700 px-3 py-1 text-sm hover:bg-zinc-800"
                    >
                        Edit
                    </button>
                )}

                {isOpen && (
                    <button
                        type="button"
                        onClick={onAddExercise}
                        className="rounded-md border border-zinc-700 px-3 py-1 text-sm hover:bg-zinc-800"
                    >
                        Add exercise
                    </button>
                )}

                <button
                    type="button"
                    onClick={onDeleteWorkout}
                    className="rounded-md border border-zinc-700 px-3 py-1 text-sm hover:bg-zinc-800"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}