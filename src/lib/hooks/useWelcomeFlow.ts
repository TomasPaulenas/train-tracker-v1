// src/lib/hooks/useWelcomeFlow.ts
import { useEffect, useState } from "react";

const STARTED_KEY = "traintracker_started";

export function useWelcomeFlow() {
    const [started, setStarted] = useState(false);
    const [leavingWelcome, setLeavingWelcome] = useState(false);
    const [showTransition, setShowTransition] = useState(false);
    const [transitionReady, setTransitionReady] = useState(false);

    // check if app was already started
    useEffect(() => {
        const startedFlag = localStorage.getItem(STARTED_KEY);
        setStarted(startedFlag === "1");
    }, []);

    function start() {
        setLeavingWelcome(true);

        window.setTimeout(() => {
            setShowTransition(true);
            setTransitionReady(false);

            window.setTimeout(() => {
                setTransitionReady(true);
            }, 20);
        }, 400);

        window.setTimeout(() => {
            localStorage.setItem(STARTED_KEY, "1");
            setStarted(true);
            setShowTransition(false);
            setTransitionReady(false);
            setLeavingWelcome(false);
        }, 2200);
    }

    function reset() {
        localStorage.removeItem(STARTED_KEY);
        setShowTransition(false);
        setTransitionReady(false);
        setLeavingWelcome(false);
        setStarted(false);
    }

    return {
        started,
        leavingWelcome,
        showTransition,
        transitionReady,
        start,
        reset,
    };
}
