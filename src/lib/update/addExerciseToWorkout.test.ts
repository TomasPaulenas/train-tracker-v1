import { describe, it, expect } from "vitest";
import { addExerciseToWorkout } from "./addExerciseToWorkout";
import type { Exercise, Workout } from "../../types/workout";

describe("addExerciseToWorkout", () => {
    it("adds a new exercise to the workout with the given id", () => {
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

        const exercise: Exercise = {
            id: "ex-1",
            name: "Bench Press",
            sets: 3,
            reps: 10,
            weight: 60,
            notes: "",

        };

        const result = addExerciseToWorkout(workouts, "2", exercise);

        expect(result[1].exercises).toHaveLength(1);
        expect(result[1].exercises[0]).toEqual(exercise);
        expect(result[0].exercises).toHaveLength(0);

        expect(workouts[1].exercises).toHaveLength(0);
    });

    it("does nothing if workout id does not exist", () => {
        const workouts: Workout[] = [
            {
                id: "1",
                title: "Workout 1",
                date: "2024-01-01",
                exercises: [],
            },
        ];

        const exercise: Exercise = {
            id: "ex-1",
            name: "Bench Press",
            sets: 3,
            reps: 10,
            weight: 60,
            notes: "",

        };

        const result = addExerciseToWorkout(workouts, "999", exercise);

        expect(result).toHaveLength(1);
        expect(result[0].exercises).toHaveLength(0);
    });
});