import { useState } from "react";
import type { Workout, Exercise } from "./types/workout";

export function App() {
  const [workouts, setWorkout] = useState<Workout[]>([]);
  const [newExerciseForm, setExerciseForm] = useState({
    id: "",
    name: "",
    reps: 0,
    weight: 0,
  })

  function createworkout() {

    const newWorkout = {
      id: Math.random().toString(),
      title: "New Workout",
      date: new Date().toISOString().slice(0, 10),
      exercises: []
    }




    setWorkout([...workouts, newWorkout])

  };

  function deleteWorkout(id: string) {


    const updated = workouts.filter((w) => w.id !== id);
    setWorkout(updated);
  };

  function deleteExercise(workoutid: string, exercisesid: string) {
    const updated = workouts.map((workout) => {
      if (workout.id === workoutid) {
        return {
          ...workout,
          exercises: workout.exercises.filter(
            (exercise) => exercise.id !== exercisesid
          ),
        };
      }

      return workout;
    });

    setWorkout(updated);
  }


  function addExercise(id: string, exerciseData: Exercise) {
    const updated = workouts.map((currentWorkout) => {
      // si NO es el workout al que quiero agregar el ejercicio, lo dejo igual
      if (currentWorkout.id !== id) {
        return currentWorkout;
      }

      // si SÍ es el workout, devuelvo una copia con exercises actualizado
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



  return (
    <div>
      <button onClick={createworkout}>add workout</button>

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
