import type { Workout } from "../types/workout"


export function createworkout(workout: Workout[]) {



    const newWorkout = {
        id: Math.random().toString(),
        title: "New Workout",
        date: new Date().toISOString().slice(0, 10),
        exercises: []
    }


    return [...workout, newWorkout]



};