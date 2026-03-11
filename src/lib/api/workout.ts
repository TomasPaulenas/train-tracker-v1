import type { Workout } from "../../types/workout";
import { getAuthToken } from "./auth";
const WORKOUTS_BASE_URL = `${import.meta.env.VITE_API_URL}/api/workouts`;

type WorkoutApiResponse = {
    id: number;
    title: string;
    createdAt: string;
};

function normalizeWorkout(workout: WorkoutApiResponse): Workout {
    return {
        id: String(workout.id),
        title: workout.title,
        date: workout.createdAt,
        createdAt: workout.createdAt,
        exercises: [],
    };
}

export async function createWorkoutRequest() {
    const token = getAuthToken();

    const response = await fetch(WORKOUTS_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            title: "New workout",
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create workout");
    }

    const workout = await response.json();
    return normalizeWorkout(workout);
}

export async function updateWorkoutRequest(workoutId: string, title: string) {
    const token = getAuthToken();

    const response = await fetch(`${WORKOUTS_BASE_URL}/${workoutId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
    });

    if (!response.ok) {
        throw new Error("Failed to update workout");
    }

    return response.json();
}

export async function deleteWorkoutRequest(workoutId: string) {
    const token = getAuthToken();

    const response = await fetch(`${WORKOUTS_BASE_URL}/${workoutId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete workout");
    }
}