import { describe, it, expect } from "vitest";
import type { Workout } from "../../types/workout";
import { updateExerciseName } from "./updateExerciseName";
import { createExercise } from "../factories/createExercise";

describe("updateExerciseName", () => {
    it("updates the name of the given exercise", () => {
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

        const result = updateExerciseName(
            workouts,
            "w1",
            ex1.id,
            "Front Squat"
        );

        expect(result[0].exercises).toHaveLength(2);
        expect(result[0].exercises[0].id).toBe(ex1.id);
        expect(result[0].exercises[0].name).toBe("Front Squat");

        // other exercise unchanged
        expect(result[0].exercises[1].name).toBe(ex2.name);

        // original not mutated
        expect(workouts[0].exercises[0].name).toBe("Squat");
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

        const result = updateExerciseName(
            workouts,
            "w1",
            "ex-999",
            "New name"
        );

        expect(result).toHaveLength(1);
        expect(result[0].exercises).toHaveLength(1);

        // name unchanged
        expect(result[0].exercises[0].name).toBe("Squat");
    });
});
