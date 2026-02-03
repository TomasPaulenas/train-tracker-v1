import { describe, it, expect } from "vitest";
import { deleteWorkout } from "./deleteWorkout";
import type { Workout } from "../../types/workout";


describe("deleteWorkout", () => {
    it("removes the workout with the given id", () => {
        // Arrange
        const workouts: Workout[] = [
            {
                id: "1",
                title: "Workout 1",
                date: "2024-01-01",
                exercises: [],
            },
            {
                id: "2",
                title: "Workout 2",
                date: "2024-01-02",
                exercises: [],
            },
        ];

        // Act
        const result = deleteWorkout(workouts, "1");

        // Assert
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("2");

        // original array is not mutated
        expect(workouts).toHaveLength(2);
    });
});
