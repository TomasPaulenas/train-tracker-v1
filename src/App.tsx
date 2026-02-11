import { useEffect, useState } from "react";
import type { Workout } from "./types/workout";
import { createWorkout } from "./lib/factories/createWorkout";
import { getWorkoutTotals } from "./lib/derived/workoutSelectors";
import {
  addWorkout,
  deleteWorkout,
  addExerciseToWorkout,
  removeExerciseFromWorkout,
  updateWorkoutDetails,
  updateExerciseName,
  updateExerciseField,
} from "./lib/workoutsModel";
import { WorkoutHeader } from "./components/WorkoutHeader";
import { WorkoutBody } from "./components/WorkoutBody";
import { WelcomeScreen } from "./components/WelcomeScreen";

const STARTED_KEY = "traintracker_started";
const WORKOUTS_KEY = "workouts";

function getDateLabel(dateValue: string) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "no date";
  }

  return date.toLocaleDateString("en-US", {
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
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startedFlag = localStorage.getItem(STARTED_KEY);
    setStarted(startedFlag === "1");

    const saved = localStorage.getItem(WORKOUTS_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Workout[];
        setWorkouts(parsed);
      } catch {
        setWorkouts([]);
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
  }, [workouts, hydrated]);

  function handleStart() {
    setStarted(true);
    localStorage.setItem(STARTED_KEY, "1");
  }

  function handleResetWelcome() {
    localStorage.removeItem(STARTED_KEY);
    setStarted(false);
  }

  function toggleWorkout(id: string) {
    setOpenWorkoutId((prev) => (prev === id ? null : id));
    setEditingWorkoutId(null);
  }

  function handleAddWorkout() {
    const newWorkout = createWorkout();
    setWorkouts((prev) => addWorkout(prev, newWorkout));
  }

  function handleDeleteWorkout(id: string) {
    setWorkouts((prev) => deleteWorkout(prev, id));
    setOpenWorkoutId((prev) => (prev === id ? null : prev));
    setEditingWorkoutId((prev) => (prev === id ? null : prev));
  }

  function handleAddExercise(workoutId: string) {
    setWorkouts((prev) => addExerciseToWorkout(prev, workoutId));
  }

  function handleDeleteExercise(workoutId: string, exerciseId: string) {
    setWorkouts((prev) =>
      removeExerciseFromWorkout(prev, workoutId, exerciseId)
    );
  }

  function handleFinishEdit(workoutId: string, title: string) {
    setWorkouts((prev) => updateWorkoutDetails(prev, workoutId, title));
    setEditingWorkoutId(null);
  }

  function handleExerciseNameChange(
    workoutId: string,
    exerciseId: string,
    name: string
  ) {
    setWorkouts((prev) =>
      updateExerciseName(prev, workoutId, exerciseId, name)
    );
  }

  function handleExerciseFieldChange(
    workoutId: string,
    exerciseId: string,
    field: "sets" | "reps" | "weight",
    value: number
  ) {
    setWorkouts((prev) =>
      updateExerciseField(prev, workoutId, exerciseId, field, value)
    );
  }

  if (!started) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (!hydrated) {
    return <div>Loading...</div>;
  }

  const { totalWorkouts, totalExercises } = getWorkoutTotals(workouts);


  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-3xl p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">TrainTracker</h1>

            <div className="flex gap-2">
              {import.meta.env.DEV && (
                <button
                  onClick={handleResetWelcome}
                  className="rounded-md border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-900"
                >
                  Reset
                </button>
              )}

              <button
                onClick={handleAddWorkout}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-200"
              >
                Add workout
              </button>
            </div>
          </div>

          <div className="mt-2 text-sm text-zinc-300">
            {totalWorkouts} sessions · {totalExercises} exercises
          </div>
        </div>

        <div className="space-y-4">
          {workouts.map((workout) => {
            const isOpen = openWorkoutId === workout.id;
            const isEditing = editingWorkoutId === workout.id;

            return (
              <div
                key={workout.id}
                className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"
              >
                <WorkoutHeader
                  title={workout.title}
                  exerciseCount={workout.exercises.length}
                  dateLabel={getDateLabel(workout.date)}
                  isOpen={isOpen}
                  isEditing={isEditing}
                  onToggle={() => toggleWorkout(workout.id)}
                  onStartEdit={() => setEditingWorkoutId(workout.id)}
                  onFinishEdit={(title) => handleFinishEdit(workout.id, title)}
                  onAddExercise={() => handleAddExercise(workout.id)}
                  onDeleteWorkout={() => handleDeleteWorkout(workout.id)}
                />

                {isOpen && (
                  <div className="mt-4 border-t border-zinc-800 pt-4">
                    <WorkoutBody
                      workout={workout}
                      onAddExercise={() => handleAddExercise(workout.id)}
                      onDeleteExercise={(exerciseId) =>
                        handleDeleteExercise(workout.id, exerciseId)
                      }
                      onExerciseNameChange={(exerciseId, name) =>
                        handleExerciseNameChange(workout.id, exerciseId, name)
                      }
                      onExerciseFieldChange={(exerciseId, field, value) =>
                        handleExerciseFieldChange(
                          workout.id,
                          exerciseId,
                          field,
                          value
                        )
                      }
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

}