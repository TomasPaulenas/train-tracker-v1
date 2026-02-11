# TrainTracker — v1

TrainTracker is a minimalist workout tracking application built with React and TypeScript.

The project emphasizes predictable immutable updates and clear separation between UI and domain logic.

✨ Features

Create and delete workout sessions

Add and remove exercises

Update sets, reps and weight

LocalStorage persistence

Derived statistics (total sessions, total exercises)

Fully tested domain logic (Vitest)

🧠 Architecture

The project separates:

UI components

Domain update functions (pure functions)

Factories

Derived selectors

Custom hooks

Persistence layer

All domain logic is tested independently from the UI.

🧪 Testing

The core logic is covered with unit tests using Vitest.

Run tests with:

npm run test

💾 Persistence Strategy

The application persists the full workouts state in localStorage.

On app start, stored data is hydrated safely

On state updates, changes are persisted

A hydration guard prevents overwriting stored data before the initial load completes

📦 Tech Stack

React

TypeScript

Vite

TailwindCSS

Vitest

🗺 Roadmap

Isolate exercise form state per workout

Improve UX animations

Optional backend sync

Export workouts to JSON