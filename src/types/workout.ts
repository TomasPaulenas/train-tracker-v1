/**
 * Workout
 * -------
 * Represents a training session.
 * It corresponds to a specific day when the user trained.
 * It is created when a workout session is started or logged.
 * A workout can exist even if no exercises have been added yet.
 * It is used to list training sessions and later view their details.
 * This version (v1) does not include statistics or calculations.
 */



export type Workout = {
    id: string;
    date: string;
    title: string;
    exercises: string[];
    notes?: string;
    createdAt?: string;
};