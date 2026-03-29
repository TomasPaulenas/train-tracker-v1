
import type { Workout } from "../types/workout"



export function workoutMetrics(workout: Workout) {

    let volume = 0;

    for (const metrics of workout.exercises) {




        volume = (metrics.sets * metrics.reps * metrics.weight) + volume;




    };

    if (volume === 0) {
        return "—"
    }
    return volume + " Kg";

}