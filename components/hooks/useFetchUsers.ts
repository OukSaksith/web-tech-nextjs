import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";

export const fetchUsers = async (token: string, page: number, pageSize: number) => {
    return apiRequest<UsersResponse>("/user", {
        token,
        params: { page, size: pageSize },
    });
};

export const deleteUser = async (id: number, token: string) => {
    return apiRequest(`/user/${id}`, {
        method: "DELETE",
        token,
    });
};

interface User {
    id: number;
    name: string;
    email: string;
}

interface UsersResponse {
    data: User[];
    total: number;
    page: number;
    size: number;
    totalPages: number;
}

export const useFetchUsers = (token: string | null, page: number, pageSize: number) => {
    const [users, setUsers] = useState<UsersResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true; // Track if component is mounted

        const getUsers = async () => {
            if (!token) {
                setError("Authentication token is missing");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const userData = await fetchUsers(token, page, pageSize);
                
                // Ensure component is still mounted before setting state
                if (isMounted) {
                    setUsers(userData);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "An error occurred");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        getUsers();

        return () => {
            isMounted = false; // Cleanup function to prevent state update on unmount
        };
    }, [token, page, pageSize]);

    return { users, loading, error };
};
