import { useState } from "react";
import type { Workout } from "./types/workout";

export function App() {
  const [workouts, setWorkout] = useState<Workout[]>([]);

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




  return (
    <div>
      <button onClick={createworkout}>add workout</button>

      {workouts.map((workout) => (
        <div key={workout.id}>
          {workout.title}
          {new Date(workout.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })}
          <button onClick={() => deleteWorkout(workout.id)}>delete workout</button>
        </div>
      ))}
    </div>
  );
}
