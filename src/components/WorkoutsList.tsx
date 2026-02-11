// src/components/WorkoutsList.tsx
import type { Workout } from "../types/workout";
import { WorkoutHeader } from "./WorkoutHeader";
import { WorkoutBody } from "./WorkoutBody";

type Props = {
    workouts: Workout[];
    openWorkoutId: string | null;
    editingWorkoutId: string | null;
    getDateLabel: (dateValue: string) => string;

    onToggleWorkout: (workoutId: string) => void;
    onStartEditWorkout: (workoutId: string) => void;
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
};

export function WorkoutsList({
    workouts,
    openWorkoutId,
    editingWorkoutId,
    getDateLabel,
    onToggleWorkout,
    onStartEditWorkout,
    onFinishEditWorkout,
    onAddExercise,
    onDeleteWorkout,
    onDeleteExercise,
    onExerciseNameChange,
    onExerciseFieldChange,
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
                                onFinishEdit={(title) => onFinishEditWorkout(workout.id, title)}
                                onAddExercise={() => onAddExercise(workout.id)}
                                onDeleteWorkout={() => onDeleteWorkout(workout.id)}
                            />
                        </div>

                        {isOpen && (
                            <div className="border-t border-zinc-200 p-5">
                                <WorkoutBody
                                    workout={workout}
                                    onAddExercise={() => onAddExercise(workout.id)}
                                    onDeleteExercise={(exerciseId) =>
                                        onDeleteExercise(workout.id, exerciseId)
                                    }
                                    onExerciseNameChange={(exerciseId, name) =>
                                        onExerciseNameChange(workout.id, exerciseId, name)
                                    }
                                    onExerciseFieldChange={(exerciseId, field, value) =>
                                        onExerciseFieldChange(workout.id, exerciseId, field, value)
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
