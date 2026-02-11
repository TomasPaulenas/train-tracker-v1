import { describe, it, expect } from "vitest";
import { addWorkout } from "./addWorkout";
import type { Workout } from "../../types/workout";

describe("addWorkout", () => {
    it("adds a new workout to the list", () => {
        const workouts: Workout[] = [
            {
                id: "1",
                title: "Workout 1",
                notes: "note",
                date: "2024-01-01",
                exercises: [],
            },
        ];

        const newWorkout: Workout = {
            id: "2",
            title: "Workout 2",
            notes: "note 2",
            date: "2024-01-02",
            exercises: [],
        };

        const result = addWorkout(workouts, newWorkout);

        expect(result).toHaveLength(2);
        expect(result[1]).toEqual(newWorkout);

        // original array is not mutated
        expect(workouts).toHaveLength(1);
    });

    it("returns a new array reference", () => {
        const workouts: Workout[] = [];

        const newWorkout: Workout = {
            id: "1",
            title: "Workout 1",
            notes: "",
            date: "2024-01-01",
            exercises: [],
        };

        const result = addWorkout(workouts, newWorkout);

        expect(result).not.toBe(workouts);
    });
});
