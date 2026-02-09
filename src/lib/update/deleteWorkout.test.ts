import { describe, it, expect } from "vitest";
import { deleteWorkout } from "./deleteWorkout";
import type { Workout } from "../../types/workout";

describe("deleteWorkout", () => {
    it("removes the workout with the given id", () => {
        const workouts: Workout[] = [
            {
                id: "1",
                title: "Workout 1",
                notes: "note",
                date: "2024-01-01",
                exercises: [],
            },
            {
                id: "2",
                title: "Workout 2",
                notes: "nota",
                date: "2024-01-02",
                exercises: [],
            },
        ];

        const result = deleteWorkout(workouts, "1");

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("2");

        // original array is not mutated
        expect(workouts).toHaveLength(2);
    });
});
