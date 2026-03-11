import { useState } from "react";
import { useApiWorkouts } from "./lib/hooks/useApiWorkouts";
import { useWelcomeFlow } from "./lib/hooks/useWelcomeFlow";
import { useWorkoutActions } from "./lib/hooks/useWorkoutActions";
import { hasAuthToken } from "./lib/api/auth";
import { getWorkoutTotals } from "./lib/derived/workoutSelectors";
import { getDateLabel } from "./lib/format/getDateLabel";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { StartTransitionScreen } from "./components/StartTransitionScreen";
import { AuthScreen } from "./components/AuthScreen";
import { WorkoutsList } from "./components/WorkoutsList";

export function App() {
  const {
    started,
    leavingWelcome,
    showTransition,
    transitionReady,
    start,
    reset,
  } = useWelcomeFlow();

  const [openWorkoutId, setOpenWorkoutId] = useState<string | null>(null);
  const [editingWorkoutId, setEditingWorkoutId] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isAuthenticated, setIsAuthenticated] = useState(() => hasAuthToken());

  const { workouts, setWorkouts, hydrated } = useApiWorkouts(isAuthenticated);

  const {
    toggleWorkout,
    handleAuthSubmit,
    handleDemoLogin,
    handleLogout,
    handleAddWorkout,
    handleDeleteWorkout,
    handleFinishEdit,
    handleAddExercise,
    handleDeleteExercise,
    handleExerciseNameChange,
    handleExerciseFieldChange,
    handleExerciseNotesChange,
  } = useWorkoutActions({
    authMode,
    setAuthMode,
    setIsAuthenticated,
    setWorkouts,
    setOpenWorkoutId,
    setEditingWorkoutId,
  });

  if (!started) {
    if (showTransition) {
      return <StartTransitionScreen ready={transitionReady} />;
    }

    return <WelcomeScreen onStart={start} leaving={leavingWelcome} />;
  }

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-white text-zinc-900 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AuthScreen
        mode={authMode}
        onModeChange={setAuthMode}
        onSubmit={handleAuthSubmit}
        onDemoLogin={handleDemoLogin}
      />
    );
  }

  const { totalWorkouts, totalExercises } = getWorkoutTotals(workouts);

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div
          className={[
            "absolute inset-0 opacity-70",
            "bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.18)_1px,transparent_1px)]",
            "bg-[size:22px_22px]",
          ].join(" ")}
        />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_100%_0%,rgba(59,130,246,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_520px_at_0%_100%,rgba(251,191,36,0.16),transparent_60%)]" />
      </div>

      <div className="pointer-events-none fixed bottom-0 right-0 z-0">
        <img
          src="/tracker-img.png"
          alt=""
          aria-hidden
          className={[
            "w-[600px] max-w-none",
            "sm:w-[720px]",
            "lg:w-[820px]",
            "opacity-100",
            "translate-x-16 translate-y-16",
            "select-none",
          ].join(" ")}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-3xl font-extrabold tracking-tight">
                TrainTracker
              </h1>
              <div className="mt-2 text-sm text-zinc-600">
                {totalWorkouts} sessions · {totalExercises} exercises
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={handleLogout}
                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                Logout
              </button>

              {import.meta.env.DEV && (
                <button
                  onClick={reset}
                  className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
                >
                  Reset
                </button>
              )}

              <button
                onClick={handleAddWorkout}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Add workout
              </button>
            </div>
          </div>
        </div>

        <WorkoutsList
          workouts={workouts}
          openWorkoutId={openWorkoutId}
          editingWorkoutId={editingWorkoutId}
          getDateLabel={getDateLabel}
          onToggleWorkout={toggleWorkout}
          onStartEditWorkout={setEditingWorkoutId}
          onFinishEditWorkout={handleFinishEdit}
          onAddExercise={handleAddExercise}
          onDeleteWorkout={handleDeleteWorkout}
          onDeleteExercise={handleDeleteExercise}
          onExerciseNameChange={handleExerciseNameChange}
          onExerciseFieldChange={handleExerciseFieldChange}
          onExerciseNotesChange={handleExerciseNotesChange}
        />
      </div>
    </div>
  );
}