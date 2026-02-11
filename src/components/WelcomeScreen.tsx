type Props = {
    onStart: () => void;
};

export function WelcomeScreen({ onStart }: Props) {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <div className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-10">
                <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-lg">
                    <p className="text-sm text-zinc-400">v1</p>

                    <h1 className="mt-2 text-4xl font-semibold tracking-tight">
                        TrainTracker
                    </h1>

                    <p className="mt-3 text-zinc-300">
                        Track your workouts. Stay consistent.
                    </p>

                    <button
                        onClick={onStart}
                        className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-100 active:scale-[0.98]"
                    >
                        Start
                    </button>

                    <p className="mt-6 text-xs text-zinc-500">
                        Data is saved locally in your browser.
                    </p>
                </div>
            </div>
        </div>
    );
}
