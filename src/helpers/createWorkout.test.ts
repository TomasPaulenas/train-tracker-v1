import { describe, it, expect } from "vitest";
import { createworkout } from "./createWorkout";
import type { Workout } from "../types/workout";


describe("createworkout", () => {
    it("adds a new workout without mutating the original array", () => {
        const original: Workout[] = [];


        const result = createworkout(original);

        // returns a new array
        expect(result).not.toBe(original);

        // adds exactly one workout
        expect(result).toHaveLength(1);

        // has the expected default title
        expect(result[0].title).toBe("New Workout");

        // does not mutate original
        expect(original).toHaveLength(0);
    });
});
