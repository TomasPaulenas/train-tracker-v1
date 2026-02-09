import { describe, it, expect } from "vitest";
import { removeExerciseFromWorkout } from "./removeExerciseFromWorkout";
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
                    sets: [{ reps: 8, weight: 80 }],
                },
                {
                    id: "e2",
                    name: "Row",
                    sets: [{ reps: 12, weight: 60 }],
                },
            ],
        },
    ];
}

describe("removeExerciseFromWorkout", () => {
    it("removes an exercise from the workout", () => {
        const original = makeWorkouts();

        const result = removeExerciseFromWorkout(original, "w1", "e1");

        // returns a new array
        expect(result).not.toBe(original);

        // removes the exercise
        expect(result[0].exercises).toHaveLength(1);
        expect(result[0].exercises[0].id).toBe("e2");

        // original is not mutated
        expect(original[0].exercises).toHaveLength(2);
    });
});
