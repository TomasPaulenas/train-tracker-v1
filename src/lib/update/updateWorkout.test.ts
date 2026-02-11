import { describe, it, expect } from "vitest";
import type { Workout } from "../../types/workout";
import { updateWorkoutDetails } from "./updateWorkout";

describe("updateWorkoutDetails", () => {
    it("updates title and notes of the given workout", () => {
        const workouts: Workout[] = [
            {
                id: "w1",
                title: "Old title",
                notes: "Old notes",
                date: "2024-01-01",
                exercises: [],
            },
            {
                id: "w2",
                title: "Workout 2",
                notes: "",
                date: "2024-01-02",
                exercises: [],
            },
        ];

        const result = updateWorkoutDetails(
            workouts,
            "w1",
            "New title",
            "New notes"
        );

        expect(result).toHaveLength(2);
        expect(result[0].title).toBe("New title");
        expect(result[0].notes).toBe("New notes");

        // other workout unchanged
        expect(result[1].title).toBe("Workout 2");

        // original not mutated
        expect(workouts[0].title).toBe("Old title");
        expect(workouts[0].notes).toBe("Old notes");
    });

    it("keeps previous values when title or notes are undefined", () => {
        const workouts: Workout[] = [
            {
                id: "w1",
                title: "Original title",
                notes: "Original notes",
                date: "2024-01-01",
                exercises: [],
            },
        ];

        const result = updateWorkoutDetails(workouts, "w1", undefined, "Updated");

        expect(result[0].title).toBe("Original title");
        expect(result[0].notes).toBe("Updated");

        // original not mutated
        expect(workouts[0].notes).toBe("Original notes");
    });
});
