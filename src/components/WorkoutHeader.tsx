import { useState } from "react";
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

    function finishEdit() {
        const next = draftTitle.trim() || "Untitled workout";
        onFinishEdit(next);
    }

    return (
        <div>
            <div>
                {isEditing ? (
                    <Field
                        type="text"
                        value={draftTitle}
                        autoFocus
                        onChange={(v) => setDraftTitle(String(v))}
                        onBlur={finishEdit}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") finishEdit();
                        }}
                    />
                ) : (
                    <button type="button" onClick={onToggle}>
                        {title}
                    </button>
                )}

                <div>
                    {exerciseCount} exercises · {dateLabel}
                </div>
            </div>

            <div>
                {!isEditing && (
                    <button
                        type="button"
                        onClick={() => {
                            setDraftTitle(title);
                            onStartEdit();
                        }}
                    >
                        edit workout
                    </button>
                )}

                {isOpen && (
                    <button type="button" onClick={onAddExercise}>
                        add exercise
                    </button>
                )}

                <button type="button" onClick={onDeleteWorkout}>
                    delete workout
                </button>
            </div>
        </div>
    );
}
