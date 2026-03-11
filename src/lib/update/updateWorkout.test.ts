import { describe, it, expect } from "vitest";
import type { Workout } from "../../types/workout";
import { updateWorkoutDetails } from "./updateWorkout";

describe("updateWorkoutDetails", () => {
    it("updates the title of the given workout", () => {
        const workouts: Workout[] = [
            {
                id: "w1",
                title: "Old title",
                date: "2024-01-01",
                exercises: [],
            },
            {
                id: "w2",
                title: "Workout 2",
                date: "2024-01-02",
                exercises: [],
            },
        ];

        const result = updateWorkoutDetails(
            workouts,
            "w1",
            "New title"
        );

        expect(result).toHaveLength(2);
        expect(result[0].title).toBe("New title");

        // other workout unchanged
        expect(result[1].title).toBe("Workout 2");

        // original not mutated
        expect(workouts[0].title).toBe("Old title");
    });

    it("keeps the previous title when title is undefined", () => {
        const workouts: Workout[] = [
            {
                id: "w1",
                title: "Original title",
                date: "2024-01-01",
                exercises: [],
            },
        ];

        const result = updateWorkoutDetails(workouts, "w1", undefined);

        expect(result[0].title).toBe("Original title");

        // original not mutated
        expect(workouts[0].title).toBe("Original title");
    });
});