import type { Workout } from "../../types/workout";
import { WorkoutHeader } from "./WorkoutHeader";
import { WorkoutBody } from "./WorkoutBody";

type Props = {
    workouts: Workout[];
    openWorkoutId: string | null;
    editingWorkoutId: string | null;
    onToggleWorkout: (workoutId: string) => void;
    onStartEditWorkout: (workoutId: string) => void;
    onCancelEditWorkout: () => void;
    onFinishEditWorkout: (workoutId: string, title: string) => void;
    onAddExercise: (workoutId: string) => void;
    onDeleteWorkout: (workoutId: string) => void;
    onDeleteExercise: (workoutId: string, exerciseId: string) => void;
    onExerciseNameChange: (
        workoutId: string,
        exerciseId: string,
        name: string
    ) => void;
    onExerciseFieldChange: (
        workoutId: string,
        exerciseId: string,
        field: "sets" | "reps" | "weight",
        value: number
    ) => void;
    onExerciseNotesChange: (
        workoutId: string,
        exerciseId: string,
        notes: string
    ) => void;
};

function getDateLabel(dateValue: string): string {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "no date";
    }

    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}



export function WorkoutsList({
    workouts,
    openWorkoutId,
    editingWorkoutId,
    onToggleWorkout,
    onStartEditWorkout,
    onCancelEditWorkout,
    onFinishEditWorkout,
    onAddExercise,
    onDeleteWorkout,
    onDeleteExercise,
    onExerciseNameChange,
    onExerciseFieldChange,
    onExerciseNotesChange,
}: Props) {
    return (
        <div className="space-y-4">
            {workouts.map((workout) => {
                const isOpen = openWorkoutId === workout.id;
                const isEditing = editingWorkoutId === workout.id;

                return (
                    <div
                        key={workout.id}
                        className={[
                            "rounded-xl border bg-white shadow-sm transition",
                            "border-zinc-200 hover:border-zinc-300 hover:shadow-md",
                            isOpen ? "ring-2 ring-blue-600/15" : "",
                        ].join(" ")}
                    >
                        <div className="p-5">
                            <WorkoutHeader
                                title={workout.title}
                                exerciseCount={workout.exercises.length}
                                dateLabel={getDateLabel(workout.date)}
                                isOpen={isOpen}
                                isEditing={isEditing}
                                onToggle={() => onToggleWorkout(workout.id)}
                                onStartEdit={() => onStartEditWorkout(workout.id)}
                                onCancelEdit={onCancelEditWorkout}
                                onFinishEdit={(title) => onFinishEditWorkout(workout.id, title)}
                                onAddExercise={() => onAddExercise(workout.id)}
                                onDeleteWorkout={() => onDeleteWorkout(workout.id)}
                            />
                        </div>

                        {isOpen && (
                            <div className="border-t border-zinc-200 p-5">
                                <WorkoutBody
                                    workout={workout}
                                    onDeleteExercise={(exerciseId) =>
                                        onDeleteExercise(workout.id, exerciseId)
                                    }
                                    onExerciseNameChange={(exerciseId, name) =>
                                        onExerciseNameChange(workout.id, exerciseId, name)
                                    }
                                    onExerciseFieldChange={(exerciseId, field, value) =>
                                        onExerciseFieldChange(workout.id, exerciseId, field, value)
                                    }
                                    onExerciseNotesChange={(exerciseId, notes) =>
                                        onExerciseNotesChange(workout.id, exerciseId, notes)
                                    }
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}