export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3006";

export const ENDPOINTS = {
    clients: '/user',
    client: (id: string) => `/user/${id}`,
};

export const API_CONFIG = {
    timeout: 1000,
    RETRY_ATTEMPTS: 3,
};