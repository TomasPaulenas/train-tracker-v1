import type { Workout } from "../types/workout";
import { Field } from "./Field";

type Props = {
    workout: Workout;
    onAddExercise: () => void;
    onDeleteExercise: (exerciseId: string) => void;
    onExerciseNameChange: (exerciseId: string, name: string) => void;
    onSetField: (
        exerciseId: string,
        field: "reps" | "weight",
        value: number
    ) => void;
};

export function WorkoutBody({
    workout,
    onDeleteExercise,
    onExerciseNameChange,
    onSetField,
}: Props) {
    return (
        <div>
            {workout.exercises.map(exercise => {
                const firstSet = exercise.sets[0];

                return (
                    <div
                        key={exercise.id}
                        style={{ display: "flex", gap: 12, alignItems: "flex-end" }}
                    >
                        <div>
                            <div>Exercise</div>
                            <Field
                                type="text"
                                value={exercise.name}
                                onChange={(value) => onExerciseNameChange(exercise.id, value)}
                            />
                        </div>

                        <div>
                            <div>Weight</div>
                            <Field
                                type="number"
                                min={0}
                                value={firstSet.weight === 0 ? "" : firstSet.weight}
                                onChange={(value) =>
                                    onSetField(exercise.id, "weight", Number(value))
                                }
                            />
                        </div>

                        <div>
                            <div>Reps</div>
                            <Field
                                type="number"
                                min={0}
                                value={firstSet.reps === 0 ? "" : firstSet.reps}
                                onChange={(value) =>
                                    onSetField(exercise.id, "reps", Number(value))
                                }
                            />
                        </div>

                        <button type="button" onClick={() => onDeleteExercise(exercise.id)}>
                            delete
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
