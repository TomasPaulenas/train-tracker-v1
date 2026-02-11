// src/lib/hooks/usePersistedWorkouts.ts
import { useEffect, useState } from "react";
import type { Workout } from "../../types/workout";

const WORKOUTS_KEY = "workouts";

export function usePersistedWorkouts() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [hydrated, setHydrated] = useState(false);

    // hydrate from localStorage
    useEffect(() => {
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

    // persist to localStorage
    useEffect(() => {
        if (!hydrated) return;
        localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
    }, [workouts, hydrated]);

    return { workouts, setWorkouts, hydrated };
}
