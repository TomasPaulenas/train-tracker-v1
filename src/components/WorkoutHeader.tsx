import { useEffect, useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
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

    function stop(e: MouseEvent) {
        e.stopPropagation();
    }

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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
                            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                        />
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={onToggle}
                        className="group w-full rounded-md p-2 -m-2 text-left transition-colors hover:bg-zinc-50"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className={[
                                    "text-zinc-400 transition-transform duration-200",
                                    isOpen ? "rotate-90" : "rotate-0",
                                ].join(" ")}
                                aria-hidden
                            >
                                ▶
                            </span>

                            <span className="truncate text-base font-semibold text-zinc-900">
                                {title}
                            </span>
                        </div>

                        <div className="mt-1 text-sm text-zinc-600">
                            {exerciseCount} exercises · {dateLabel}
                        </div>
                    </button>
                )}
            </div>

            <div className="flex flex-wrap gap-2 sm:justify-end">
                {!isEditing && (
                    <button
                        type="button"
                        onClick={(e) => {
                            stop(e);
                            onStartEdit();
                        }}
                        className="w-full sm:w-auto rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 whitespace-nowrap"
                    >
                        Edit
                    </button>
                )}

                <button
                    type="button"
                    onClick={(e) => {
                        stop(e);
                        onDeleteWorkout();
                    }}
                    className="w-full sm:w-auto rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50 whitespace-nowrap"
                >
                    Delete
                </button>

                {isOpen && (
                    <button
                        type="button"
                        onClick={(e) => {
                            stop(e);
                            onAddExercise();
                        }}
                        className="w-full sm:w-auto rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 whitespace-nowrap"
                    >
                        Add exercise
                    </button>
                )}
            </div>
        </div>
    );
}
