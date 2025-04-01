import { Backend_URL } from '@/lib/Constants';
import { showAlert } from './alerts';

export const submitForm = async (endpoint: string, values: Record<string, any>) => {
    try {
        const res = await fetch(`${Backend_URL}${endpoint}`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-Type": "application/json" },
        });

        const response = await res.json();

        if (!res.ok) {
            showAlert(response.message || res.statusText, 'error');
            return null;
        }

        showAlert('Success! Data submitted.', 'success');
        return response;
    } catch (error) {
        showAlert('An error occurred. Please try again.', 'error');
        return null;
    }
};

interface FetchOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    token?: string;
    body?: any;
    params?: Record<string, any>;
}

export const apiRequest = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
    const { method = "GET", token, body, params } = options;

    let url = `${Backend_URL}${endpoint}`;

    // Append query parameters if provided
    if (params) {
        const queryString = new URLSearchParams(params as any).toString();
        url += `?${queryString}`;
    }

    const response = await fetch(url, {
        method,
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    return response.json();
};



