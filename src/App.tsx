import { useState, useEffect } from "react";
import type { Workout } from "./types/workout";
import { createWorkout } from "./lib/factories/createWorkout";
import { addWorkout } from "./lib/update/workoutsModel";
import { createExercise } from "./lib/factories/createExercise";
import type { ExerciseDraft } from "./types/forms";
import { setDraftName, setDraftSetField } from "./lib/update/updateExerciseDraft";
import { Field } from "./components/Field";
import { addExerciseToWorkout, removeWorkout } from "./lib/update/workoutsModel";


export function App() {
  const [workouts, setWorkout] = useState<Workout[]>([]);
  const [newExerciseForm, setExerciseForm] = useState<ExerciseDraft>({
    name: "",
    sets: [{ reps: 0, weight: 0 }],
  });

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("workouts");
    if (!saved) { setHydrated(true); return };

    try {
      const parsed = JSON.parse(saved) as Workout[];
      setWorkout(parsed);
    } catch {
      setWorkout([]);

    }
    setHydrated(true);
  }, []);

  useEffect(() => {

    if (!hydrated) return;

    localStorage.setItem("workouts", JSON.stringify(workouts))



  }, [workouts, hydrated])


  const totalWorkouts = workouts.length;
  let totalExercises = 0;

  workouts.forEach((workout) => {

    totalExercises = totalExercises + workout.exercises.length

  })

  function handleWorkout() {
    const workout = createWorkout();
    setWorkout((prev) => addWorkout(prev, workout));
  }


  function handleDeleteWorkout(id: string) {

    setWorkout((prev) => removeWorkout(prev, id))
  }


  function handleExercise(workoutId: string) {
    const exercise = createExercise(newExerciseForm); // draft -> Exercise (with id)

    setWorkout((prev) => addExerciseToWorkout(prev, workoutId, exercise));

    // reset form (optional but recommended)
    setExerciseForm({
      name: "",
      sets: [{ reps: 0, weight: 0 }],
    });
  }

  return (
    <div>
      <button onClick={handleWorkout}  >add workout</button>

      <div>
        {totalWorkouts}
      </div>
      <div>
        {totalExercises}
      </div>

      {workouts.map((workout) => (
        <div key={workout.id}>
          {workout.title}
          {new Date(workout.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })}
          <button onClick={() => handleExercise(workout.id)}>Add exercise</button>

          <button onClick={() => handleDeleteWorkout(workout.id)}>delete workout</button>
          <div>
            <Field
              type="text"
              value={newExerciseForm.name}
              onChange={(value) =>
                setExerciseForm((prev) => setDraftName(prev, value))
              }

            />

            <Field
              type="number"
              value={newExerciseForm.sets[0].reps}
              onChange={(value) =>
                setExerciseForm((prev) => setDraftSetField(prev, 0, "reps", Number(value)))
              }

            />

            <Field
              type="number"
              value={newExerciseForm.sets[0].weight}
              onChange={(value) =>
                setExerciseForm((prev) => setDraftSetField(prev, 0, "weight", Number(value)))
              }

            />

          </div>
        </div>
      ))}
    </div>
  );
}
