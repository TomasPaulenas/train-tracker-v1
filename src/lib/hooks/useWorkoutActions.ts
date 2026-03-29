import type { Dispatch, SetStateAction } from "react";
import type { Workout } from "../../types/workout";

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

import {
    addWorkout,
    deleteWorkout,
    updateWorkoutDetails,
    addExerciseToWorkout,
    removeExerciseFromWorkout,
    updateExerciseName,
    updateExerciseField,
    updateExerciseNotes,
} from "../workoutsModel";

type UseWorkoutActionsParams = {
    setWorkouts: Dispatch<SetStateAction<Workout[]>>;
    setOpenWorkoutId: Dispatch<SetStateAction<string | null>>;
    setEditingWorkoutId: Dispatch<SetStateAction<string | null>>;
};

export function useWorkoutActions({
    setWorkouts,
    setOpenWorkoutId,
    setEditingWorkoutId,
}: UseWorkoutActionsParams) {
    function toggleWorkout(id: string) {
        setOpenWorkoutId((prev) => (prev === id ? null : id));
        setEditingWorkoutId(null);
    }

    async function handleAddWorkout() {
        try {
            const newWorkout = await createWorkoutRequest();

            setWorkouts((prev) => addWorkout(prev, newWorkout));
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteWorkout(id: string) {
        try {
            await deleteWorkoutRequest(id);

            setWorkouts((prev) => deleteWorkout(prev, id));
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
                updateWorkoutDetails(prev, workoutId, updatedWorkout.title)
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
                addExerciseToWorkout(prev, workoutId, newExercise)
            );
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeleteExercise(workoutId: string, exerciseId: string) {
        try {
            await deleteExerciseRequest(exerciseId);

            setWorkouts((prev) =>
                removeExerciseFromWorkout(prev, workoutId, exerciseId)
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
            await updateExerciseRequest(exerciseId, { name });

            setWorkouts((prev) =>
                updateExerciseName(prev, workoutId, exerciseId, name)
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
            await updateExerciseRequest(exerciseId, { [field]: value });

            setWorkouts((prev) =>
                updateExerciseField(prev, workoutId, exerciseId, field, value)
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
            await updateExerciseRequest(exerciseId, { notes });

            setWorkouts((prev) =>
                updateExerciseNotes(prev, workoutId, exerciseId, notes)
            );
        } catch (error) {
            console.log(error);
        }
    }

    return {
        toggleWorkout,
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