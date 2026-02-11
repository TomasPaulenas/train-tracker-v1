import { describe, it, expect } from "vitest";
import type { Workout } from "../../types/workout";
import { updateExerciseField } from "./updateExerciseField";
import { createExercise } from "../factories/createExercise";

describe("updateExerciseField", () => {
    it("updates the given field on the correct exercise", () => {
        const ex1 = createExercise({ name: "Squat" });
        const ex2 = createExercise({ name: "Bench" });

        const workouts: Workout[] = [
            {
                id: "w1",
                title: "Workout 1",
                notes: "",
                date: "2024-01-01",
                exercises: [ex1, ex2],
            },
        ];

        const result = updateExerciseField(workouts, "w1", ex2.id, "sets", 5);

        // updated exercise
        expect(result[0].exercises).toHaveLength(2);
        expect(result[0].exercises[1].id).toBe(ex2.id);
        expect((result[0].exercises[1] as any).sets).toBe(5);

        // other exercise unchanged
        expect(result[0].exercises[0].id).toBe(ex1.id);

        // original not mutated
        expect((workouts[0].exercises[1] as any).sets).not.toBe(5);
    });

    it("does nothing if exercise id does not exist", () => {
        const ex1 = createExercise({ name: "Squat" });

        const workouts: Workout[] = [
            {
                id: "w1",
                title: "Workout 1",
                notes: "",
                date: "2024-01-01",
                exercises: [ex1],
            },
        ];

        const result = updateExerciseField(workouts, "w1", "ex-999", "sets", 10);

        expect(result).toHaveLength(1);
        expect(result[0].exercises).toHaveLength(1);

        // original not mutated
        expect((workouts[0].exercises[0] as any).sets).not.toBe(10);
    });
});
