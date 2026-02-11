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
};

export function WorkoutBody({
    workout,
    onDeleteExercise,
    onExerciseNameChange,
    onExerciseFieldChange,
}: Props) {
    return (
        <div className="space-y-3">
            {workout.exercises.map((exercise) => {
                function handleNameChange(value: string) {
                    onExerciseNameChange(exercise.id, value);
                }

                function handleSetsChange(value: string) {
                    onExerciseFieldChange(exercise.id, "sets", Number(value));
                }

                function handleWeightChange(value: string) {
                    onExerciseFieldChange(exercise.id, "weight", Number(value));
                }

                function handleRepsChange(value: string) {
                    onExerciseFieldChange(exercise.id, "reps", Number(value));
                }

                function handleDelete() {
                    onDeleteExercise(exercise.id);
                }

                return (
                    <div
                        key={exercise.id}
                        className="grid grid-cols-12 gap-3 items-end"
                    >
                        <div className="col-span-5">
                            <div className="mb-1 text-sm text-zinc-300">Exercise</div>
                            <div className="w-full">
                                <Field
                                    type="text"
                                    value={exercise.name}
                                    onChange={handleNameChange}
                                />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <div className="mb-1 text-sm text-zinc-300">Sets</div>
                            <div className="w-full">
                                <Field
                                    type="number"
                                    min={0}
                                    value={exercise.sets}
                                    onChange={handleSetsChange}
                                />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <div className="mb-1 text-sm text-zinc-300">Weight</div>
                            <div className="w-full">
                                <Field
                                    type="number"
                                    min={0}
                                    value={exercise.weight === 0 ? "" : exercise.weight}
                                    onChange={handleWeightChange}
                                />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <div className="mb-1 text-sm text-zinc-300">Reps</div>
                            <div className="w-full">
                                <Field
                                    type="number"
                                    min={0}
                                    value={exercise.reps === 0 ? "" : exercise.reps}
                                    onChange={handleRepsChange}
                                />
                            </div>
                        </div>

                        <div className="col-span-1 relative">
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="h-10 w-full rounded-md border border-zinc-700 text-sm hover:bg-zinc-800 relative z-20"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                );
            })}
        </div>
    );
}
