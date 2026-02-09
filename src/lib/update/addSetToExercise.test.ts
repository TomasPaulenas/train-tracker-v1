import { describe, it, expect } from "vitest";
import { addSetToExercise } from "./addSetToExercise";
import type { Workout, Set } from "../../types/workout";

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
                    sets: [{ reps: 8, weight: 80 }],
                },
            ],
        },
    ];
}

describe("addSetToExercise", () => {
    it("adds a new set to the exercise", () => {
        const original = makeWorkouts();

        const newSet: Set = { reps: 10, weight: 70 };

        const result = addSetToExercise(original, "w1", "e1", newSet);

        // returns a new array
        expect(result).not.toBe(original);

        // adds the new set
        expect(result[0].exercises[0].sets).toHaveLength(2);
        expect(result[0].exercises[0].sets[1]).toEqual(newSet);

        // original is not mutated
        expect(original[0].exercises[0].sets).toHaveLength(1);
    });
});
