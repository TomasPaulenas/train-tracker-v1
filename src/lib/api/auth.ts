const AUTH_KEY = "traintracker-auth";
const AUTH_BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

type AuthData = {
    email: string;
    password: string;
};

type LoginResponse = {
    token: string;
    user: {
        id: number;
        email: string;
    };
};

export function getAuthToken() {
    return localStorage.getItem(AUTH_KEY);
}

export function hasAuthToken() {
    return Boolean(localStorage.getItem(AUTH_KEY));
}

export function saveAuthToken(token: string) {
    localStorage.setItem(AUTH_KEY, token);
}

export function clearAuthToken() {
    localStorage.removeItem(AUTH_KEY);
}

export async function loginUser(data: AuthData): Promise<LoginResponse> {
    const response = await fetch(`${AUTH_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response.json();
}

export async function registerUser(data: AuthData) {
    const response = await fetch(`${AUTH_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Register failed");
    }

    return response.json();
}

export async function loginDemoUser(): Promise<LoginResponse> {
    return loginUser({
        email: "demo@traintracker.com",
        password: "123456",
    });
}