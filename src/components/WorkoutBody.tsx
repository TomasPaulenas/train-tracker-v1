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


            {workout.exercises.map((ex) => (
                <div key={ex.id} style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
                    <div>
                        <div>Exercise</div>
                        <Field
                            type="text"
                            value={ex.name}
                            onChange={(v) => onExerciseNameChange(ex.id, String(v))}
                        />
                    </div>

                    <div>
                        <div>Weight</div>
                        <Field
                            type="number"
                            min={0}
                            value={ex.sets[0].weight === 0 ? "" : ex.sets[0].weight}
                            onChange={(v) => onSetField(ex.id, "weight", Number(v))}
                        />
                    </div>

                    <div>
                        <div>Reps</div>
                        <Field
                            type="number"
                            min={0}
                            value={ex.sets[0].reps === 0 ? "" : ex.sets[0].reps}
                            onChange={(v) => onSetField(ex.id, "reps", Number(v))}
                        />
                    </div>

                    <div>
                        <div>Sets</div>
                        <Field
                            type="number"
                            min={1}
                            value={ex.sets.length}
                            onChange={() => { }}
                        />
                    </div>

                    <button onClick={() => onDeleteExercise(ex.id)}>delete</button>
                </div>
            ))}
        </div>
    );
}
