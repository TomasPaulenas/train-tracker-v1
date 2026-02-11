// src/components/StartTransitionScreen.tsx

type Props = {
    ready: boolean;
};

export function StartTransitionScreen({ ready }: Props) {
    return (
        <div
            className={[
                "min-h-screen bg-white text-zinc-900",
                "transition-opacity duration-500",
                ready ? "opacity-100" : "opacity-0",
            ].join(" ")}
        >
            <div className="flex min-h-screen items-center justify-center px-6">
                <div
                    className={[
                        "text-center transition-all duration-500",
                        ready
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-3",
                    ].join(" ")}
                >
                    <div className="text-4xl font-semibold tracking-tight">
                        Let’s start.
                    </div>

                    <div className="mt-3 text-base text-zinc-500">
                        Your session is ready.
                    </div>

                    <div className="mt-10 flex justify-center">
                        <svg
                            width="180"
                            height="80"
                            viewBox="0 0 320 120"
                            className="opacity-95"
                        >
                            {/* Left outer plate */}
                            <rect
                                x="20"
                                y="30"
                                width="28"
                                height="60"
                                rx="8"
                                fill="#1e3a8a"
                            />

                            {/* Left inner plate */}
                            <rect
                                x="50"
                                y="25"
                                width="36"
                                height="70"
                                rx="10"
                                fill="#1d4ed8"
                            />

                            {/* Handle */}
                            <rect
                                x="86"
                                y="54"
                                width="148"
                                height="12"
                                rx="6"
                                fill="#2563eb"
                            />

                            {/* Handle highlight */}
                            <rect
                                x="120"
                                y="50"
                                width="80"
                                height="20"
                                rx="10"
                                fill="white"
                                opacity="0.15"
                            />

                            {/* Right inner plate */}
                            <rect
                                x="234"
                                y="25"
                                width="36"
                                height="70"
                                rx="10"
                                fill="#1d4ed8"
                            />

                            {/* Right outer plate */}
                            <rect
                                x="272"
                                y="30"
                                width="28"
                                height="60"
                                rx="8"
                                fill="#1e3a8a"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
