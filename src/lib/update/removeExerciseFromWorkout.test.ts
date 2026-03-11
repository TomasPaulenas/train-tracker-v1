import { describe, it, expect } from "vitest";
import { removeExerciseFromWorkout } from "./removeExerciseFromWorkout";
import type { Workout } from "../../types/workout";
import { createExercise } from "../factories/createExercise";

describe("removeExerciseFromWorkout", () => {
    it("removes the exercise with the given id from the workout", () => {
        const ex1 = createExercise({ name: "Squat" });
        const ex2 = createExercise({ name: "Bench" });

        const workouts: Workout[] = [
            {
                id: "1",
                title: "Workout 1",
                notes: "",
                date: "2024-01-01",
                exercises: [ex1, ex2],
            },
            {
                id: "2",
                title: "Workout 2",
                notes: "",
                date: "2024-01-02",
                exercises: [],
            },
        ];

        const result = removeExerciseFromWorkout(workouts, "1", ex1.id);

        expect(result).toHaveLength(2);
        expect(result[0].exercises).toHaveLength(1);
        expect(result[0].exercises[0].id).toBe(ex2.id);

        
        expect(workouts[0].exercises).toHaveLength(2);
    });

    it("does nothing if exercise id does not exist", () => {
        const ex1 = createExercise({ name: "Squat" });

        const workouts: Workout[] = [
            {
                id: "1",
                title: "Workout 1",
                notes: "",
                date: "2024-01-01",
                exercises: [ex1],
            },
        ];

        const result = removeExerciseFromWorkout(workouts, "1", "ex-999");

        expect(result).toHaveLength(1);
        expect(result[0].exercises).toHaveLength(1);

        expect(workouts[0].exercises).toHaveLength(1);
    });
});
