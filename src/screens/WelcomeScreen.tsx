import { useEffect, useState } from "react";

type Props = {
    onStart: () => void;
    leaving: boolean;
};

export function WelcomeScreen({ onStart, leaving }: Props) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const id = window.setTimeout(() => setReady(true), 20);
        return () => window.clearTimeout(id);
    }, []);

    const wrapClass = [
        "min-h-screen bg-white text-zinc-900 overflow-hidden",
        "transition-opacity duration-500",
        leaving ? "opacity-0" : "opacity-100",
    ].join(" ");

    const contentClass = [
        "grid w-full items-center gap-10 md:grid-cols-2",
        "transition-all duration-700",
        ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        leaving ? "opacity-0 -translate-y-2" : "",
    ].join(" ");

    return (
        <div className={wrapClass}>
            <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10">
                <div className={contentClass}>
                    {/* Left side */}
                    <div className="text-center md:text-left">
                        <p className="text-sm text-zinc-500">v1</p>

                        <h1 className="mt-4 text-5xl font-extrabold leading-tight tracking-tight">
                            TrainTracker
                        </h1>

                        <p className="mt-4 text-2xl leading-snug text-zinc-700">
                            Track your workouts.
                            <br />
                            Stay consistent.
                        </p>

                        <button
                            onClick={onStart}
                            className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-10 py-4 text-base font-semibold text-white hover:bg-blue-700 active:scale-[0.99] transition md:w-[360px]"
                        >
                            Start
                        </button>

                        <p className="mt-6 text-sm text-zinc-500">
                            Data is saved locally in your browser.
                        </p>
                    </div>

                    {/* Right side image (bigger + pushed right like the mock) */}
                    <div className="relative flex justify-center md:justify-end">
                        <img
                            src="/tracker-img.png"
                            alt="Workout equipment"
                            className="w-[92%] max-w-none md:w-[125%] md:translate-x-10"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
