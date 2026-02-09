import { describe, it, expect } from "vitest";
import { updateExerciseSet } from "./updateSetInExercise";
import type { Workout } from "../../types/workout";

function makeWorkouts(): Workout[] {
    return [
        {
            id: "w1",
            title: "W1",
            notes: "",
            date: "2026-02-09",
            exercises: [
                {
                    id: "e1",
                    name: "Bench",
                    sets: [
                        { reps: 8, weight: 80 },
                        { reps: 10, weight: 70 },
                    ],
                },
            ],
        },
        {
            id: "w2",
            title: "W2",
            notes: "",
            date: "2026-02-10",
            exercises: [],
        },
    ];
}

describe("updateExerciseSet", () => {
    it("updates reps/weight for one set", () => {
        const original = makeWorkouts();

        const result = updateExerciseSet(original, "w1", "e1", 1, { weight: 75 });

        // basic: returns a new array
        expect(result).not.toBe(original);

        // basic: the set was updated
        expect(result[0].exercises[0].sets[1].weight).toBe(75);

        // basic: other fields stay the same
        expect(result[0].exercises[0].sets[1].reps).toBe(10);

        // basic: original did not change
        expect(original[0].exercises[0].sets[1].weight).toBe(70);

        // basic: other workout did not change
        expect(result[1].id).toBe("w2");
        expect(result[1].exercises).toHaveLength(0);
    });
});
