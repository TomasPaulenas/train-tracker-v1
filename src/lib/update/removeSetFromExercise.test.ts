import { describe, it, expect } from "vitest";
import { removeSetFromExercise } from "./removeSetFromExercise";
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
    ];
}

describe("removeSetFromExercise", () => {
    it("removes a set from the exercise", () => {
        const original = makeWorkouts();

        const result = removeSetFromExercise(original, "w1", "e1", 0);

        // returns a new array
        expect(result).not.toBe(original);

        // removes the set
        expect(result[0].exercises[0].sets).toHaveLength(1);
        expect(result[0].exercises[0].sets[0]).toEqual({
            reps: 10,
            weight: 70,
        });

        // original is not mutated
        expect(original[0].exercises[0].sets).toHaveLength(2);
    });
});
