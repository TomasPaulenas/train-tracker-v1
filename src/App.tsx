import { useState } from "react";
import { useWelcomeFlow } from "./lib/hooks/useWelcomeFlow";
import { hasAuthToken } from "./lib/api/auth";
import { useAuthActions } from "./lib/hooks/useAuthActions";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { StartTransitionScreen } from "./screens/StartTransitionScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { WorkoutScreen } from "./screens/WorkoutScreen";

export function App() {
  const {
    started,
    leavingWelcome,
    showTransition,
    transitionReady,
    start,
    reset,
  } = useWelcomeFlow();

  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isAuthenticated, setIsAuthenticated] = useState(() => hasAuthToken());

  const { handleAuthSubmit, handleDemoLogin, handleLogout } = useAuthActions({
    authMode,
    setAuthMode,
    setIsAuthenticated,
  });

  if (!started) {
    if (showTransition) {
      return <StartTransitionScreen ready={transitionReady} />;
    }

    return <WelcomeScreen onStart={start} leaving={leavingWelcome} />;
  }

  if (!isAuthenticated) {
    return (
      <AuthScreen
        mode={authMode}
        onModeChange={setAuthMode}
        onSubmit={handleAuthSubmit}
        onDemoLogin={handleDemoLogin}
      />
    );
  }

  return (
    <WorkoutScreen
      isAuthenticated={isAuthenticated}
      onLogout={handleLogout}
      onReset={reset}
    />
  );
}