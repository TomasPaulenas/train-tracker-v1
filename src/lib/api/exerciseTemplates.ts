import { getAuthToken } from "./auth";
import type { ExerciseTemplate } from "../../types/exerciseTemplate";

const TEMPLATES_BASE_URL = `${import.meta.env.VITE_API_URL}/api/exercise-templates`;

export async function createTemplateRequest(data: {
    name: string;
    description?: string;
}) {
    const token = getAuthToken();

    const response = await fetch(TEMPLATES_BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name: data.name,
            description: data.description ?? "",
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create template");
    }

    const template = await response.json();

    return {
        id: String(template.id),
        name: template.name,
        description: template.description ?? "",
    };
}

export async function updateTemplateRequest(
    templateId: string,
    data: { name?: string; description?: string }
) {
    const token = getAuthToken();

    const response = await fetch(`${TEMPLATES_BASE_URL}/${templateId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update template");
    }

    return response.json();
}

export async function deleteTemplateRequest(templateId: string) {
    const token = getAuthToken();

    const response = await fetch(`${TEMPLATES_BASE_URL}/${templateId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete template");
    }
}

export async function getExerciseTemplatesRequest() {
    const token = getAuthToken();
    const response = await fetch(TEMPLATES_BASE_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },

    });

    if (!response.ok) {
        throw new Error("Failed to get templates");
    }

    return response.json();
}



