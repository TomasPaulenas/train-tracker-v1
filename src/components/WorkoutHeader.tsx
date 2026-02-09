import { useEffect, useState } from "react";
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
    const [draftTitle, setDraftTitle] = useState("");

    // Mantiene el draft en sync cuando cambia el title (por ejemplo al abrir/cerrar o al actualizar desde arriba)
    useEffect(() => {
        setDraftTitle(title);
    }, [title]);

    function handleStartEdit() {
        setDraftTitle(title);
        onStartEdit();
    }

    function finishEdit() {
        const nextTitle = draftTitle.trim() || "Untitled workout";
        onFinishEdit(nextTitle);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            finishEdit();
        }
    }

    return (
        <div>
            <div>
                {isEditing ? (
                    <Field
                        type="text"
                        value={draftTitle}
                        autoFocus
                        onChange={setDraftTitle}
                        onBlur={finishEdit}
                        onKeyDown={handleKeyDown}
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
                    <button type="button" onClick={handleStartEdit}>
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
