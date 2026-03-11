import { getAuthToken } from "./auth";

const EXERCISES_BASE_URL = `${import.meta.env.VITE_API_URL}/api/exercises`;

type ExerciseUpdateData = {
    name?: string;
    notes?: string;
    sets?: number;
    reps?: number;
    weight?: number;
};

export async function createExerciseRequest(workoutId: string) {
    const token = getAuthToken();

    const response = await fetch(EXERCISES_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: "New exercise",
            notes: "",
            workoutId: Number(workoutId),
            sets: 0,
            reps: 0,
            weight: 0,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create exercise");
    }

    const exercise = await response.json();

    return {
        id: String(exercise.id),
        name: exercise.name,
        sets: exercise.sets ?? 0,
        reps: exercise.reps ?? 0,
        weight: exercise.weight ?? 0,
        notes: exercise.notes ?? "",
    };
}

export async function updateExerciseRequest(
    exerciseId: string,
    data: ExerciseUpdateData
) {
    const token = getAuthToken();

    const response = await fetch(`${EXERCISES_BASE_URL}/${exerciseId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update exercise");
    }

    return response.json();
}

export async function deleteExerciseRequest(exerciseId: string) {
    const token = getAuthToken();

    const response = await fetch(`${EXERCISES_BASE_URL}/${exerciseId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete exercise");
    }
}