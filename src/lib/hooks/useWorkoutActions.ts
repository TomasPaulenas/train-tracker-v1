import type { Dispatch, SetStateAction } from "react";
import type { Workout } from "../../types/workout";
import {
    clearAuthToken,
    loginDemoUser,
    loginUser,
    registerUser,
    saveAuthToken,
} from "../api/auth";
import {
    createWorkoutRequest,
    deleteWorkoutRequest,
    updateWorkoutRequest,
} from "../api/workout";
import {
    createExerciseRequest,
    deleteExerciseRequest,
    updateExerciseRequest,
} from "../api/exercise";

type AuthMode = "login" | "register";

type Params = {
    authMode: AuthMode;
    setAuthMode: Dispatch<SetStateAction<AuthMode>>;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
    setWorkouts: Dispatch<SetStateAction<Workout[]>>;
    setOpenWorkoutId: Dispatch<SetStateAction<string | null>>;
    setEditingWorkoutId: Dispatch<SetStateAction<string | null>>;
};

export function useWorkoutActions({
    authMode,
    setAuthMode,
    setIsAuthenticated,
    setWorkouts,
    setOpenWorkoutId,
    setEditingWorkoutId,
}: Params) {
    function toggleWorkout(id: string) {
        setOpenWorkoutId((prev) => (prev === id ? null : id));
        setEditingWorkoutId(null);
    }

    async function handleAuthSubmit(data: { email: string; password: string }) {
        try {
            if (authMode === "login") {
                const result = await loginUser(data);
                saveAuthToken(result.token);
                setIsAuthenticated(true);
                return;
            }

            await registerUser(data);
            setAuthMode("login");
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async function handleDemoLogin() {
        try {
            const result = await loginDemoUser();
            saveAuthToken(result.token);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    function handleLogout() {
        clearAuthToken();
        setIsAuthenticated(false);
    }

    async function handleAddWorkout() {
        try {
            const newWorkout = await createWorkoutRequest();
            setWorkouts((prev) => [newWorkout, ...prev]);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteWorkout(id: string) {
        try {
            await deleteWorkoutRequest(id);

            setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
            setOpenWorkoutId((prev) => (prev === id ? null : prev));
            setEditingWorkoutId((prev) => (prev === id ? null : prev));
        } catch (error) {
            console.log(error);
        }
    }

    async function handleFinishEdit(workoutId: string, title: string) {
        try {
            const updatedWorkout = await updateWorkoutRequest(workoutId, title);

            setWorkouts((prev) =>
                prev.map((workout) => {
                    if (workout.id !== workoutId) {
                        return workout;
                    }

                    return {
                        ...workout,
                        title: updatedWorkout.title,
                    };
                })
            );

            setEditingWorkoutId(null);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleAddExercise(workoutId: string) {
        try {
            const newExercise = await createExerciseRequest(workoutId);

            setWorkouts((prev) =>
                prev.map((workout) => {
                    if (workout.id !== workoutId) {
                        return workout;
                    }

                    return {
                        ...workout,
                        exercises: [...workout.exercises, newExercise],
                    };
                })
            );
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteExercise(workoutId: string, exerciseId: string) {
        try {
            await deleteExerciseRequest(exerciseId);

            setWorkouts((prev) =>
                prev.map((workout) => {
                    if (workout.id !== workoutId) {
                        return workout;
                    }

                    return {
                        ...workout,
                        exercises: workout.exercises.filter(
                            (exercise) => exercise.id !== exerciseId
                        ),
                    };
                })
            );
        } catch (error) {
            console.log(error);
        }
    }

    async function handleExerciseNameChange(
        workoutId: string,
        exerciseId: string,
        name: string
    ) {
        try {
            const updatedExercise = await updateExerciseRequest(exerciseId, { name });

            setWorkouts((prev) =>
                prev.map((workout) => {
                    if (workout.id !== workoutId) {
                        return workout;
                    }

                    return {
                        ...workout,
                        exercises: workout.exercises.map((exercise) => {
                            if (exercise.id !== exerciseId) {
                                return exercise;
                            }

                            return {
                                ...exercise,
                                ...updatedExercise,
                            };
                        }),
                    };
                })
            );
        } catch (error) {
            console.log(error);
        }
    }

    async function handleExerciseFieldChange(
        workoutId: string,
        exerciseId: string,
        field: "sets" | "reps" | "weight",
        value: number
    ) {
        try {
            const updatedExercise = await updateExerciseRequest(exerciseId, {
                [field]: value,
            });

            setWorkouts((prev) =>
                prev.map((workout) => {
                    if (workout.id !== workoutId) {
                        return workout;
                    }

                    return {
                        ...workout,
                        exercises: workout.exercises.map((exercise) => {
                            if (exercise.id !== exerciseId) {
                                return exercise;
                            }

                            return {
                                ...exercise,
                                ...updatedExercise,
                            };
                        }),
                    };
                })
            );
        } catch (error) {
            console.log(error);
        }
    }

    async function handleExerciseNotesChange(
        workoutId: string,
        exerciseId: string,
        notes: string
    ) {
        try {
            const updatedExercise = await updateExerciseRequest(exerciseId, { notes });

            setWorkouts((prev) =>
                prev.map((workout) => {
                    if (workout.id !== workoutId) {
                        return workout;
                    }

                    return {
                        ...workout,
                        exercises: workout.exercises.map((exercise) => {
                            if (exercise.id !== exerciseId) {
                                return exercise;
                            }

                            return {
                                ...exercise,
                                ...updatedExercise,
                            };
                        }),
                    };
                })
            );
        } catch (error) {
            console.log(error);
        }
    }

    return {
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
    };
}