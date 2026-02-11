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
    notes?: string;
    createdAt?: string;
};

export type Exercise = {
    id: string;
    name: string;

    // v1: aggregated fields
    sets: number;
    reps: number;
    weight: number;
};
