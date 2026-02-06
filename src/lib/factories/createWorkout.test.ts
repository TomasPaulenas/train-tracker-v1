import { describe, it, expect } from "vitest";
import { createWorkout } from "./createWorkout";
import { addWorkout } from "../update/workoutsModel";
import type { Workout } from "../../types/workout";

describe("addWorkout", () => {
    it("adds a new workout without mutating the original array", () => {
        const original: Workout[] = [];

        const workout = createWorkout();
        const result = addWorkout(original, workout);

        expect(result).not.toBe(original);
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe("New Workout");
        expect(original).toHaveLength(0);
    });
});
