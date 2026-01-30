import { useState, useEffect } from "react";
import type { Workout, Exercise } from "./types/workout";
import { createworkout } from "./helpers/createWorkout";
import { deleteWorkout } from "./helpers/deleteWorkout";


export function App() {
  const [workouts, setWorkout] = useState<Workout[]>([]);
  const [newExerciseForm, setExerciseForm] = useState({
    id: "",
    name: "",
    sets: [{ reps: 0, weight: 0 }],
  })
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




  function addExercise(id: string, exerciseData: Exercise) {
    const updated = workouts.map((currentWorkout) => {

      if (currentWorkout.id !== id) {
        return currentWorkout;
      }

      return {
        ...currentWorkout,
        exercises: [...currentWorkout.exercises, exerciseData],
      };
    });

    setWorkout(updated);
  }


  const totalWorkouts = workouts.length;
  let totalExercises = 0;

  workouts.forEach((workout) => {

    totalExercises = totalExercises + workout.exercises.length

  })

  function handleWorkout() {


    setWorkout(createworkout(workouts))

  }

  function handleDeleteWorkout(id: string) {

    setWorkout(prev => deleteWorkout(prev, id))
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
          <button onClick={() => addExercise(workout.id, newExerciseForm)}>Add exercise</button>
          <button onClick={() => handleDeleteWorkout(workout.id)}>delete workout</button>
          <div>
            <input
              type="text"
              value={newExerciseForm.name}
              onChange={(e) =>
                setExerciseForm({
                  ...newExerciseForm,
                  name: e.target.value,
                })
              }
            />

            <input
              type="number"
              value={newExerciseForm.sets[0].reps}
              onChange={(e) =>
                setExerciseForm({
                  ...newExerciseForm, sets: [{
                    ...newExerciseForm.sets[0], reps: Number(e.target.value),
                  }]
                })
              }
            />

            <input
              type="number"
              value={newExerciseForm.sets[0].weight}
              onChange={(e) =>
                setExerciseForm({
                  ...newExerciseForm,
                  sets: [{ ...newExerciseForm.sets[0], weight: Number(e.target.value), }]
                })
              }
            />

          </div>
        </div>
      ))}
    </div>
  );
}
