/**
 * Workout
 * -------
 * Represents a training session.
 * This version (v1) stores aggregated exercise data (sets/reps/weight).
 */

export type Workout = {
    id: string;
    date: string;
    title: string;
    exercises: Exercise[];
    createdAt?: string;
};

export type Exercise = {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
    notes?: string;
};
