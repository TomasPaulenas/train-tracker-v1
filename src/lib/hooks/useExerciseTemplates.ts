import { useEffect, useState } from "react";
import type { ExerciseTemplate } from "../../types/exerciseTemplate";

const API_URL = `${import.meta.env.VITE_API_URL}/api/exercise-templates`;
const AUTH_KEY = "traintracker-auth";

export function useApiTemplates(isAuthenticated: boolean) {
    const [templates, setTemplates] = useState<ExerciseTemplate[]>([]);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(false);

        if (!isAuthenticated) {
            setTemplates([]);
            setHydrated(true);
            return;
        }

        async function fetchTemplates() {
            try {
                const token = localStorage.getItem(AUTH_KEY);

                if (!token) {
                    setTemplates([]);
                    return;
                }

                const response = await fetch(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch templates");
                }

                const data = await response.json();
                setTemplates(data);
            } catch (error) {
                console.log(error);
                setTemplates([]);
            } finally {
                setHydrated(true);
            }
        }

        fetchTemplates();
    }, [isAuthenticated]);

    return { templates, setTemplates, hydrated };
}