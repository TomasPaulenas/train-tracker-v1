import { describe, it, expect } from "vitest";
import { removeExerciseFromWorkout } from "./removeExerciseFromWorkout";
import type { Exercise, Workout } from "../../types/workout";

describe("removeExerciseFromWorkout", () => {
    it("removes the exercise with the given id from the workout", () => {
        const ex1: Exercise = {
            id: "ex-1",
            name: "Squat",
            sets: 3,
            reps: 8,
            weight: 100,
            notes: "",
        };

        const ex2: Exercise = {
            id: "ex-2",
            name: "Bench",
            sets: 3,
            reps: 10,
            weight: 80,
            notes: "",
        };

        const workouts: Workout[] = [
            {
                id: "1",
                title: "Workout 1",
                date: "2024-01-01",
                exercises: [ex1, ex2],
            },
            {
                id: "2",
                title: "Workout 2",
                date: "2024-01-02",
                exercises: [],
            },
        ];

        const result = removeExerciseFromWorkout(workouts, "1", ex1.id);

        expect(result).toHaveLength(2);
        expect(result[0].exercises).toHaveLength(1);
        expect(result[0].exercises[0].id).toBe(ex2.id);
        expect(workouts[0].exercises).toHaveLength(2);
    });

    it("does nothing if exercise id does not exist", () => {
        const ex1: Exercise = {
            id: "ex-1",
            name: "Squat",
            sets: 3,
            reps: 8,
            weight: 100,
            notes: "",
        };

        const workouts: Workout[] = [
            {
                id: "1",
                title: "Workout 1",
                date: "2024-01-01",
                exercises: [ex1],
            },
        ];

        const result = removeExerciseFromWorkout(workouts, "1", "ex-999");

        expect(result).toHaveLength(1);
        expect(result[0].exercises).toHaveLength(1);
        expect(workouts[0].exercises).toHaveLength(1);
    });
});