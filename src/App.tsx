import { useEffect, useState } from "react";
import type { Workout } from "./types/workout";
import { createWorkout } from "./lib/factories/createWorkout";
import {
  addWorkout,
  deleteWorkout,
  addEmptyExerciseToWorkout,
  updateExerciseName,
  updateExerciseSet,
} from "./lib/workoutsModel";
import { removeExerciseFromWorkout } from "./lib/update/removeExerciseFromWorkout";
import { updateWorkoutDetails } from "./lib/update/updateWorkout";
import { WorkoutHeader } from "./components/WorkoutHeader";
import { WorkoutBody } from "./components/WorkoutBody";

function getDateLabel(dateValue: string) {
  const d = new Date(dateValue);
  if (Number.isNaN(d.getTime())) return "no date";

  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [openWorkoutId, setOpenWorkoutId] = useState<string | null>(null);
  const [editingWorkoutId, setEditingWorkoutId] = useState<string | null>(null);

  // hydrate from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("workouts");
    if (!saved) {
      setHydrated(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as Workout[];
      setWorkouts(parsed);
    } catch {
      setWorkouts([]);
    }

    setHydrated(true);
  }, []);

  // persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts, hydrated]);

  // derived values
  const totalWorkouts = workouts.length;

  let totalExercises = 0;
  workouts.forEach((w) => {
    totalExercises += w.exercises.length;
  });

  // handlers
  function toggleWorkout(id: string) {
    setOpenWorkoutId((prev) => (prev === id ? null : id));
    setEditingWorkoutId(null);
  }

  function handleAddWorkout() {
    setWorkouts((prev) => addWorkout(prev, createWorkout()));
  }

  function handleDeleteWorkout(id: string) {
    setWorkouts((prev) => deleteWorkout(prev, id));

    // small UX: if the deleted workout was open/editing, clear it
    setOpenWorkoutId((prev) => (prev === id ? null : prev));
    setEditingWorkoutId((prev) => (prev === id ? null : prev));
  }

  function handleAddExercise(workoutId: string) {
    setWorkouts((prev) => addEmptyExerciseToWorkout(prev, workoutId));
  }

  function handleDeleteExercise(workoutId: string, exerciseId: string) {
    setWorkouts((prev) => removeExerciseFromWorkout(prev, workoutId, exerciseId));
  }

  function handleFinishEdit(workoutId: string, title: string) {
    setWorkouts((prev) => updateWorkoutDetails(prev, workoutId, title));
    setEditingWorkoutId(null);
  }

  function handleExerciseNameChange(workoutId: string, exerciseId: string, name: string) {
    setWorkouts((prev) => updateExerciseName(prev, workoutId, exerciseId, name));
  }

  function handleSetField(
    workoutId: string,
    exerciseId: string,
    field: "reps" | "weight",
    value: number
  ) {
    setWorkouts((prev) =>
      updateExerciseSet(prev, workoutId, exerciseId, 0, {
        [field]: value,
      })
    );
  }

  return (
    <div>
      <button onClick={handleAddWorkout}>Add workout</button>

      <div>{totalWorkouts} Training sessions</div>
      <div>{totalExercises} Total weekly exercises</div>

      {workouts.map((workout) => {
        const isOpen = openWorkoutId === workout.id;
        const isEditing = editingWorkoutId === workout.id;
        const dateLabel = getDateLabel(workout.date);

        return (
          <div key={workout.id}>
            <WorkoutHeader
              title={workout.title}
              exerciseCount={workout.exercises.length}
              dateLabel={dateLabel}
              isOpen={isOpen}
              isEditing={isEditing}
              onToggle={() => toggleWorkout(workout.id)}
              onStartEdit={() => setEditingWorkoutId(workout.id)}
              onFinishEdit={(title) => handleFinishEdit(workout.id, title)}
              onAddExercise={() => handleAddExercise(workout.id)}
              onDeleteWorkout={() => handleDeleteWorkout(workout.id)}
            />

            {isOpen && (
              <WorkoutBody
                workout={workout}
                onAddExercise={() => handleAddExercise(workout.id)}
                onDeleteExercise={(exerciseId) =>
                  handleDeleteExercise(workout.id, exerciseId)
                }
                onExerciseNameChange={(exerciseId, name) =>
                  handleExerciseNameChange(workout.id, exerciseId, name)
                }
                onSetField={(exerciseId, field, value) =>
                  handleSetField(workout.id, exerciseId, field, value)
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
