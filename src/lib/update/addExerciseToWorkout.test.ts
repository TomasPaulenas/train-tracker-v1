import { describe, it, expect } from "vitest";
import { addExerciseToWorkout } from "./addExerciseToWorkout";
import type { Workout } from "../../types/workout";

describe("addExerciseToWorkout", () => {
    it("adds a new exercise to the workout with the given id", () => {
        const workouts: Workout[] = [
            {
                id: "1",
                title: "Workout 1",
                notes: "",
                date: "2024-01-01",
                exercises: [],
            },
            {
                id: "2",
                title: "Workout 2",
                notes: "",
                date: "2024-01-02",
                exercises: [],
            },
        ];

        const result = addExerciseToWorkout(workouts, "2");

        expect(result[1].exercises).toHaveLength(1);
        expect(result[0].exercises).toHaveLength(0);

        // original array is not mutated
        expect(workouts[1].exercises).toHaveLength(0);
    });

    it("does nothing if workout id does not exist", () => {
        const workouts: Workout[] = [
            {
                id: "1",
                title: "Workout 1",
                notes: "",
                date: "2024-01-01",
                exercises: [],
            },
        ];

        const result = addExerciseToWorkout(workouts, "999");

        expect(result).toHaveLength(1);
        expect(result[0].exercises).toHaveLength(0);
    });
});
