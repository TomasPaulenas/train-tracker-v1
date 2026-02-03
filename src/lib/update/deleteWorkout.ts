import type { Workout } from "../../types/workout"





export function deleteWorkout(workouts: Workout[], id: string) {


    const updated = workouts.filter((w) => w.id !== id);
    return updated
};
