import { useEffect, useState } from "react";
import { Field } from "./Field";

type AuthMode = "login" | "register";

type Props = {
    mode: AuthMode;
    onModeChange: (mode: AuthMode) => void;
    onSubmit: (data: { email: string; password: string }) => Promise<void>;
    onDemoLogin: () => void;
};

export function AuthScreen({
    mode,
    onModeChange,
    onSubmit,
    onDemoLogin,
}: Props) {
    const [ready, setReady] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const id = window.setTimeout(() => setReady(true), 20);
        return () => window.clearTimeout(id);
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        if (mode === "register" && password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await onSubmit({
                email: email.trim(),
                password,
            });
        } catch {
            setError(
                mode === "login"
                    ? "Invalid email or password"
                    : "Could not create account"
            );
        }
    }

    const wrapClass = [
        "min-h-screen bg-white text-zinc-900 overflow-hidden",
        "transition-opacity duration-500",
        ready ? "opacity-100" : "opacity-0",
    ].join(" ");

    const contentClass = [
        "grid w-full items-center gap-10 md:grid-cols-2",
        "transition-all duration-700",
        ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
    ].join(" ");

    const title = mode === "login" ? "Log in" : "Create account";
    const subtitle =
        mode === "login"
            ? "Log in to start tracking your workouts."
            : "Create an account to start tracking your workouts.";

    return (
        <div className={wrapClass}>
            <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-10">
                <div className={contentClass}>
                    <div className="mx-auto w-full max-w-md md:mx-0">
                        <p className="text-sm text-zinc-500">TrainTracker</p>

                        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
                            {title}
                        </h1>

                        <p className="mt-3 text-base text-zinc-600">{subtitle}</p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                            <div>
                                <div className="mb-1 text-sm font-medium text-zinc-700">
                                    Email
                                </div>
                                <Field
                                    type="email"
                                    value={email}
                                    onChange={setEmail}
                                    placeholder="you@example.com"
                                    className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                                />
                            </div>

                            <div>
                                <div className="mb-1 text-sm font-medium text-zinc-700">
                                    Password
                                </div>
                                <Field
                                    type="password"
                                    value={password}
                                    onChange={setPassword}
                                    placeholder="Enter your password"
                                    className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                                />
                            </div>

                            {mode === "register" && (
                                <div>
                                    <div className="mb-1 text-sm font-medium text-zinc-700">
                                        Confirm password
                                    </div>
                                    <Field
                                        type="password"
                                        value={confirmPassword}
                                        onChange={setConfirmPassword}
                                        placeholder="Repeat your password"
                                        className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                                    />
                                </div>
                            )}

                            {error && (
                                <p className="text-sm text-red-600">{error}</p>
                            )}

                            <button
                                type="submit"
                                className="inline-flex h-11 w-full items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700 active:scale-[0.99] transition"
                            >
                                {mode === "login" ? "Log in" : "Create account"}
                            </button>
                        </form>

                        <div className="mt-5 text-sm text-zinc-600">
                            {mode === "login"
                                ? "Don't have an account?"
                                : "Already have an account?"}{" "}
                            <button
                                type="button"
                                onClick={() =>
                                    onModeChange(mode === "login" ? "register" : "login")
                                }
                                className="font-medium text-blue-600 hover:text-blue-700"
                            >
                                {mode === "login" ? "Create account" : "Log in"}
                            </button>
                        </div>

                        <div className="mt-8 border-t border-zinc-200 pt-6">
                            <p className="text-sm text-zinc-500">
                                Just want to explore the app?
                            </p>

                            <button
                                type="button"
                                onClick={onDemoLogin}
                                className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-md border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 active:scale-[0.99] transition"
                            >
                                Continue with demo user
                            </button>
                        </div>
                    </div>

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