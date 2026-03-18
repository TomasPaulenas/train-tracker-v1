import { useEffect, useState } from "react";
import type { Workout, Exercise } from "../../types/workout";


const API_URL = `${import.meta.env.VITE_API_URL}/api/workouts`;
const AUTH_KEY = "traintracker-auth";

function normalizeWorkouts(data: any[]): Workout[] {
    return data.map((workout: any) => ({
        id: String(workout.id),
        title: workout.title,
        date: workout.createdAt,
        createdAt: workout.createdAt,
        exercises: Array.isArray(workout.exercises)
            ? workout.exercises
                .map((exercise: any) => ({
                    id: String(exercise.id),
                    name: exercise.name,
                    sets: exercise.sets ?? 0,
                    reps: exercise.reps ?? 0,
                    weight: exercise.weight ?? 0,
                    notes: exercise.notes ?? "",
                }))
                .sort((a: Exercise, b: Exercise) => Number(a.id) - Number(b.id))
            : [],
    }));
}

export function useApiWorkouts(isAuthenticated: boolean) {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setWorkouts([]);
            setHydrated(true);
            return;
        }

        async function fetchWorkouts() {
            try {
                const token = localStorage.getItem(AUTH_KEY);

                const response = await fetch(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch workouts");
                }

                const data = await response.json();
                setWorkouts(normalizeWorkouts(data));
            } catch (error) {
                console.log(error);
                setWorkouts([]);
            } finally {
                setHydrated(true);
            }
        }

        fetchWorkouts();
    }, [isAuthenticated]);

    return { workouts, setWorkouts, hydrated };
}