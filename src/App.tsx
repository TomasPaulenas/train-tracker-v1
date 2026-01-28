import { useState, useEffect } from "react";
import type { Workout, Exercise } from "./types/workout";
import { createworkout } from "./helpers/createWorkout";


export function App() {
  const [workouts, setWorkout] = useState<Workout[]>([]);
  const [newExerciseForm, setExerciseForm] = useState({
    id: "",
    name: "",
    reps: 0,
    weight: 0,
  })
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("workouts");
    if (!saved) { setHydrated(true); return };

    try {
      const parsed = JSON.parse(saved) as Workout[];
      setWorkout(parsed);
    } catch {
      // si está corrupto, no crashear
      setWorkout([]);

    }
    setHydrated(true);
  }, []);

  useEffect(() => {

    if (!hydrated) return;

    localStorage.setItem("workouts", JSON.stringify(workouts))



  }, [workouts, hydrated])

  function deleteWorkout(id: string) {


    const updated = workouts.filter((w) => w.id !== id);
    setWorkout(updated);
  };

  // function deleteExercise(workoutid: string, exercisesid: string) {
  //   const updated = workouts.map((workout) => {
  //     if (workout.id === workoutid) {
  //       return {
  //         ...workout,
  //         exercises: workout.exercises.filter(
  //           (exercise) => exercise.id !== exercisesid
  //         ),
  //       };
  //     }

  //     return workout;
  //   });

  //   setWorkout(updated);
  // }


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
          <button onClick={() => deleteWorkout(workout.id)}>delete workout</button>
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
              value={newExerciseForm.reps}
              onChange={(e) =>
                setExerciseForm({
                  ...newExerciseForm,
                  reps: Number(e.target.value),
                })
              }
            />

            <input
              type="number"
              value={newExerciseForm.weight}
              onChange={(e) =>
                setExerciseForm({
                  ...newExerciseForm,
                  weight: Number(e.target.value),
                })
              }
            />

          </div>
        </div>
      ))}
    </div>
  );
}
