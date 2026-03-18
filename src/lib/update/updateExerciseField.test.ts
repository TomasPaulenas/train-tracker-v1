import { describe, it, expect } from "vitest";
import type { Exercise, Workout } from "../../types/workout";
import { updateExerciseField } from "./updateExerciseField";

describe("updateExerciseField", () => {
    it("updates the given field on the correct exercise", () => {
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
                id: "w1",
                title: "Workout 1",
                date: "2024-01-01",
                exercises: [ex1, ex2],
            },
        ];

        const result = updateExerciseField(workouts, "w1", ex2.id, "sets", 5);

        expect(result[0].exercises).toHaveLength(2);
        expect(result[0].exercises[1].id).toBe(ex2.id);
        expect(result[0].exercises[1].sets).toBe(5);

        expect(result[0].exercises[0].id).toBe(ex1.id);
        expect(workouts[0].exercises[1].sets).toBe(3);
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
                id: "w1",
                title: "Workout 1",
                date: "2024-01-01",
                exercises: [ex1],
            },
        ];

        const result = updateExerciseField(workouts, "w1", "ex-999", "sets", 10);

        expect(result).toHaveLength(1);
        expect(result[0].exercises).toHaveLength(1);
        expect(result[0].exercises[0].sets).toBe(3);
    });
});