import type { Dispatch, SetStateAction } from "react";
import {
    clearAuthToken,
    loginDemoUser,
    loginUser,
    registerUser,
    saveAuthToken,
} from "../api/auth";

type AuthMode = "login" | "register";

type UseAuthActionsParams = {
    authMode: AuthMode;
    setAuthMode: Dispatch<SetStateAction<AuthMode>>;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

export function useAuthActions({
    authMode,
    setAuthMode,
    setIsAuthenticated,
}: UseAuthActionsParams) {
    async function handleAuthSubmit(data: { email: string; password: string }) {
        try {
            if (authMode === "login") {
                const result = await loginUser(data);
                saveAuthToken(result.token);
                setIsAuthenticated(true);
                return;
            }

            await registerUser(data);
            setAuthMode("login");
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async function handleDemoLogin() {
        try {
            const result = await loginDemoUser();
            saveAuthToken(result.token);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    function handleLogout() {
        clearAuthToken();
        setIsAuthenticated(false);
    }

    return {
        handleAuthSubmit,
        handleDemoLogin,
        handleLogout,
    };
}