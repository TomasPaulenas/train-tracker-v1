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
        <div className="space-y-5">
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
                        className="rounded-lg border border-zinc-200 bg-white p-4"
                    >
                        <div className="grid grid-cols-12 gap-3 items-end">
                            <div className="col-span-12 md:col-span-5">
                                <div className="mb-1 text-sm font-medium text-zinc-700">
                                    Exercise
                                </div>
                                <Field
                                    type="text"
                                    value={exercise.name}
                                    onChange={handleNameChange}
                                    placeholder="e.g. Bench press"
                                    className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-4 md:col-span-2">
                                <div className="mb-1 text-sm font-medium text-zinc-700">
                                    Sets
                                </div>
                                <Field
                                    type="number"
                                    min={0}
                                    value={exercise.sets}
                                    onChange={handleSetsChange}
                                    className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-4 md:col-span-2">
                                <div className="mb-1 text-sm font-medium text-zinc-700">
                                    Weight
                                </div>
                                <Field
                                    type="number"
                                    min={0}
                                    value={exercise.weight === 0 ? "" : exercise.weight}
                                    onChange={handleWeightChange}
                                    className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-4 md:col-span-2">
                                <div className="mb-1 text-sm font-medium text-zinc-700">
                                    Reps
                                </div>
                                <Field
                                    type="number"
                                    min={0}
                                    value={exercise.reps === 0 ? "" : exercise.reps}
                                    onChange={handleRepsChange}
                                    className="h-10 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-4 md:col-span-1">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="h-10 w-full rounded-md border border-zinc-300 bg-white text-sm font-medium text-zinc-900 hover:bg-zinc-50 whitespace-nowrap"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
